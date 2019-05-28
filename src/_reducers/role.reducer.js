import { userConstants } from "../_constants";

export function role(state = {}, action) {
  switch (action.type) {
    case userConstants.GETROLE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETROLE_SUCCESS:
      return action.role.data;
    case userConstants.GETROLE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
