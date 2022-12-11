import { Navbar, Text, Image, Dropdown } from "@nextui-org/react";
import { ConnectKitButton } from "connectkit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { FaSearch } from "react-icons/fa";
import certificateIcon from "../../assets/images/certificate.png";

const PUBLIC_LINKS_DATA = [
  [
    "/search",
    <>
      Rechercher <FaSearch style={{ marginLeft: 5, width: 16, padding: 0 }} />
    </>,
  ],
  ["/about", "À propos"],
  ["/faq", "FAQ"],
];

function Header() {
  const { isConnected } = useAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isPublicLinkActive = !!PUBLIC_LINKS_DATA.find(
    ([to]) => to === pathname
  );

  return (
    <Navbar
      variant="sticky"
      css={{
        borderBottom:
          "var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor)",
      }}
    >
      <Navbar.Brand as={Link} to="/">
        <Image src="/logo.png" css={{ width: 50, marginRight: 10 }} />
        <Text b>Bike On Chain</Text>
      </Navbar.Brand>
      <Navbar.Content
        variant="highlight"
        activeColor="neutral"
        enableCursorHighlight={isPublicLinkActive}
      >
        {PUBLIC_LINKS_DATA.map(([to, label]) => (
          <Navbar.Link key={to} as={Link} to={to} isActive={to === pathname}>
            {label}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        {isConnected && (
          <Dropdown isBordered>
            <Navbar.Item>
              <Dropdown.Button light ripple={false}>
                Mon espace
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu onAction={navigate}>
              <Dropdown.Item
                key="/my-certificates"
                description="Liste des mes vélos"
                icon={
                  <img
                    src={certificateIcon}
                    width={25}
                    style={{ marginRight: 5 }}
                  />
                }
              >
                Mes certificats
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <ConnectKitButton label="Se connecter" />
      </Navbar.Content>
    </Navbar>
  );
}

export default Header;
