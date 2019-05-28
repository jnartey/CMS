import { combineReducers } from "redux";

//import { layout } from "../components/admin/Layout/LayoutState";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { user_account } from "./user_account.reducer";
import { user_update } from "./user_update.reducer";
import { change_password } from "./change_password.reducer";
import { role } from "./role.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  //layout,
  authentication,
  registration,
  users,
  user_account,
  user_update,
  change_password,
  role,
  alert
});

export default rootReducer;
