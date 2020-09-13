import React, { useReducer } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import { updateCartSuccess } from "../action/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(4),
    },
  },
  cart: {
    cursor: "pointer",
    paddingLeft: 20,
  },
}));

const INCREMENT = "increment";
const DECREMENT = "decrement";
const CLEAR = "CLEAR";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case CLEAR:
      return 0;
    default:
      return state;
  }
};

function CountButton({ price, dispatch }) {
  const [itemCount, itemDispatch] = useReducer(reducer, 0);
  const classes = useStyles();

  const addToCart = () => {
    dispatch(updateCartSuccess({ count: itemCount, cost: itemCount * price }));
    itemDispatch({ type: CLEAR });
  };

  return (
    <div className={classes.root}>
      <ButtonGroup>
        <Button
          aria-label="reduce"
          disabled={itemCount <= 0}
          onClick={() => itemDispatch({ type: DECREMENT })}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Button
          aria-label="increase"
          onClick={() => itemDispatch({ type: INCREMENT })}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <div onClick={addToCart} className={classes.cart}>
        <Badge color="secondary" badgeContent={itemCount}>
          <ShoppingCartIcon />
        </Badge>
        <Typography variant="body2">Add to cart</Typography>
      </div>
    </div>
  );
}

export default connect()(CountButton);
