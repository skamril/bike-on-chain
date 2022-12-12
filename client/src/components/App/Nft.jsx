import {
  Badge,
  Button,
  Image,
  Input,
  Link,
  Modal,
  Text,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useEth } from "../contexts/EthContext";
import Hero from "./shared/Hero";
import PropTypes from "prop-types";
import { statusToColor, statusToString } from "../../utils/bike";
import { toast } from "react-hot-toast";

function Nft({ setLoading }) {
  const { collectionAddr, tokenId } = useParams();
  const [bike, setBike] = useState(null);
  const {
    state: { getCollection, account },
  } = useEth();

  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetch() {
      const collection = await getCollection(collectionAddr);
      setBike(
        await collection.methods.getBike(tokenId).call({ from: account })
      );
    }

    fetch().finally(() => setLoading(false));
  }, [account, collectionAddr, getCollection, tokenId]);

  ////////////////////////////////////////////////////////////////
  // Event Handlers
  ////////////////////////////////////////////////////////////////

  function handleChangeStatus(status) {
    return async () => {
      setLoading(true);

      try {
        const collection = await getCollection(collectionAddr);

        if (status === 2) {
          await collection.methods
            .setInService(tokenId)
            .send({ from: account });
        } else if (status === 3) {
          await collection.methods
            .setOutOfService(tokenId)
            .send({ from: account });
        } else if (status === 4) {
          await collection.methods.setStealed(tokenId).call({ from: account });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        toast.error("Statut inchangé");
      }

      setShowChangeStatusModal(false);
      setLoading(false);
    };
  }

  async function handleTransfer(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const collection = await getCollection(collectionAddr);

      if (bike.status === "1") {
        await collection.methods
          .transferForService(
            account,
            event.target.to.value,
            tokenId,
            event.target.sn.value
          )
          .send({ from: account });
      } else {
        await collection.methods
          .safeTransferFrom(account, event.target.to.value, tokenId)
          .send({ from: account });
      }

      toast.success("Transfert effectué");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error("Transférer échoué");
    }

    setShowTransferModal(false);
    setLoading(false);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  if (!bike) {
    return null;
  }

  return (
    <>
      <Hero>
        <Text h2 css={{ m: 0 }}>
          NFT
        </Text>
      </Hero>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 600 }}>
          <div style={{ display: "flex", justifyContent: "right", gap: 10 }}>
            <Button
              color="gradient"
              auto
              ghost
              size="xs"
              onClick={() => setShowChangeStatusModal(true)}
            >
              Changer le status
            </Button>
            <Button
              color="gradient"
              auto
              ghost
              size="xs"
              onClick={() => setShowTransferModal(true)}
            >
              Transférer
            </Button>
          </div>
          <Text h2>
            {bike.name} #{tokenId}
          </Text>
          <div style={{ position: "relative" }}>
            <Image src={bike.image} />
            <div style={{ position: "absolute", top: 5, right: 5 }}>
              <Badge color={statusToColor(Number(bike.status))}>
                {statusToString(Number(bike.status))}
              </Badge>
            </div>
          </div>
          <Link
            isExternal
            href={`https://testnets.opensea.io/assets/mumbai/${collectionAddr}/${tokenId}`}
          >
            OpenSea
          </Link>
          <Text blockquote>{bike.description}</Text>
          {[
            ["Numéro de série", bike.serialNumber],
            [
              "Date de première vente",
              new Date(bike.firstPurchaseDate).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            ],
            ["Année de fabrication", bike.buildYear],
          ].map(([label, value]) => (
            <Text key={label} css={{ mb: 15 }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginRight: 10,
                }}
              >
                {label} :
              </span>
              {value}
            </Text>
          ))}
        </div>
      </div>
      {showChangeStatusModal && (
        <Modal closeButton open onClose={() => setShowChangeStatusModal(false)}>
          <Modal.Header>
            <Text>Change le status</Text>
          </Modal.Header>
          <Modal.Body>
            {[2, 3, 4].map((status) => (
              <Button
                key={status}
                color={statusToColor(status)}
                onClick={handleChangeStatus(status)}
              >
                {statusToString(status)}
              </Button>
            ))}
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      )}
      {showTransferModal && (
        <Modal closeButton open onClose={() => setShowTransferModal(false)}>
          <Modal.Header>
            <Text>Transférer</Text>
          </Modal.Header>
          <Modal.Body>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
              onSubmit={handleTransfer}
            >
              <Input
                name="to"
                clearable
                bordered
                fullWidth
                label="Adresse du receveur"
              />
              {bike.status === "1" && (
                <Input
                  name="sn"
                  clearable
                  bordered
                  fullWidth
                  label="Numéro de série"
                />
              )}
              <Button type="submit">Transférer</Button>
            </form>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      )}
    </>
  );
}

Nft.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default Nft;
