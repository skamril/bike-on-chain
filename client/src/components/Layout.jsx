import { Content } from "./Content";
import { ContentServices } from "./ContentServices";
import { Container } from "@nextui-org/react";


export const Layout = ({ children }) => (
  <Container css={{mw:"100%", pl:"0px"}}>
    {children}
  </Container>
);
