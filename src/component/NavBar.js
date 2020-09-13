import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SignIn from "./Signin";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router-dom";
import Settlement from "./Settlement";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    cursor: "pointer",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  isSignedIn: {
    color: "green",
  },
  isNotSignedIn: {
    color: "red",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

function NavBar({ isSignedIn, cartCount, totalCost }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSignin, setShowSignin] = useState(false);
  const [open, setOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const history = useHistory();

  useEffect(() => {
    if (isSignedIn) {
      setShowSignin(false);
    }
  }, [isSignedIn]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickSignin = () => {
    setShowSignin(!showSignin);
  };

  const cartConutDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goToAdmin = () => {
    history.push("/admin");
  };

  const goToHome = () => {
    history.push("/home");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography align="center" variant="subtitle1" color="primary">
        For Admin
      </Typography>

      {!isSignedIn && <MenuItem onClick={onClickSignin}>Sign in</MenuItem>}
      <MenuItem>
        <span
          className={isSignedIn ? classes.isSignedIn : classes.isNotSignedIn}
        >
          {isSignedIn ? "Signed in" : "Not signed in"}
        </span>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={goToHome}
          >
            Book Shop
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge color="secondary">
                {isSignedIn && <AssignmentIcon onClick={goToAdmin} />}
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon onClick={cartConutDialog} />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {showSignin && <SignIn />}
      {open && (
        <Settlement
          open={open}
          handleClose={handleClose}
          totalCost={totalCost}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.signedIn.isSuccess,
    cartCount: state.cart.count,
    totalCost: state.cart.cost,
  };
};

export default connect(mapStateToProps)(NavBar);
