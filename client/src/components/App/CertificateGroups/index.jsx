import { Button, Grid, Input, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Hero from "../shared/Hero";
import Group from "./Group";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

function CertificateGroups({ setLoading }) {
  const {
    state: { getCollection, account },
  } = useEth();

  const [groupsById, setGroupsById] = useState({});
  const [transferModal, setTransferModal] = useState(null);

  useEffect(() => {
    async function fetch() {
      const collection = await getCollection();
      let createdEvents = await collection.getPastEvents("GroupCreated", {
        fromBlock: 0,
        toBlock: "latest",
      });
      let updatedEvents = await collection.getPastEvents("GroupUpdated", {
        fromBlock: 0,
        toBlock: "latest",
      });

      const groupsObj = createdEvents.reduce((acc, event) => {
        const { id, amount, template } = event.returnValues;
        acc[id] = { id: Number(id), amount: Number(amount), template };
        return acc;
      }, {});

      updatedEvents.forEach((event) => {
        const { id, amount } = event.returnValues;
        groupsObj[Number(id)].amount = Number(amount);
      });

      setGroupsById(groupsObj);
    }

    fetch();
  }, [getCollection]);

  useEffect(() => {
    let emitter;

    async function listener() {
      const collection = await getCollection();
      emitter = collection.events.GroupUpdated().on("data", (event) => {
        const { id, amount } = event.returnValues;
        setGroupsById((prev) => ({
          ...prev,
          [Number(id)]: { ...prev[id], amount: Number(amount) },
        }));
      });
    }

    listener();

    return () => {
      emitter && emitter.removeAllListeners("data");
    };
  });

  ////////////////////////////////////////////////////////////////
  // Event Handlers
  ////////////////////////////////////////////////////////////////

  async function handleTransfer(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const collection = await getCollection();

      await collection.methods
        .batchTransferForSale(
          account,
          event.target.to.value,
          transferModal.groupId,
          event.target.amount.value
        )
        .send({ from: account });

      toast.success("Transfert vers le vendeur effectué");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error("Impossible de transférer vers le revendeur");
    }

    setTransferModal(null);
    setLoading(false);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <Hero>
        <Text h2 css={{ m: 0 }}>
          Mes groupes de certificats
        </Text>
      </Hero>
      <Grid.Container gap={2} justify="flex-start">
        {Object.values(groupsById)
          .filter(({ amount }) => amount > 0)
          .map(({ id, amount, template }) => (
            <Grid xs={4} key={id}>
              <Group
                id={id}
                amount={amount}
                template={template}
                setTransferModal={setTransferModal}
              />
            </Grid>
          ))}
      </Grid.Container>
      {transferModal && (
        <Modal closeButton open onClose={() => setTransferModal(false)}>
          <Modal.Header>
            <Text>Group {transferModal.groupId}</Text>
          </Modal.Header>
          <Modal.Body>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
              onSubmit={handleTransfer}
            >
              <Input
                name="amount"
                clearable
                bordered
                fullWidth
                label="Nombre"
                type="number"
                max={groupsById[transferModal.groupId].amount}
              />
              <Input
                name="to"
                clearable
                bordered
                fullWidth
                label="Adresse du revendeur"
              />
              <Button type="submit">Transférer</Button>
            </form>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      )}
    </>
  );
}

CertificateGroups.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default CertificateGroups;
