import { Input, Text, Button } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import Hero from "./shared/Hero";

function Search() {
  return (
    <Hero>
      <Text h2>Rechercher un vélo à l'aide de son numéro de série</Text>
      <div style={{ display: "flex", gap: 5 }}>
        <Input
          labelLeft="S/N"
          placeholder="Taper le numéro de série"
          size="xl"
          animated={false}
          shadow={false}
          width={500}
          clearable
        />
        <Button
          auto
          flat
          icon={<FaSearch />}
          css={{ height: "auto", width: 50 }}
        />
      </div>
    </Hero>
  );
}

export default Search;
