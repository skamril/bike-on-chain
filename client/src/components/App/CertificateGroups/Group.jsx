import { Badge, Button, Text } from "@nextui-org/react";
import PropTypes from "prop-types";
import NftCard from "../../common/NftCard";

function Group({ id, amount, template, setTransferModal }) {
  return (
    <div
      style={{
        background: "whitesmoke",
        padding: 20,
        paddingTop: 0,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        height: 400,
      }}
      title={template.description}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            margin: "10px 0",
          }}
        >
          <Badge color="primary" size="lg" placement="top-right">
            {amount}
          </Badge>
          <Text size="$lg">Group {id}</Text>
        </div>
        <Button
          flat
          size="xs"
          onClick={() => setTransferModal({ groupId: id })}
        >
          Transférer à un revendeur
        </Button>
      </div>
      <NftCard
        {...template}
        isPressable={false}
        showStatus={false}
        css={{ flex: 1 }}
      />
    </div>
  );
}

Group.propTypes = {
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  template: PropTypes.array.isRequired,
  setTransferModal: PropTypes.func.isRequired,
};

export default Group;
