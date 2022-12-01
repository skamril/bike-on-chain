import { Text, Spacer, Grid } from "@nextui-org/react";
import { Box } from "./Box.js";
import city from "../assets/img/city.jpg";

export const Content = () => (
  <Grid.Container>
    <Box className="city" css={{ "@xsMax": { px: "$10" } }}>
      <Grid xs={12}>
        <Text
          h1
          weight="bolder"
          css={{
            textAlign: "center",
            mt: "180px",
            textGradient: "$blue600 -20%, $blue400, $green100 50%",
          }}
        >
          Créez votre collection NFT péronsalisé
        </Text>
        <Text h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus velit libero officiis? Autem, quibusdam eaque ipsa
          quisquam vitae consectetur ea quaerat similique error veritatis
          tempore sed possimus recusandae minima at.{" "}
        </Text>
      </Grid>
    </Box>
  </Grid.Container>
);
