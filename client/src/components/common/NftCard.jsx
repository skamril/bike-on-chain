import { Badge, Card, Text } from "@nextui-org/react";
import PropTypes from "prop-types";

function NftCard({ name, img, date }) {
  return (
    <Card isPressable>
      <Card.Body css={{ p: 0 }}>
        <Card.Image src={img} alt={name} />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <Badge color="primary" variant="flat" isSquared>
            En circulation
          </Badge>
        </div>
      </Card.Body>
      <Card.Footer
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text b>{name}</Text>
        <Text
          css={{
            color: "$accents7",
            fontWeight: "$semibold",
            fontSize: "$sm",
          }}
        >
          {new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </Card.Footer>
    </Card>
  );
}

NftCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default NftCard;
