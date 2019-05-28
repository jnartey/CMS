import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../../_actions";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {
  Home as Dboard,
  SupervisorAccount,
  PermIdentity
} from "@material-ui/icons";
import Key from "@material-ui/icons/VpnKeyOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import CancelIcon from "@material-ui/icons/CancelOutlined";

import Box from "@material-ui/core/Box";

//Form validation imports
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

//Loader import
import Loader from "../../Loader";
import { isEqual } from "lodash";

//General styles
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  spacing: [0, 2, 3, 5, 8],
  content: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 4,
    color: theme.palette.text.secondary
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  textRight: {
    textAlign: "right"
  },
  breadCrumbs: {
    marginBottom: "1rem"
  },
  update: {
    padding: "0rem 2rem"
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  dialogAction: {
    padding: "0 20px 20px",
    margin: "14px 0 0"
  },
  padRight: {
    paddingRight: "0.35rem"
  },
  padLeft: {
    paddingLeft: "0.35rem"
  },
  padLeftRight: {
    paddingLeft: "0.35rem",
    paddingRight: "0.35rem"
  },
  rightMargin: {
    marginRight: "0.35rem"
  },
  leftMargin: {
    marginLeft: "0.35rem"
  },
  buttonMargin: {
    margin: "0.7rem 0 0",
    paddingLeft: "0.8rem"
  },
  vAlign: {
    verticalAlign: "middle"
  }
  //   button: {
  //     minWidth: "32px"
  //   }
});

class UserAccount extends Component {
  static propTypes = {
    params: PropTypes.object,
    user_account: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      userData: {
        first_name: "",
        last_name: "",
        username: "",
        email: ""
      },
      userPass: {
        id: this.props.user.id,
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        username: this.props.user.username,
        email: this.props.user.email,
        current_password: "",
        new_password: "",
        confirm_password: ""
      },
      updating: false,
      //updatingpwd: false,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handlePasswordResetChange = this.handlePasswordResetChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.user_account, this.state.post)) {
      this.setState({ ...this.state, userData: nextProps.user_account });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user_account } = this.props;
    this.setState({
      userData: {
        ...user_account,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ updating: true });
    const { userData } = this.state;
    const { dispatch } = this.props;
    if (userData.first_name && userData.last_name) {
      dispatch(userActions.user_update(userData));
    }
  }

  handlePasswordResetChange(event) {
    const { userPass } = this.state;
    userPass[event.target.name] = event.target.value;
    this.setState({ userPass });
  }

  handlePasswordReset(event) {
    event.preventDefault();

    this.setState({ updatingpwd: true });
    const { userPass } = this.state;
    const { dispatch } = this.props;
    console.log(userPass);
    if (userPass.first_name && userPass.last_name) {
      dispatch(userActions.change_password(userPass));
    }
  }

