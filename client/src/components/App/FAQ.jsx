import { Collapse, Text } from "@nextui-org/react";
import Hero from "./shared/Hero";

function FAQ() {
  return (
    <>
      <Hero>
        <Text h2>Foire aux questions</Text>
      </Hero>
      <Collapse.Group>
        <Collapse title="Question 1">
          <Text>Réponse 1</Text>
        </Collapse>
        <Collapse title="Question 2">
          <Text>Réponse 2</Text>
        </Collapse>
        <Collapse title="Question 3">
          <Text>Réponse 3</Text>
        </Collapse>
      </Collapse.Group>
    </>
  );
}

export default FAQ;
