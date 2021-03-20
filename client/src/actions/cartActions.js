import axios from "axios";
import setAuthToken from "../functions/setAuthToken";
import {
  ADD_TO_CART,
  CLEAR_STATUS,
  DELETE_FROM_CART,
  FINISH_CART,
  GET_CART,
  GET_HISTORY,
  REMOVE_FROM_CART,
  SAVE_CART,
  SET_CLEARED,
  SET_TOGGLE,
} from "./types";

export const addToCart = (data) => {
  return { type: ADD_TO_CART, payload: data };
};

export const removeFromCart = (data) => {
  return { type: REMOVE_FROM_CART, payload: data };
};

export const deleteFromCart = (id) => {
  return { type: DELETE_FROM_CART, payload: id };
};

export const saveCart = (cart) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.post("/api/cart", cart, config);
    dispatch({ type: SAVE_CART, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getCart = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/cart");
    dispatch({ type: GET_CART, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const finishCart = (cart) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.post("/api/history", cart, config);
    dispatch({ type: FINISH_CART, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getHistory = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/history");
    dispatch({ type: GET_HISTORY, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const setToggle = (toggle) => {
  return { type: SET_TOGGLE, payload: toggle };
};

export const clearStatus2 = () => {
  return { type: CLEAR_STATUS };
};

export const setCleared = (id) => {
  return { type: SET_CLEARED, payload: id };
};
