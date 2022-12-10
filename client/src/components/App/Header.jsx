import { Navbar, Text, Image, Dropdown } from "@nextui-org/react";
import { ConnectKitButton } from "connectkit";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { FaSearch } from "react-icons/fa";

function Header() {
  const { isConnected } = useAccount();
  const { pathname } = useLocation();
  const isMySpaceActive = pathname.startsWith("/myspace");

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
        enableCursorHighlight={!isMySpaceActive}
        variant="highlight"
        activeColor="neutral"
      >
        <Navbar.Link as={Link} to="/search" isActive={pathname === "/search"}>
          Rechercher
          <FaSearch style={{ marginLeft: 5, width: 16, padding: 0 }} />
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about" isActive={pathname === "/about"}>
          À propos
        </Navbar.Link>
        <Navbar.Link as={Link} to="/faq" isActive={pathname === "/faq"}>
          FAQ
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {isConnected && (
          <Dropdown isBordered isActive={isMySpaceActive}>
            <Navbar.Item>
              <Dropdown.Button light ripple={false}>
                Mon espace
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu>
              <Dropdown.Item description="Liste des mes vélos">
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
