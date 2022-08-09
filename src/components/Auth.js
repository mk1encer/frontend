import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "@redux-saga/core/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "./createRequestSaga";
import * as authAPI from "../axios";

const CHANGE_FIELD = "Auth/CHANGE_FIELD";
const INITIALIZE_FORM = "Auth/INITIALIZE_FORM";

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes("auth/SIGNIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("auth/SIGNUP");
const [INFO, INFO_SUCCESS, INFO_FAILURE] =
  createRequestActionTypes("auth/INFO");
export const [CHECK_NICKNAME, CHECK_NICKNAME_SUCCESS, CHECK_NICKNAME_FAILURE] =
  createRequestActionTypes("auth/CHECK_NICKNAME");
export const [CHECK_EMAIL, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE] =
  createRequestActionTypes("auth/CHECK_EMAIL");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const info = createAction(INFO, (userId) => userId);

export const signup = createAction(
  SIGNUP,
  ({ email, name, nickname, password }) => ({
    email,
    name,
    nickname,
    password,
  })
);

export const signin = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));

export const checkEmail = createAction(CHECK_EMAIL, (email) => email);
export const checkNickname = createAction(
  CHECK_NICKNAME,
  (nickname) => nickname
);

const SignInSaga = createRequestSaga(SIGNIN, authAPI.SignIn);
const SignUPSaga = createRequestSaga(SIGNUP, authAPI.SignUp);
const infoSaga = createRequestSaga(INFO, authAPI.getUser);
const checkEmailSaga = createRequestSaga(CHECK_EMAIL, authAPI.checkEmail);
const checkNicknameSaga = createRequestSaga(
  CHECK_NICKNAME,
  authAPI.checkNickname
);

export function* authSaga() {
  yield takeLatest(SIGNIN, SignInSaga);
  yield takeLatest(SIGNUP, SignUPSaga);
  yield takeLatest(INFO, infoSaga);
  yield takeLatest(CHECK_EMAIL, checkEmailSaga);
  yield takeLatest(CHECK_NICKNAME, checkNicknameSaga);
}

const initialState = {
  SignUp: {
    email: "",
    name: "",
    nickname: "",
    password: "",
  },
  SignIn: {
    email: "",
    password: "",
  },
  headers: null,
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
    [SIGNIN_SUCCESS]: (state, { payload: auth, headers: headers }) => ({
      ...state,
      AuthError: null,
      Auth,
      headers,
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
    [INFO_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default Auth;
