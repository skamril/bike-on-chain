import React from "react";
import { Grid, Text, Spacer } from "@nextui-org/react";
import thief from "../assets/img/thief.jpg";
import nft from "../assets/img/NftCertif.jpg";
import blockchain from "../assets/img/blockchain.jpg";

export const ContentServices = () => {
  return (
    <>
      <Grid.Container>
        <Grid xs={2} css={{ mt: "20px" }}>
          <img height={90} className="thief" src={blockchain} alt="Voleur" />
          </Grid>
          <Grid>
          <Text css={{ color:"White"}} h2>
            Blockchain
          </Text>
          <Text css={{ p: "10px", color:"White"}}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            optio
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container>
        <Grid css={{ mt: "20px" }} xs={2}>
          <img height={90} className="thief" src={nft} alt="Voleur" />
        </Grid>
        <Grid>
          <Text h2 css={{ p: "10px", color:"White"}}>Certificat de proprieté</Text>
          <Text css={{ color:"White"}}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            optio
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container>
        <Grid css={{ mt: "20px" }} xs={2}>
          <img height={90} className="thief" src={thief} alt="Voleur" />
        </Grid>
        <Grid>
        <Text h2 css={{ p: "10px", color:"White"}}>Lutte contre le recel</Text>
        <Text css={{ color:"White"}}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            optio
          </Text>
          </Grid>
      </Grid.Container>
    </>
  );
};
