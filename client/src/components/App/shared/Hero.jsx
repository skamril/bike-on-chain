import bikesMotif from "../../../assets/images/bocnft.png";
import PropTypes from "prop-types";

function Hero({ children }) {
  return (
    <div
      style={{
        height:"400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${bikesMotif})`,
        backgroundSize: "130%",
        padding: "150px 0",
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
