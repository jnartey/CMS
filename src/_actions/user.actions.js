import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  user_update,
  getUserById,
  change_password,
  getRole,
  getAll,
  delete: _delete
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      user => {
        dispatch(success(user));
        history.push("/admin/dashboard");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push("/admin/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function user_update(user) {
  return dispatch => {
    dispatch(request(user));

    userService.user_update(user).then(
      user => {
        dispatch(success());
        //history.push("/admin/login");
        dispatch(
          alertActions.success(
            "User account of " +
              user.first_name +
              " " +
              user.last_name +
              " updated successfully"
          )
        );
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}

function change_password(user) {
  return dispatch => {
    dispatch(request(user));

    userService.change_password(user).then(
      user => {
        dispatch(success());
        //history.push("/admin/login");
        dispatch(
          alertActions.success(
            "User password of " +
              user.data.first_name +
              " " +
              user.data.last_name +
              " updated successfully"
          )
        );
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_PASSWORD_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_PASSWORD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_PASSWORD_FAILURE, error };
  }
}

function getUserById(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .getById(id)
      .then(
        user_account => dispatch(success(user_account)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request(id) {
    return { type: userConstants.GETBYID_REQUEST };
  }
  function success(user_account) {
    return { type: userConstants.GETBYID_SUCCESS, user_account };
  }
  function failure(id, error) {
    return { type: userConstants.GETBYID_FAILURE, id, error };
  }
}

function getRole(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .getRole(id)
      .then(
        role => dispatch(success(role)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request(id) {
    return { type: userConstants.GETROLE_REQUEST };
  }
  function success(role) {
    return { type: userConstants.GETROLE_SUCCESS, role };
  }
  function failure(id, error) {
    return { type: userConstants.GETROLE_FAILURE, id, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
