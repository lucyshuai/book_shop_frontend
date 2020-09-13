import React from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import UpdateForm from "./UpdateForm";

const ErrorPage = () => {
  return (
    <div>
      <h1>You need to sign in as an Admin</h1>
    </div>
  );
};

function AdminPage({ isSignedIn }) {
  return (
    <div>
      <NavBar />
      {isSignedIn === true ? <UpdateForm /> : <ErrorPage />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.signedIn.isSuccess,
  };
};

export default connect(mapStateToProps)(AdminPage);
