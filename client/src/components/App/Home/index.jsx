import { Text } from "@nextui-org/react";
import video from "../../../assets/videos/pexels-pavel-danilyuk-5790079.mp4";
import polygonLogo from "../../../assets/images/polygon-matic-logo.png";
import bicycleBlockChainIcon from "../../../assets/images/bicycle-block-chain.png";
import certificateIcon from "../../../assets/images/certificate.png";
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
            borderRadius:"5px",
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
          On peut définir la blockchain comme une base de données qui contient
          l’historique de tous les échanges effectués entre ses utilisateurs
          depuis sa création. Cette base de données est sécurisée et
          distribuée : elle est partagée par ses différents utilisateurs, sans
          intermédiaire, ce qui permet à chacun de vérifier la validité de la
          chaîne. Notre application s'appuie sur la Blockchain POLYGON, vous
          offrant la confidentialité,la transparence et la sécurité d'une
          blockchain publique éprouvé.
        </TextBlock>
        <TextBlock icon={certificateIcon}>
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
