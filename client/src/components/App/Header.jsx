import { Navbar, Text, Image, Dropdown, Button } from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaPlusSquare } from "react-icons/fa";
import certificateIcon from "../../assets/images/certificate.png";
import useEth from "../contexts/EthContext/useEth";

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
  const {
    state: { isConnected, isOwner },
  } = useEth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isPublicLinkActive = !!PUBLIC_LINKS_DATA.find(
    ([to]) => to === pathname
  );

  const privateLinksData = [
    isOwner && [
      "/create-certificates",
      "Créer des certificats",
      "Ajouter des certificats pour vos stocks",
      <FaPlusSquare style={{ width: 30 }} key="icon" />,
    ],
    [
      "/my-certificates",
      "Mes certificats",
      "Liste des mes vélos",
      certificateIcon,
    ],
  ].filter(Boolean);

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
              {privateLinksData.map(([to, title, description, icon]) => (
                <Dropdown.Item
                  key={to}
                  description={description}
                  icon={
                    typeof icon === "string" ? (
                      <img src={icon} width={25} style={{ marginRight: 5 }} />
                    ) : (
                      icon
                    )
                  }
                >
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar.Content>
    </Navbar>
  );
}

export default Header;
