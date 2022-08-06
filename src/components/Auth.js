import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import client from "../client";
import { takeLatest } from "@redux-saga/core/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "./createRequestSaga";
import * as authAPI from "./Auth";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes("auth/SIGNIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("auth/SIGNUP");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const SignUp = createAction(
  SIGNUP,
  ({ email, fullname, username, password }) => ({
    email,
    fullname,
    username,
    password,
  })
);

export const SignIn = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));

const SignInSaga = createRequestSaga(SIGNIN, authAPI.SignIn);
const SignUPSaga = createRequestSaga(SIGNUP, authAPI.SignUp);

export function* authSaga() {
  yield takeLatest(SIGNIN, SignInSaga);
  yield takeLatest(SIGNUP, SignUPSaga);
}

const initialState = {
  SignUp: {
    email: "",
    fullname: "",
    username: "",
    password: "",
  },
  SignIn: {
    email: "",
    password: "",
  },
  Auth: null,
  AuthError: null,
};

const Auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      AuthError: null,
      Auth,
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      AuthError: error,
    }),
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      AuthError: null,
      Auth,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      AuthError: error,
    }),
  },
  initialState
);

export default Auth;
