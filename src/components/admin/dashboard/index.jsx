import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Grid, Chip, Avatar, MenuItem } from "@material-ui/core";

import {
  Home as HomeIcon,
  SupervisorAccount,
  Lock,
  FilterNone as Pages
} from "@material-ui/icons";

// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";

import PageTitle from "../PageTitle/PageTitle";
import { Typography } from "../Wrappers/Wrappers";
import Dot from "../Sidebar/components/Dot";

import Loader from "../../Loader";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  // toolbar: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   padding: "0 8px",
  //   ...theme.mixins.toolbar
  // },
  breadCrumbs: {
    marginBottom: "1rem"
  },
  update: {
    padding: "0rem 2rem"
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  textCenter: {
    textAlign: "center"
  },
  dashIcon: {
    fontSize: "4.5rem"
  },
  dashLink: {
    display: "block",
    color: "#555555",
    textDecoration: "none",
    border: "3px solid #e0e0e0",
    borderRadius: "8px",
    margin: "0 0.5rem 0.5rem 0",
    minWidth: 196,
    paddingTop: "1.5rem",
    paddingBottom: "2.5rem",
    "&:hover": {
      border: "3px solid #706060"
    }
  },
  card: {
    minWidth: 196,
    paddingTop: "1.5rem",
    paddingBottom: "2rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: true
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("user")) {
    } else {
      this.setState({ isLoggedIn: true });
      //this.setState({ loading: false });
    }
    this.setState({ loading: false });
    localStorage.setItem("pageTitle", "Dashboard");
  }

  render() {
    const { classes, theme, ...props } = this.props;
    const { loading } = this.state;
    //const bull = <span className={classes.bullet}>•</span>;
    // if (this.state.isLoggedIn) {
    //   return <Redirect to="/admin/login" />;
    // }

    return (
      <div>
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <main className={classes.content}>
              <Grid
                className={classes.loginContainer}
                container
                direction="row"
              >
                <Grid
                  item
                  className={classes.breadCrumbs}
                  sm={12}
                  md={9}
                  lg={9}
                  xs={12}
                  xl={9}
                >
                  <Chip
                    avatar={
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    }
                    label="Dashboard"
                    className={classes.chip}
                  />
                </Grid>
                <Grid item sm={12} md={8} lg={8} xs={12} xl={8}>
                  <Grid className={classes.root} container direction="row">
                    <Grid
                      item
                      className={classes.textCenter}
                      sm={12}
                      md={4}
                      lg={3}
                      xs={12}
                      xl={3}
                    >
                      <Link className={classes.dashLink} to="/admin/users">
                        <SupervisorAccount className={classes.dashIcon} />
                        <Typography variant="h6" component="h2">
                          User Accounts
                        </Typography>
                        <Typography component="p">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      item
                      className={classes.textCenter}
                      sm={12}
                      md={4}
                      lg={3}
                      xs={12}
                      xl={3}
                    >
                      <Link
                        className={classes.dashLink}
                        to="/admin/user-privileges"
                      >
                        <Lock className={classes.dashIcon} />
                        <Typography variant="h6" component="h2">
                          User Privileges
                        </Typography>
                        <Typography component="p">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      item
                      className={classes.textCenter}
                      sm={12}
                      md={4}
                      lg={3}
                      xs={12}
                      xl={3}
                    >
                      <Link className={classes.dashLink} to="/admin/pages">
                        <Pages className={classes.dashIcon} />
                        <Typography variant="h6" component="h2">
                          Pages
                        </Typography>
                        <Typography component="p">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  className={classes.update}
                  item
                  sm={12}
                  md={3}
                  lg={3}
                  xs={12}
                  xl={3}
                >
                  {/* <Typography variant="h6" component="h5">
                  Updates
                </Typography> */}
                </Grid>
              </Grid>
            </main>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
