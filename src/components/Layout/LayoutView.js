import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import classnames from "classnames";

import Header from "../admin/Header";
import Sidebar from "../admin/Sidebar";

import { Login } from "../admin/users/login";
import Dashboard from "../admin/dashboard/index";
import Logout from "../admin/users/logout";
import { UserAccounts } from "../admin/users/user_accounts";
import { UserAccount } from "../admin/users/user_account";
//import Layout from "../components/admin/Layout";
import Home from "../site/Home";

// pages
// import Dashboard from '../../pages/dashboard';
// import Typography from '../../pages/typography';
// import Notifications from '../../pages/notifications';
// import Maps from '../../pages/maps';
// import Tables from '../../pages/tables';
// import Icons from '../../pages/icons';
// import Charts from '../../pages/charts';

class Layout extends Component {
  componentDidMount() {}

  render() {
    const { classes, isSidebarOpened, toggleSidebar, props, user } = this.props;
    //console.log(localStorage.getItem("user"));
    return (
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <React.Fragment>
            {localStorage.getItem("user") ? <Header /> : ""}
            {localStorage.getItem("user") ? <Sidebar /> : ""}

            <div
              className={classnames(
                classes.content,
                localStorage.getItem("user") ? classes.adminContent : "",
                {
                  [classes.contentShift]: isSidebarOpened
                }
              )}
            >
              {/* {this.props.children} */}
              <Switch>
                <Route
                  path="/admin/users/user_account/:id"
                  component={UserAccount}
                />
                <Route path="/admin/users" component={UserAccounts} />} />
                <Route
                  path="/admin/dashboard"
                  component={props => <Dashboard {...props} />}
                />
                <Route path="/admin/logout" component={Logout} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
// const Layout = ({ classes, isSidebarOpened, toggleSidebar, props, user }) => (

// );

const styles = theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden"
  },
  content: {
    flexGrow: 1,
    width: `calc(100vw - 240px)`,
    minHeight: "100vh"
  },
  adminContent: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(12)
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
  // fakeToolbar: {
  //   ...theme.mixins.toolbar
  // }
});

export default withRouter(withStyles(styles)(Layout));
