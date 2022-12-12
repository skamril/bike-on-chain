import { Input, Text } from "@nextui-org/react";
import useEth from "../contexts/EthContext/useEth";
import Hero from "./shared/Hero";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Form from "../common/Form";

function CreateManufacturer({ setLoading }) {
  const {
    state: { contract, account },
  } = useEth();

  ////////////////////////////////////////////////////////////////
  // Event Handlers
  ////////////////////////////////////////////////////////////////

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      await contract.methods
        .createCollection(
          event.target.name.value,
          event.target.symbol.value,
          event.target.address.value
        )
        .send({ from: account });

      toast.success("Fabricant ajouté avec succès");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error("Impossible d'ajouter le fabricant");
    }

    setLoading(false);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <Hero>
        <Text h2 css={{ m: 0 }}>
          Ajouter un fabricant
        </Text>
      </Hero>
      <Form onSubmit={handleSubmit} submitLabel="Créer">
        <Input name="name" clearable bordered label="Name" required />
        <Input
          name="symbol"
          clearable
          bordered
          label="Symbol"
          initialValue="BOC"
          required
        />
        <Input
          name="address"
          clearable
          bordered
          label="Adresse du fabricant"
          required
        />
      </Form>
    </>
  );
}

CreateManufacturer.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default CreateManufacturer;
