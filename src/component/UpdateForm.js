import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Typography, Button, Switch, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import { searchItem, updateItem } from "../action/index";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav_bar: {
    marginTop: "24px",
  },
  searchInput: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  searchIcon: {
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
  },
  search: {
    display: "flow-root",
  },
}));

const UpdateForm = ({ dispatch, item = null, isUpdateSuccess }) => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [active, setActive] = useState(false);
  const [img, setImg] = useState("");
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (item != null) {
      setTitle(item.title);
      setDescription(item.description);
      setPrice(item.price);
      setStock(item.stock);
      setActive(item.active);
      setImg(item.img);
    }
  }, [item]);

  const onClickSave = () => {
    const body = {
      title,
      description,
      price,
      stock,
      active,
      img,
    };
    dispatch(updateItem(id, body));
    setHasUpdated(true);
  };

  const onClickSearch = () => {
    console.log("id -->", id);
    console.log("item -->", item);
    dispatch(searchItem(id));
  };

  const isItemFound = item != null && Object.keys(item).length > 0;

  return (
    <div>
      <Typography>Search for item id: </Typography>
      <Input
        placeholder={"eg. 123"}
        type="number"
        onChange={(e) => setId(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SearchIcon />}
        onClick={onClickSearch}
      />
      <br />
      {isItemFound && (
        <div>
          <Typography>Title: </Typography>
          <Input
            value={title}
            fullWidth
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography>Description: </Typography>
          <Input
            value={description}
            fullWidth
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography>Price: </Typography>
          <Input
            value={price}
            fullWidth
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Typography>Stock: </Typography>
          <Input
            value={stock}
            fullWidth
            type="number"
            onChange={(e) => setStock(e.target.value)}
          />
          <Typography>Image: </Typography>
          <Input
            value={img}
            fullWidth
            type="text"
            onChange={(e) => setImg(e.target.value)}
          />
          <Typography>Display status: </Typography>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Inactive</Grid>
            <Grid item>
              <Switch
                checked={active}
                onChange={() => setActive(!active)}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid item>Active</Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SendIcon />}
            onClick={onClickSave}
          />
          {hasUpdated && (
            <Typography color="secondary">
              {isUpdateSuccess ? "Success!" : "Error! Try again later."}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    item: state.searchedItem.item.data,
    isUpdateSuccess: state.updateItem.isSuccess,
  };
};

export default connect(mapStateToProps)(UpdateForm);
