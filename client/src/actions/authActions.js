import axios from "axios";
import setAuthToken from "../functions/setAuthToken";
import {
  AUTH,
  AUTH_FAIL,
  GET_USER,
  GET_USER_FAIL,
  SET_LOADER,
  SET_LOADER2,
  CLEAR_ERROR,
} from "./types";

export const auth = (type, data) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    dispatch({ type: SET_LOADER });
    const res = await axios.post(`/api/auth/${type}`, data, config);
    dispatch({ type: AUTH, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response.data.msg });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    dispatch({ type: SET_LOADER2 });
    const res = await axios.get("/api/user");
    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_USER_FAIL });
  }
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};
