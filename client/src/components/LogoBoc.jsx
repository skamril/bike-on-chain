import React from "react";
import B from "../assets/img/B.png";
import O from "../assets/img/O.png";
import C from "../assets/img/C.png";
import engrenge from "../assets/img/engrenage.png";

function LogoBoc() {
  return (
    <>
      <div>
        <img height={70} src={engrenge}></img>
      </div>
      <div>
        <img height={70} src={engrenge}></img>
      </div>
      <div>
        <img height={70} src={B}></img>
      </div>
      <div>
        <img height={70} src={O}></img>
      </div>
      <div>
        <img height={70} src={C}></img>
      </div>
    </>
  );
}

export default LogoBoc;
