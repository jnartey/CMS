import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Dboard from "@material-ui/icons/Dashboard";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Pageview from "@material-ui/icons/PageviewOutlined";
import Edit from "@material-ui/icons/EditOutlined";
import Delete from "@material-ui/icons/DeleteOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../../../_helpers/snackbar.helper";

//Table Imports
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import AutoRenewIcon from "@material-ui/icons/AutorenewOutlined";
import { lighten } from "@material-ui/core/styles/colorManipulator";

//Form dialog imports
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

//Form validation imports
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import { userActions } from "../../../_actions";
// import { generatePassword } from "../../../_helpers/password.generator";

//Loader import
import Loader from "../../Loader";

//CSS for custom header cell
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#f2f4f9",
    fontWeight: 600,
    color: "#555555" //theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

//General styles
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  content: {
    flexGrow: 1,
    padding: "6rem 1.5rem"
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
  buttonMargin: {
    margin: "0.7rem 0 0",
    paddingLeft: "0.8rem"
  }
  //   button: {
  //     minWidth: "32px"
  //   }
});

createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "first_name",
    string: true,
    disablePadding: true,
    label: "Name"
  },
  { id: "email", string: true, disablePadding: false, label: "Email" },
  { id: "roles", string: true, disablePadding: false, label: "Role" },
  { id: "status", string: true, disablePadding: false, label: "Status" },
  { id: "action", string: true, disablePadding: false, label: "Action" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </CustomTableCell>
          {rows.map(row => {
            return (
              <CustomTableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.string ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

const dialogProps = {
  deleted: false,
  alertTitle: "",
  alertMessage: "",
  toDelete: []
};

const confirmAlertSelected = sel => {
  dialogProps.deleted = true;
  dialogProps.alertTitle = "Confirm Delete";
  dialogProps.alertMessage = "Are you sure you want to delete user account(s)?";
  dialogProps.toDelete = sel;
};

let EnhancedTableToolbar = props => {
  const { numSelected, classes, selectId } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {tableTitle}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              //onClick={event => confirmAlertSelected({ selectId })}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const tableTitle = "Users";

class UserAccounts extends Component {
  //state = {};

  constructor(props) {
    super(props);

    //console.log("custom: " + this.props.user);
    let user = localStorage.getItem("user");
    const userCredentials = JSON.parse(user);

    this.state = {
      redirect: false,
      order: "asc",
      orderBy: "name",
      selected: [],
      data: [],
      page: 0,
      userData: userCredentials,
      rowsPerPage: 5,
      loading: false,
      open: false,
      _isMounted: false,
      showPassword: false,
      openSnackbar: false,
      messageType: "",
      message: "",
      deleted: false,
      alertTitle: "",
      alertMessage: "",
      toDelete: "",
      formData: {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        role_id: ""
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.generatePasswordChange = this.generatePasswordChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.confirmAlert = this.confirmAlert.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());

    this.getUsers();
  }

  // componentWillMount() {
  //   this.getUsers();
  //   this.setState({
  //     data: this.props.users,
  //     loading: false
  //   });
  //   //console.log(this.props);
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Table functions
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  getUsers = () => {
    //if (this._isMounted) {
    this.setState({
      data: this.props.users,
      loading: false
    });
    //}

    //console.log("data: " + Object.values(this.state.data));
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  //Form dialog functions
  handleDialogClickOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false, deleted: false });
    this.getUsers();
  };

  handleFormChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleFormSubmit() {
    //console.log(JSON.stringify(this.state.formData));
    // PostDataAuth(
    //   "adduser",
    //   this.state.formData,
    //   this.state.userData.token
    // ).then(result => {
    //   let reponseJSON = result;
    //   if (reponseJSON.data) {
    //     this.setState({
    //       formData: {
    //         first_name: "",
    //         last_name: "",
    //         email: "",
    //         username: "",
    //         password: "",
    //         role_id: ""
    //       },
    //       openSnackbar: true,
    //       messageType: "success",
    //       message:
    //         "User - " +
    //         reponseJSON.data.first_name +
    //         " " +
    //         reponseJSON.data.last_name +
    //         " added successfully"
    //     });
    //     //console.log(reponseJSON.data);
    //     this.getUsers();
    //   } else {
    //     this.setState({
    //       openSnackbar: true,
    //       messageType: "error",
    //       message:
    //         "User - " +
    //         this.state.formData.first_name +
    //         " " +
    //         this.state.formData.last_name +
    //         " could not be added. Please try again later..."
    //     });
    //   }
    // });
  }

  generatePasswordChange(e) {
    // let isGenerated = false;
    // const passwordGenerated = {};
    // const { formData } = this.state;
    // passwordGenerated.passwordGen = generatePassword(8);
    // if (passwordGenerated.passwordGen !== "") {
    //   isGenerated = true;
    // }
    // if (isGenerated) {
    //   formData["password"] = passwordGenerated.passwordGen;
    //   this.setState({ formData, isGenerated });
    // }
    //return isGenerated;
  }

  //close function for snackbar
  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackbar: false });
  };

  confirmAlert(userDetails) {
    this.setState({
      deleted: true,
      alertTitle: "Confirm Delete",
      alertMessage:
        "Are you sure you want to delete " +
        userDetails.first_name +
        " " +
        userDetails.last_name +
        "?",
      toDelete: userDetails
    });
  }

  //delete user(s)
  deleteUser() {
    if (this.state.deleted) {
      // DeleteData(
      //   "delete-user/" + this.state.toDelete.id,
      //   this.state.userData.token
      // ).then(result => {
      //   if (this._isMounted) {
      //     let reponseJSON = result;
      //     if (reponseJSON.data) {
      //       this.setState(prevState => ({
      //         data: prevState.data.filter(n => n.id !== this.state.toDelete.id),
      //         openSnackbar: true,
      //         messageType: "success",
      //         message:
      //           "User - " +
      //           reponseJSON.data.first_name +
      //           " " +
      //           reponseJSON.data.last_name +
      //           " deleted successfully",
      //         deleted: false
      //       }));
      //     } else {
      //       this.setState({ loading: false });
      //       this.setState({
      //         openSnackbar: true,
      //         messageType: "error",
      //         message:
      //           "User - " +
      //           this.state.toDelete.first_name +
      //           " " +
      //           this.state.toDelete.last_name +
      //           " could not be deleted. Please try again later...",
      //         deleted: false
      //       });
      //     }
      //   }
      // });
    }
  }

  render() {
    const { classes, users, loading } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      formData
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    console.log("customT: " + users);

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <MySnackbarContentWrapper
            variant={this.state.messageType}
            className={classes.margin}
            message={this.state.message}
          />
        </Snackbar>
        {loading ? (
          <Loader />
        ) : (
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
                      label="User Accounts"
                      className={classes.chip}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.textRight}>
                    <Tooltip title={"Add User "}>
                      <Button
                        variant="fab"
                        color="primary"
                        aria-label="Add"
                        className={classes.button}
                        onClick={this.handleDialogClickOpen}
                      >
                        <AddIcon />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.root}>
                    {selected !== null ? (
                      <EnhancedTableToolbar
                        selectId={selected}
                        numSelected={selected.length}
                      />
                    ) : (
                      <EnhancedTableToolbar numSelected={0} />
                    )}

                    <div className={classes.tableWrapper}>
                      <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={this.handleSelectAllClick}
                          onRequestSort={this.handleRequestSort}
                          rowCount={data.length}
                        />
                        <TableBody>
                          {stableSort(data, getSorting(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map(userdata => {
                              const isSelected = this.isSelected(userdata.id);
                              return (
                                <TableRow hover key={userdata.id}>
                                  <TableCell
                                    onClick={event =>
                                      this.handleClick(event, userdata.id)
                                    }
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={userdata.id}
                                    selected={isSelected}
                                    padding="checkbox"
                                  >
                                    <Checkbox checked={isSelected} />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <Link
                                      to={
                                        "/admin/users/UserAccount/" +
                                        userdata.id
                                      }
                                    >
                                      {userdata.first_name +
                                        " " +
                                        userdata.last_name}
                                    </Link>
                                  </TableCell>
                                  <TableCell>{userdata.email}</TableCell>
                                  <TableCell>
                                    {userdata.roles.map((role, key) => (
                                      <Chip
                                        avatar={
                                          <Avatar>
                                            <PermIdentity />
                                          </Avatar>
                                        }
                                        key={key}
                                        label={role.name}
                                        color="primary"
                                        className={classes.chip}
                                        variant="outlined"
                                      />
                                    ))}
                                  </TableCell>
                                  <TableCell>{userdata.status}</TableCell>
                                  <TableCell>
                                    <Tooltip
                                      title={
                                        "UserAccount " +
                                        userdata.first_name +
                                        " " +
                                        userdata.last_name
                                      }
                                    >
                                      <IconButton
                                        color="primary"
                                        variant="flat"
                                        size="small"
                                        className={classes.button}
                                        href={
                                          "/admin/users/UserAccount/" +
                                          userdata.id
                                        }
                                      >
                                        <Pageview
                                          className={classNames(
                                            classes.leftIcon,
                                            classes.iconSmall
                                          )}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        "Edit " +
                                        userdata.first_name +
                                        " " +
                                        userdata.last_name
                                      }
                                    >
                                      <IconButton
                                        color="primary"
                                        variant="flat"
                                        size="small"
                                        className={classes.button}
                                        href={
                                          "/admin/users/edit/" + userdata.id
                                        }
                                      >
                                        <Edit
                                          className={classNames(
                                            classes.leftIcon,
                                            classes.iconSmall
                                          )}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        "Delete " +
                                        userdata.first_name +
                                        " " +
                                        userdata.last_name
                                      }
                                    >
                                      <IconButton
                                        color="secondary"
                                        variant="flat"
                                        size="small"
                                        className={classes.button}
                                        onClick={event =>
                                          this.confirmAlert(userdata)
                                        }
                                        //href={"/admin/user/" + n.id}
                                      >
                                        <Delete
                                          className={classNames(
                                            classes.leftIcon,
                                            classes.iconSmall
                                          )}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <TablePagination
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{
                        "aria-label": "Previous Page"
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page"
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Paper>
                </Grid>
              </Grid>
              {/* <Grid
              className={classes.update}
              item
              sm={12}
              md={3}
              lg={3}
              xs={12}
              xl={3}
            >
              <Typography variant="h6" component="h5">
                Updates
              </Typography>
            </Grid> */}
            </Grid>
            {/*Form dialog*/}
            <Dialog
              open={this.state.open}
              onClose={this.handleDialogClose}
              aria-labelledby="form-dialog-title"
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
            >
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                <DialogTitle id="form-dialog-title">+ Add User</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click "Add User" to add user account or cancel to close
                  </DialogContentText>
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
                        onChange={this.handleFormChange}
                        value={formData.first_name}
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
                        onChange={this.handleFormChange}
                        value={formData.last_name}
                        validators={["required"]}
                        errorMessages={["Last Name is required"]}
                        variant="filled"
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <TextValidator
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        onChange={this.handleFormChange}
                        value={formData.email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "Email is required",
                          "Email is not valid"
                        ]}
                        variant="filled"
                        fullWidth
                      />
                      <TextValidator
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        onChange={this.handleFormChange}
                        value={formData.username}
                        validators={["required"]}
                        errorMessages={["Username is required"]}
                        variant="filled"
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={12} md={6} lg={6} xs={6} xl={6}>
                      <TextValidator
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type={this.state.isGenerated ? "text" : "password"}
                        onChange={this.handleFormChange}
                        value={formData.password}
                        validators={["required"]}
                        errorMessages={["Password is required"]}
                        variant="filled"
                        fullWidth
                      />
                    </Grid>
                    <Grid
                      className={classes.buttonMargin}
                      item
                      sm={12}
                      md={6}
                      lg={6}
                      xs={6}
                      xl={6}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={this.generatePasswordChange}
                      >
                        <AutoRenewIcon />
                        Generate
                      </Button>
                    </Grid>
                    <Grid item sm={12} md={9} lg={9} xs={9} xl={9}>
                      <SelectValidator
                        margin="dense"
                        name="role_id"
                        id="role_id"
                        label="User Role"
                        className={classes.selectWidth}
                        onChange={this.handleFormChange}
                        value={formData.role_id}
                        validators={["required"]}
                        errorMessages={["Role is required"]}
                        variant="filled"
                        SelectProps={{
                          displayEmpty: true
                        }}
                        fullWidth
                      >
                        {this.state.roles ? (
                          this.state.roles.map((role, key) => (
                            <MenuItem key={key} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={""}>
                            {"Roles not available"}
                          </MenuItem>
                        )}
                      </SelectValidator>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={this.handleDialogClose}
                  >
                    <CancelIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                  >
                    <SaveIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    Add User
                  </Button>
                </DialogActions>
              </ValidatorForm>
            </Dialog>

            {/**Alert dialog*/}
            <Dialog
              open={this.state.deleted}
              onClose={this.handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {this.state.alertTitle}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.alertMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
                  No
                </Button>
                <Button onClick={this.deleteUser} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </main>
        )}
      </div>
    );
  }
}

UserAccounts.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { loading } = state.users;
  return {
    user,
    users,
    loading
  };
}

const connectedUsers = withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(UserAccounts)
);
export { connectedUsers as UserAccounts };
