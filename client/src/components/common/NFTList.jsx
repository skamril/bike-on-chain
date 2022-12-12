import { Grid } from "@nextui-org/react";
import PropTypes from "prop-types";
import NftCard from "./NftCard";

function NFTList({ list }) {
  return (
    <Grid.Container gap={2} justify="flex-start">
      {list.map((item, index) => (
        <Grid xs={3} key={index}>
          <NftCard key={item.id} {...item} />
        </Grid>
      ))}
    </Grid.Container>
  );
}

NFTList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(NftCard.propTypes)).isRequired,
};

export default NFTList;
