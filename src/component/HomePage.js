import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchGoodsDetails } from "../action/index";
import { Grid } from "@material-ui/core";
import ItemCard from "./ItemCard";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav_bar: {
    marginTop: "24px",
  },
}));

function App({ dispatch, list }) {
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchGoodsDetails());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className={classes.nav_bar}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={5}
        >
          {list &&
            list.map((item) => (
              <Grid item xs={12} sm={4} key={item.id}>
                <ItemCard item={item} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.products.items.data,
  };
};

export default connect(mapStateToProps)(App);
