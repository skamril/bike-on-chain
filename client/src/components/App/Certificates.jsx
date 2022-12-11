import { Text } from "@nextui-org/react";
import NFTList from "../common/NFTList";
import Hero from "./shared/Hero";

const list = [
  {
    name: "ROCKRIDER ST 500",
    img: "https://contents.mediadecathlon.com/p1732642/k$da7d34b23236655c16daa6d6d25d4511/sq/vtt-enfant-rockrider-st-500-24-pouces-9-12-ans-jaune-fluo.jpg?format=auto&f=646x646",
    date: "01/02/20222",
  },
  {
    name: "ROCKRIDER ST 120",
    img: "https://contents.mediadecathlon.com/p1690024/k$03d57d020e4bda4ca5c4f2a3b7fec7cc/sq/vtt-enfant-rockrider-st-120-20-pouces-6-9-ans-blanc-bleu.jpg?format=auto&f=646x646",
    date: "01/02/20222",
  },
  {
    name: "ROCKRIDER ST 120",
    img: "https://contents.mediadecathlon.com/p1690024/k$03d57d020e4bda4ca5c4f2a3b7fec7cc/sq/vtt-enfant-rockrider-st-120-20-pouces-6-9-ans-blanc-bleu.jpg?format=auto&f=646x646",
    date: "01/02/20222",
  },
  {
    name: "ROCKRIDER ST 120",
    img: "https://contents.mediadecathlon.com/p1690024/k$03d57d020e4bda4ca5c4f2a3b7fec7cc/sq/vtt-enfant-rockrider-st-120-20-pouces-6-9-ans-blanc-bleu.jpg?format=auto&f=646x646",
    date: "01/02/20222",
  },
  {
    name: "ROCKRIDER ST 120",
    img: "https://contents.mediadecathlon.com/p1690024/k$03d57d020e4bda4ca5c4f2a3b7fec7cc/sq/vtt-enfant-rockrider-st-120-20-pouces-6-9-ans-blanc-bleu.jpg?format=auto&f=646x646",
    date: "01/02/20222",
  },
];

function Certificates() {
  return (
    <>
      <Hero>
        <Text h2 css={{ m: 0 }}>
          Mes certificats
        </Text>
      </Hero>
      <NFTList list={list} />
    </>
  );
}

export default Certificates;
