import { Content } from "./Content"
import { ContentServices } from "./ContentServices";
import { Box } from "./Box";

export const Layout = ({ children }) => (
  <Box 
    css={{
      maxW: "100%"
    }}
  >
    
    {children}
    <Content />
<ContentServices/>
  </Box>
);