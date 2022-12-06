import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";


function CardNft({favorit, cover, title, artist, onViewDetails, viewer }) {
  return (
    <Card isPressable css={{ h: "320px", w: "235px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
        
        
          <Text 
            size={24}
            weight="bold"
            transform="uppercase"
            css={{
              "&:hover": {
                text: "$gray800",
                color: "$blue100",
              },
              "&:active": {
                text: "$pink600",
              },
              "&:focus": {
                borderColor: "$pink200",
              },
            }}
          >
       {{favorit}== true  ?  
            <FontAwesomeIcon  icon={faHeart} className="red-200" /> 
            : "pasfavorit"}
          </Text>
         
        </Col>
      </Card.Header>

      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={cover}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>

      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          height: "20%",
          bottom: 0,
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={14}>
              {artist}
            </Text>

            {viewer > 200 && (
              <Text color="#000" size={14}>
                {viewer} view
              </Text>
            )}
          </Col>

          <Col>
            <Row justify="flex-end">
              <Button
                onPress={onViewDetails}
              
                auto
                css={{
                  marginTop: "$5",
                  borderRadius: "$xs", // radii.xs
                  border: "$space$px solid",
                  background: "$transparent",
                  color: "$black",
                  height: "$12", // space[12]
                  boxShadow: "$md", // shadows.md
                  "&:hover": {
                    background: "$transparent",
                    color: "$secondary",
                  },
                  "&:active": {
                    background: "$transparent",
                    color: "$black",
                  },
                  "&:focus": {
                    borderColor: "$blue800",
                  },
                }}
              >
                {title}
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default CardNft;