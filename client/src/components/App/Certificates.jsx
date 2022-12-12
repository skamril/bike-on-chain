import { Text } from "@nextui-org/react";
import NFTList from "../common/NFTList";
import { useEth } from "../contexts/EthContext";
import Hero from "./shared/Hero";
import Select from "react-select";
import { useEffect, useState } from "react";

function Certificates() {
  const {
    state: { contract, getCollection, account },
  } = useEth();

  const [manufacturersOptions, setManufacturersOptions] = useState([]);
  const [currentManufacturer, setCurrentManufacturer] = useState("");
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    async function fetch() {
      let createdEvents = await contract.getPastEvents("CollectionCreated", {
        fromBlock: 0,
        toBlock: "latest",
      });

      const options = createdEvents.map(({ returnValues }) => ({
        value: returnValues.collectionAddr,
        label: `${returnValues.name} (${returnValues.symbol})`,
      }));

      setManufacturersOptions(options);
    }

    fetch();
  }, [contract]);

  useEffect(() => {
    if (!currentManufacturer) {
      return;
    }

    async function fetch() {
      const collection = await getCollection(currentManufacturer.value);

      let transferEvents = await collection.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: "latest",
        filter: {
          to: account,
        },
      });

      const tokenIds = [
        ...new Set(
          transferEvents
            .map((event) => Number(event.returnValues.tokenId))
            .sort((a, b) => a - b)
        ),
      ];

      const bikes = await Promise.all(
        tokenIds.map((id) =>
          collection.methods.getBike(id).call({ from: account })
        )
      );

      setBikes(
        bikes.map((bike) => ({
          ...bike,
          collectionAddr: currentManufacturer.value,
        }))
      );
    }

    fetch();
  }, [account, currentManufacturer, getCollection]);

  return (
    <>
      <Hero>
        <Text h2 css={{ m: 0 }}>
          Mes certificats
        </Text>
      </Hero>
      <Select
        placeholder="Choisir le fabricant"
        options={manufacturersOptions}
        onChange={setCurrentManufacturer}
      />
      <NFTList list={bikes} />
    </>
  );
}

export default Certificates;
