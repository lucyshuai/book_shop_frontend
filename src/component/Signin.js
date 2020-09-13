import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { signInUser } from "../action/index";

const useStyles = makeStyles((theme) => ({
  selectBtn: {
    borderRadius: "20px",
    backgroundColor: "#FFEBEE",
    //   color: Color.dark,
  },
  InforList: {
    borderRadius: "20px",
    //   backgroundColor: Color.dark,
    color: "white",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  buttonContainer: {
    display: "flex",
    height: "100px",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: "50px",
  },
  // BtnRoot: {
  //   backgroundColor: Color.red_40,
  //   hover: Color.red_30,
  // },
  licenseBtnContainer: {
    display: "grid",
    flexDirection: "column",
    margin: "20px",
  },
  licenseBtn: {
    borderRadius: "20px",
    backgroundColor: "white",
    height: "30px",
  },
}));

function SignIn({ dispatch }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.buttonContainer}>
      <Dialog disableBackdropClick disableEscapeKeyDown open={!open}>
        <DialogTitle>Get started with Book Shop</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </form>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(signInUser(username, password));
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect()(SignIn);
