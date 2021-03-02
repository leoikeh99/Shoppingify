import axios from "axios";
import setAuthToken from "../functions/setAuthToken";
import {
  ADD_ITEM,
  CLEAR_FILTER,
  CLEAR_STATUS,
  FILTER_ITEMS,
  GET_ITEMS,
  SET_LOADER,
} from "./types";

export const addItem = (item) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const res = await axios.post("/api/items", item, config);
    console.log(res.data);
    dispatch({ type: ADD_ITEM, payload: res.data });
  } catch (err) {
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

export const filterItems = (text) => {
  return { type: FILTER_ITEMS, payload: text };
};

export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

export const clearStatus = () => {
  return { type: CLEAR_STATUS };
};
