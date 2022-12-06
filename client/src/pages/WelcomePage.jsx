import Navbar from "../components/Navbar";
import { Layout } from "../components/Layout";
import { Content } from "../components/Content";
import { ContentServices } from "../components/ContentServices";
export default function WelcomePage() {
  return (
    <div className="city">
      <Layout>
        <Navbar />;
         <Content />
    <ContentServices />
      </Layout>
    </div>
  );
}
