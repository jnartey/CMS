import { authHeader } from "../_helpers";
import { Settings } from "../config/settings";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  getRole,
  user_update,
  change_password,
  delete: _delete
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${Settings.API_URL}/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.data));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${Settings.API_URL}/users`, requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${Settings.API_URL}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function getRole(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${Settings.API_URL}/users/role/${id}`, requestOptions).then(
    handleResponse
  );
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${Settings.API_URL}/register`, requestOptions).then(
    handleResponse
  );
}

function user_update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(
    `${Settings.API_URL}/users/update/${user.id}`,
    requestOptions
  ).then(handleResponse);
}

function change_password(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${Settings.API_URL}/users/changepwd`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${Settings.API_URL}/users/delete/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
