import { userConstants } from "../_constants";

export function change_password(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATE_PASSWORD_REQUEST:
      return { updatingpwd: true };
    case userConstants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatingpwd: false
      };
    case userConstants.UPDATE_PASSWORD_FAILURE:
      return {};
    default:
      return state;
  }
}
