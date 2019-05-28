import { Header } from "./elements/header";
import Footer from "./elements/footer";
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

class Layout extends Component {
  componentDidMount() {}
  render() {
    //console.log(localStorage.getItem("user"));
    return (
      <div>
        {localStorage.getItem("user") ? (
          <Header hdata={localStorage.getItem("user")} />
        ) : (
          ""
        )}
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
