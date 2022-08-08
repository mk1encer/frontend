import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./Loading";
import auth, { authSaga } from "./Auth";
import user, { userSaga } from "./user";

const rootReducer = combineReducers({
  loading,
  auth,
  user,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
