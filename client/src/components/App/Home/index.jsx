import { Text } from "@nextui-org/react";
import video from "../../../assets/videos/pexels-pavel-danilyuk-5790079.mp4";
import polygonLogo from "../../../assets/images/polygon-matic-logo.png";
import bicycleBlockChainIcon from "../../../assets/images/bicycle-block-chain.png";
import certificatIcon from "../../../assets/images/certificat.png";
import thiefIcon from "../../../assets/images/thief.png";
import TextBlock from "./TextBlock";

function Home() {
  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 100,
          height: 500,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            top: -150,
            left: 0,
            filter: "blur(4px)",
            width: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
        <Text
          h1
          css={{
            background: "white",
            padding: "5px 15px",
          }}
        >
          Identifiez votre vélo sur la blockhain
          <img
            width={50}
            src={polygonLogo}
            style={{ verticalAlign: "text-top", marginLeft: 10 }}
            alt="Polygon"
            title="Polygon"
          />
        </Text>
      </div>
      <div
        style={{
          padding: "50px 130px",
          display: "flex",
          flexDirection: "column",
          gap: 70,
        }}
      >
        <TextBlock icon={bicycleBlockChainIcon}>
          Blockchain technology is an advanced database mechanism that allows
          transparent information sharing within a business network. A
          blockchain database stores data in blocks that are linked together in
          a chain.
        </TextBlock>
        <TextBlock icon={certificatIcon}>
          Les certificats d'authentification serveur sont des certificats qui
          servent à identifier de façon sûre le serveur (ou les applications)
          auprès d'autres applications tierces. En effet comme tous les
          certificats, le certificat d'authentification serveur est considéré
          comme la carte d'identité du serveur.
        </TextBlock>
        <TextBlock icon={thiefIcon}>
          Le projet de lutte contre le recel par marquage au laser en est encore
          au stade de concept. La technique dite "au laser" ne constitue pour
          l'instant qu'une technique parmi d'autres possibles.
        </TextBlock>
      </div>
    </>
  );
}

export default Home;
