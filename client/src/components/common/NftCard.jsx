import { Badge, Card, Text } from "@nextui-org/react";
import PropTypes from "prop-types";

function NftCard({
  name,
  image,
  buildYear,
  isPressable = true,
  showStatus = true,
  css,
}) {
  return (
    <Card isPressable={isPressable} css={css}>
      <Card.Body
        css={{
          p: 0,
          flexDirection: "row",
        }}
      >
        <Card.Image src={image} alt={name} />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          {showStatus && (
            <Badge color="primary" variant="flat" isSquared>
              En circulation
            </Badge>
          )}
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
          {buildYear}
        </Text>
      </Card.Footer>
    </Card>
  );
}

NftCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  buildYear: PropTypes.string.isRequired,
  isPressable: PropTypes.bool.isRequired,
  showStatus: PropTypes.bool.isRequired,
  css: PropTypes.object,
};

export default NftCard;
