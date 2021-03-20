import axios from "axios";
import setAuthToken from "../functions/setAuthToken";
import {
  ADD_ITEM,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CLEAR_STATUS,
  EDIT_ITEM,
  FILTER_ITEMS,
  GET_ITEMS,
  DELETE_ITEM,
  SET_CURRENT,
  SET_LOADER,
  SET_LOADER2,
} from "./types";

export const addItem = (item) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const config = { headers: { "Content-Type": "application/json" } };
  try {
    dispatch({ type: SET_LOADER2, payload: "add" });
    const res = await axios.post("/api/items", item, config);
    dispatch({ type: ADD_ITEM, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_LOADER2, payload: false });
    console.error(err);
  }
};

export const getItems = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    dispatch({ type: SET_LOADER });
    const res = await axios.get("/api/items");
    dispatch({ type: GET_ITEMS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const editItem = (data, id) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    dispatch({ type: SET_LOADER2, payload: "edit" });
    const res = await axios.put(`/api/items/${id}`, data, config);
    dispatch({ type: EDIT_ITEM, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_LOADER2, payload: false });
    console.error(err);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    dispatch({ type: SET_LOADER2, payload: "delete" });
    const res = await axios.delete(`/api/items/${id}`);
    dispatch({ type: DELETE_ITEM, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_LOADER2, payload: false });
    console.error(err);
  }
};

export const filterItems = (text) => {
  return { type: FILTER_ITEMS, payload: text };
};

export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

export const clearStatus = () => {
  return { type: CLEAR_STATUS };
};

export const setCurrent = (data, type) => {
  return { type: SET_CURRENT, payload: { data, type } };
};

export const clearCurrent = () => {
  return { type: CLEAR_CURRENT };
};
