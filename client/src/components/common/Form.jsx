import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

function Form({ children, onSubmit, submitLabel }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "400px",
        }}
        onSubmit={onSubmit}
      >
        {children}
        <Button type="submit">{submitLabel}</Button>
      </form>
    </div>
  );
}

Form.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

export default Form;