  componentDidMount() {
    this.props.dispatch(userActions.getUserById(this.props.user.id));
    this.props.dispatch(userActions.getRole(this.props.user.id));
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.userPass.new_password) {
        return false;
      }
      return true;
    });
  }

  render() {
    const {
      classes,
      user_account,
      role,
      updating,
      updatingpwd,
      loading
    } = this.props;
    const { userData, userPass } = this.state;

    return (
      <div>
        {updatingpwd || updating || loading ? <Loader /> : ""}
        <main className={classes.content}>
          <Grid className={classes.loginContainer} container direction="row">
            <Grid item sm={12} md={10} lg={10} xs={12} xl={10}>
              <Grid
                className={classes.loginContainer}
                container
                direction="row"
              >
                <Grid item className={classes.breadCrumbs} xs={10}>
                  <Chip
                    avatar={
                      <Avatar>
                        <Dboard />
                      </Avatar>
                    }
                    label="Dashboard"
                    color="primary"
                    className={classes.chip}
                    component={Link}
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    to={"/admin/dashboard"}
                  />
                  <Chip
                    avatar={
                      <Avatar>
                        <SupervisorAccount />
                      </Avatar>
                    }
                    label={
                      user_account.first_name + " " + user_account.last_name
                    }
                    className={classes.chip}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.padRight}
            item
            sm={12}
            md={8}
            lg={8}
            xs={8}
            xl={8}
          >
            <Box my={2}>
              <Typography variant="h5" gutterBottom>
                <PermIdentity
                  style={{ fontSize: 30 }}
                  className={classes.vAlign}
                />
                <span className={classes.vAlign}>&nbsp;Account details</span>
              </Typography>
              <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                <Grid
                  className={classes.loginContainer}
                  container
                  direction="row"
                >
                  <Grid
                    className={classes.padRight}
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    xs={6}
                    xl={6}
                  >
                    <TextValidator
                      autoFocus
                      margin="dense"
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      type="text"
                      onChange={this.handleChange}
                      value={userData.first_name || ""}
                      validators={["required"]}
                      errorMessages={["First Name is required"]}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    className={classes.padLeft}
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    xs={6}
                    xl={6}
                  >
                    <TextValidator
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      type="text"
                      onChange={this.handleChange}
                      value={userData.last_name || ""}
                      validators={["required"]}
                      errorMessages={["Last Name is required"]}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={6} xs={6} xl={6}>
                    <TextValidator
                      className={classes.padRight}
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      onChange={this.handleChange}
                      value={userData.email || ""}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Email is required",
                        "Email is not valid"
                      ]}
                      variant="filled"
                      fullWidth
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    xs={6}
                    xl={6}
                    className={classes.padLeft}
                  >
                    <TextValidator
                      margin="dense"
                      id="username"
                      name="username"
                      label="Username"
                      type="text"
                      onChange={this.handleChange}
                      value={userData.username || ""}
                      validators={["required"]}
                      errorMessages={["Username is required"]}
                      variant="filled"
                      fullWidth
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    xs={6}
                    xl={6}
                    className={classes.padRight}
                  >
                    <TextValidator
                      id="outlined-read-only-input"
                      label="User role"
                      value={role.name || ""}
                      className={classes.textField}
                      margin="dense"
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    xs={6}
                    xl={6}
                    className={classes.textRight}
                  >
                    <Box my={2}>
                      {/* <Button
                        variant="contained"
                        size="large"
                        className={(classes.button, classes.rightMargin)}
                        // onClick={this.handleDialogClose}
                      >
                        <CancelIcon
                          className={classNames(
                            classes.leftIcon,
                            classes.iconSmall
                          )}
                        />
                        Cancel
                      </Button> */}
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                        className={(classes.button, classes.leftMargin)}
                      >
                        <SaveIcon
                          className={classNames(
                            classes.leftIcon,
                            classes.iconSmall
                          )}
                        />
                        Update
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Box>
            <Box my={4}>
              <Grid item sm={12} md={6} lg={6} xs={6} xl={6}>
                <Typography variant="h5" gutterBottom>
                  <Key style={{ fontSize: 30 }} className={classes.vAlign} />
                  <span className={classes.vAlign}>&nbsp;Password reset</span>
                </Typography>
              </Grid>
              <ValidatorForm ref="form" onSubmit={this.handlePasswordReset}>
                <Grid
                  className={classes.loginContainer}
                  container
                  direction="row"
                >
                  <Grid
                    item
                    sm={12}
                    md={4}
                    lg={4}
                    xs={4}
                    xl={4}
                    className={classes.padRight}
                  >
                    <TextValidator
                      margin="dense"
                      id="current_password"
                      name="current_password"
                      label="Current Password"
                      type={"password"}
                      onChange={this.handlePasswordResetChange}
                      value={userPass.current_password}
                      validators={["required"]}
                      errorMessages={["Current Password is required"]}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={4}
                    lg={4}
                    xs={4}
                    xl={4}
                    className={classes.padLeftRight}
                  >
                    <TextValidator
                      margin="dense"
                      id="new_password"
                      name="new_password"
                      label="New Password"
                      type={"password"}
                      onChange={this.handlePasswordResetChange}
                      value={userPass.new_password}
                      validators={["required"]}
                      errorMessages={["New Password is required"]}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={4}
                    lg={4}
                    xs={4}
                    xl={4}
                    className={classes.padLeft}
                  >
                    <TextValidator
                      margin="dense"
                      id="confirm_password"
                      name="confirm_password"
                      label="Confirm Password"
                      type={"password"}
                      onChange={this.handlePasswordResetChange}
                      value={userPass.confirm_password}
                      validators={["isPasswordMatch", "required"]}
                      errorMessages={[
                        "password mismatch",
                        "Confirm Password is required"
                      ]}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item sm={12} className={classes.textRight}>
                  <Box my={2}>
                    {/* <Button
                      variant="contained"
                      size="large"
                      className={(classes.button, classes.rightMargin)}
                      onClick={this.handleDialogClose}
                    >
                      <CancelIcon
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                      Cancel
                    </Button> */}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      className={(classes.button, classes.leftMargin)}
                    >
                      <SaveIcon
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                      Reset
                    </Button>
                  </Box>
                </Grid>
              </ValidatorForm>
            </Box>
          </Grid>
        </main>
      </div>
    );
  }
}

UserAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { user_account, authentication, role } = state;
  const { loading } = state.user_account;
  const { updating } = state.user_update;
  const { updatingpwd } = state.change_password;
  const { user } = authentication;
  return {
    user,
    user_account,
    updating,
    updatingpwd,
    loading,
    role
  };
}

const connectedUserAccountPage = withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(UserAccount)
);
export { connectedUserAccountPage as UserAccount };
