import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./Loading";
import auth, { authSaga } from "./Auth";

const rootReducer = combineReducers({
  loading,
  auth,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
