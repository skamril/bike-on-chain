import { Text, Spacer, Grid } from "@nextui-org/react";
<<<<<<< HEAD


export const Content = () => (
  <Grid.Container>
    
=======
import { Box } from "./Box.js";

export const Content = () => (
  <Grid.Container>
    <Box className="city" css={{ "@xsMax": { px: "$10" } }}>
>>>>>>> dd0fe45 (Modif du nom des compostants, ajout contrat solidity dans hardhat  (#1))
      <Grid xs={12}>
        <Text
          h1
          weight="bolder"
          css={{
            textShadow: "2px 2px 1px",
            color: "$gray500",
            textAlign: "center",
            mt: "180px",
            textGradient: "25deg, $blue700 -10%, $blue500, $green300 50%",
          }}
        >
          Créez votre collection NFT péronsalisé
        </Text>
        <Text
          css={{
            p: "3em",
            color: "$blue100",
            textGradient: "25deg, $blue200 -10%, $blue100, $green200 50%",
          }}
          h4
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus velit libero officiis? Autem, quibusdam eaque ipsa
          quisquam vitae consectetur ea quaerat similique error veritatis
          tempore sed possimus recusandae minima at, Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Quisquam totam aut quam delectus iure
          recusandae ea optio reiciendis. Necessitatibus qui, et eius illum
          deleniti tenetur cum doloremque earum inventore facilis.
        </Text>
      </Grid>
<<<<<<< HEAD
 
=======
    </Box>
>>>>>>> dd0fe45 (Modif du nom des compostants, ajout contrat solidity dans hardhat  (#1))
  </Grid.Container>
);
