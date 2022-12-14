import {
  Button,
  Input,
  Link,
  Modal,
  Text,
  Card,
  Col,
  Row,
  Grid,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useEth } from "../contexts/EthContext";

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

  const Card1 = () => (
    <Card css={{ mt: "20px", maxHeight: "550px", maxWidth: "500px" }}>
      <Card.Header css={{ p: "15px", position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="black">
            {bike.description}
          </Text>

          <Text h4 color="black">
            {bike.name} #{tokenId}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ mt: "25px" }}>
        <Card.Image
          src={bike.image}
          objectFit="cover"
          width="90%"
          height="90%"
          alt="Card image background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Text h6 color="success" size={12}>
            {bike.status == 1 ? "Available" : null}
          </Text>

          <Col>
            <Row justify="flex-end">
              <Button bordered flat auto color="secondary">
                <Text
                 
                  css={{ color: "greens" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  {statusToString(Number(bike.status))}
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );

  return (
    <div>
      <Grid.Container size={10}>
        <Grid size={6}>
          <Card1 />
        </Grid>
        <Grid css={{ margin: "auto" }} size={6}>
          <Text
            h3
            weight="bold"
            size={15}
            css={{ mt: "20px", p: "35px", mw: "400px" }}
          >
            Vélo connecté
          </Text>
          <Button
            size="lg"
            css={{ mt: "50px", minWidth: "160px" }}
            shadow
            color="gradient"
            auto
            onClick={() => setShowChangeStatusModal(true)}
          >
            <Text weight="bold" h3 size={14} color="White" css={{pt:"10px"}}>
              
              Change Status
            </Text>
          </Button>
          <Button
            size="lg"
            css={{ mt: "10px", minWidth: "160px" }}
            shadow
            color="warning"
            auto
            onClick={() => setShowTransferModal(true)}
          >
            <Text weight="bold" h3 size={14} color="White" css={{pt:"10px"}}>
              Transfer NFT
            </Text>
          </Button>
          <Button
           
            size="lg"
            css={{ mt: "10px", minWidth: "160px" }}
            shadow
            color="gradient"
            auto
          >
            <Link
              href={`https://testnets.opensea.io/assets/mumbai/${collectionAddr}/${tokenId}`}
            >
            <Text weight="bold" h3 size={14} color="White" css={{pt:"10px"}}>
              {" "}
              Look at OpenSea
             
            </Text>
            </Link>
          </Button>
          <Button  href={`https://mumbai.polygonscan.com/address/${collectionAddr}`} size="lg" css={{ mt: "10px", minWidth: "160px" }} shadow auto>
            <Link
              href={`https://mumbai.polygonscan.com/address/${collectionAddr}`}
            >
            <Text weight="bold" h3 size={14} color="White" css={{pt:"10px"}}>
            Verify Contract
            </Text>
            </Link>
          </Button>
        </Grid>
      </Grid.Container>

      <Grid.Container>
        <Card
          variant="bordered"
          css={{ m: "1px", width: "500px", minWidth: "50px" }}
        >
          <Card.Body>
            <Text h3 size={14} weight="bold">
              {" "}
              Description{" "}
            </Text>
          </Card.Body>
        </Card>
      </Grid.Container>

      <Grid.Container>
        <Grid size={6}>
          <Card
            isHoverable
            variant="bordered"
            css={{
              m: "1px",
              width: "250px",
              minWidth: "50px",
              maxHeight: "100px",
            }}
          >
            <Card.Body>
              <Text h3 weight="bold" size={14}>
                Etat du vélo
              </Text>
              <Text
                color={statusToColor(Number(bike.status))}
                h3
                weight="bold"
                size={12}
              >
                {statusToString(Number(bike.status))}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Card
          isHoverable
          variant="bordered"
          css={{ m: "1px", width: "250px", minWidth: "50px" }}
        >
          <Card.Body>
            <Text h3 weight="bold" size={14}>
              Date de première vente
            </Text>
            <Text h3 weight="bold" size={12}>
              {new Date(bike.firstPurchaseDate).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </Card.Body>
        </Card>
      </Grid.Container>
      <Grid.Container>
        <Grid size={6}>
          <Card
            isHoverable
            variant="bordered"
            css={{ m: "1px", width: "250px", minWidth: "50px" }}
          >
            <Card.Body>
              <Text h3 weight="bold" size={14}>
                Serial/Number{" "}
              </Text>
              <Text h3 weight="bold" size={14}>
                {bike.serialNumber ? bike.serialNumber : "N/A"}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Card
          isHoverable
          variant="bordered"
          css={{ m: "1px", width: "250px", minWidth: "50px" }}
        >
          <Card.Body>
            <Text h3 weight="bold" size={14}>
              Anée de fabrication
            </Text>
            <Text h3 weight="bold" size={12}>
              {bike.buildYear}
            </Text>
          </Card.Body>
        </Card>
        <Grid.Container>
          <Card
            isHoverable
            variant="bordered"
            css={{ m: "1px", width: "500px", minWidth: "50px" }}
          >
            <Card.Body>
              <Text weight="bold" align="center" size={14}>
                A propos de Decathlon Elops Electric Collection{" "}
              </Text>
            </Card.Body>
          </Card>
        </Grid.Container>
      </Grid.Container>

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
    </div>
  );
}

Nft.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default Nft;