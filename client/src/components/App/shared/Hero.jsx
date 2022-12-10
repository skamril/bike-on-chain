import bikesMotif from "../../../assets/images/bikes-motif.jpeg";
import PropTypes from "prop-types";

function Hero({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${bikesMotif})`,
        padding: "50px 0",
        marginBottom: 15,
      }}
    >
      <div
        style={{
          background: "whitesmoke",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

Hero.propTypes = {
  children: PropTypes.node,
};

export default Hero;
