import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../_actions";
import { history } from "../../../_helpers";
import Loader from "../../Loader";

class Logout extends Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(userActions.logout());
    this.logout();
    history.push("/admin/login");
  }

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.clear();
  }

  render() {
    return <Loader />;
  }
}

export default Logout;
