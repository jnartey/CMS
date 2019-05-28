import { userConstants } from "../_constants";

export function user_update(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return { updating: true };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false
      };
    case userConstants.UPDATE_FAILURE:
      return {};
    default:
      return state;
  }
}
