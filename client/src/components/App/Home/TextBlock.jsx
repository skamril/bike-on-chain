import { Text } from "@nextui-org/react";
import PropTypes from "prop-types";

function TextBlock({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={icon} width={100} style={{ marginRight: 40 }} />
      <Text>{children}</Text>
    </div>
  );
}

TextBlock.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default TextBlock;
