import React, { Component, Redirect } from "react";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../components";
import { history } from "../_helpers";

//import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themes, { overrides } from "../themes";
import Layout from "../components/Layout/LayoutContainer";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../_helpers/snackbar.helper";

import { Login } from "../components/admin/users/login";
import Dashboard from "../components/admin/dashboard/index";
import Logout from "../components/admin/users/logout";
import { UserAccounts } from "../components/admin/users/user_accounts";
import { UserAccount } from "../components/admin/users/user_account";
//import Layout from "../components/admin/Layout";
import Home from "../components/site/Home";

const theme = createMuiTheme({ ...themes.default, ...overrides });
let openSnackbarFn;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbar: true
    };

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  componentWillReceiveProps() {
    if (this.props.alert) {
      this.setState({ openSnackbar: true });
    }
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.props.dispatch(alertActions.clear());
    this.setState({ openSnackbar: false });
  };

  handleExited = () => {
    this.props.dispatch(alertActions.clear());
    this.setState({ openSnackbar: false });
  };

  render() {
    const { alert, classes } = this.props;

    // const PublicRoute = ({ component, ...rest }) => {
    //   return (
    //     <Route
    //       {...rest}
    //       render={props =>
    //         localStorage.getItem("id_token") ? (
    //           <Redirect
    //             to={{
    //               pathname: "/"
    //             }}
    //           />
    //         ) : (
    //           React.createElement(component, props)
    //         )
    //       }
    //     />
    //   );
    // };

    // const PrivateRoute = ({ component, ...rest }) => {
    //   return (
    //     <Route
    //       {...rest}
    //       render={props =>
    //         localStorage.getItem("id_token") ? (
    //           React.createElement(component, props)
    //         ) : (
    //           <Redirect
    //             to={{
    //               pathname: "/login",
    //               state: { from: props.location }
    //             }}
    //           />
    //         )
    //       }
    //     />
    //   );
    // };

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Wrapper>
            <TransitionGroup className="transition-group">
              <CSSTransition
                in={true}
                timeout={{ enter: 300, exit: 300 }}
                classNames="fade"
              >
                <section className="route-section">
                  {alert.message && (
                    <Snackbar
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                      open={this.state.openSnackbar}
                      autoHideDuration={6000}
                      onClose={this.handleSnackbarClose}
                      onExit={this.handleSnackbarClose}
                      onExited={this.handleExited}
                    >
                      <MySnackbarContentWrapper
                        variant={alert.type}
                        //className={classes.margin}
                        message={alert.message}
                      />
                    </Snackbar>
                  )}

                  <Switch /*location={location}*/>
                    <Route exact path="/home" component={Home} />
                    <Route path="/admin/login" component={Login} />
                    <Route path="/admin/logout" component={Logout} />
                    <Layout>
                      <PrivateRoute
                        path="/admin/dashboard"
                        component={Dashboard}
                        render={() => <Redirect to="/admin/dashboard" />}
                      />
                      <PrivateRoute
                        path="/admin/users"
                        component={UserAccounts}
                      />
                      <PrivateRoute
                        path="/admin/users/user_account/:id"
                        component={UserAccount}
                      />
                      {/* <PublicRoute path="/login" component={Login} /> */}
                      <Route component={Error} />
                    </Layout>
                  </Switch>
                </section>
              </CSSTransition>
            </TransitionGroup>
          </Wrapper>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }
  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
