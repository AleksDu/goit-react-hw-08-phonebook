import axios from "axios";
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getUserRequest,
  getUserSuccess,
  getUserError,
} from "./auth-actions";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = (credentials) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post("/users/signup", credentials);

    token.set(response.data.token);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error));

    if (error.response.status === 400) {
      toast.error("Creation user wrong!");
    } else if (error.response.status === 500) {
      toast.error("Server bugged, check later, please.");
    } else {
      toast.error("Something wrong!");
    }
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post("/users/login", credentials);
    token.set(response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginError(error));
    toast.error("Email or password Invalid! Try harder!");
  }
};

export const logOut = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    await axios.post("/users/logout");
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error));
    if (error.response.status === 500) {
      toast.error("Server bugged, check later, please");
    } else {
      toast.error("Something wrong, reload this page, please.");
    }
  }
};
export const getUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();
  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(getUserRequest());
  try {
    const response = await axios.get("/users/current");
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(getUserError(error));
    token.unset();
    toast.warn("Authorization time out! Please make authorization again!");
  }
};
