import { Text } from "@nextui-org/react";
import NFTList from "../common/NFTList";
import { useEth } from "../contexts/EthContext";
import Hero from "./shared/Hero";

function Certificates() {
  const {
    state: { contract, account },
  } = useEth();

  return (
    <>
      <Hero>
        <Text h2 css={{ m: 0 }}>
          Mes certificats
        </Text>
      </Hero>
      <NFTList list={[]} />
    </>
  );
}

export default Certificates;
