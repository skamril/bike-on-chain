import { Input, Text } from "@nextui-org/react";
import Form from "../common/Form";
import Hero from "./shared/Hero";
import PropTypes from "prop-types";
import { useEth } from "../contexts/EthContext";
import { toast } from "react-hot-toast";

function CreateCertificates({ setLoading }) {
  const {
    state: { getCollection, account },
  } = useEth();

  ////////////////////////////////////////////////////////////////
  // Event Handlers
  ////////////////////////////////////////////////////////////////

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const collection = await getCollection();

      await collection.methods
        .batchMint(
          event.target.amount.value,
          event.target.name.value,
          event.target.description.value,
          event.target.image.value,
          event.target.buildYear.value
        )
        .send({ from: account });

      toast.success("Certificats créés avec succès");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error("Impossible de créer les certificats");
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
          Créer un certificats
        </Text>
      </Hero>
      <Form onSubmit={handleSubmit} submitLabel="Créer">
        <Input
          name="amount"
          clearable
          bordered
          label="Nombre"
          type="number"
          required
        />
        <Input name="name" clearable bordered label="Nom" required />
        <Input
          name="description"
          clearable
          bordered
          label="Description"
          required
        />
        <Input name="image" clearable bordered label="Image" required />
        <Input
          name="buildYear"
          clearable
          bordered
          label="Année de fabrication"
          type="number"
          required
        />
      </Form>
    </>
  );
}

CreateCertificates.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default CreateCertificates;
