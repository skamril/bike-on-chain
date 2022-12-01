import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { Layout } from "./Layout";
import LogoBoc from "./LogoBoc";
import SearchIcon from "./SearchIcon";
import { ConnectKitButton } from "connectkit";
export default function NavbarBoc() {
  return (
    <Layout>
      
      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <Text css={{ mt: "25px", mr: "10px" }}>
            <LogoBoc />
          </Text>
          {/* <Text className="chain" css={{ mt: "70px" }}>
            {" "}
            B@C{" "}
          </Text> */}

          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Item
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "center",
                },
              }}
            >
              <Input
                clearable
                contentLeft={
                  <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
                }
                contentLeftStyling={false}
                css={{
                  mr: "10px",
                  w: "100%",
                  "@xsMax": {
                    mw: "200px",
                  },
                  "& .nextui-input-content--left": {
                    h: "100%",
                    ml: "$4",
                    dflex: "center",
                  },
                }}
                placeholder="Search..."
              />
            </Navbar.Item>
            <Navbar.Link isActive href="#">
              A propos
            </Navbar.Link>
            <Navbar.Link href="#">Docs</Navbar.Link>
            <Navbar.Link href="#">Faq</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <ConnectKitButton/>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
