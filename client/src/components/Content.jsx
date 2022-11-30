import { Text, Spacer } from "@nextui-org/react";
import { Box } from "./Box.js";
import city from "../assets/img/city.jpg";

export const Content = () => (
  <Box css={{ "@xsMax": { px: "$10" } }}>
    <Text css={{ transform }}>NFT</Text>
    <div>
      {" "}
      <img width={1280} src={city}></img>
    </div>
  </Box>
);
