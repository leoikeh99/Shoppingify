import {
  GET_ITEMS,
  ADD_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  CLEAR_STATUS,
  SET_LOADER,
} from "../actions/types";

const initialState = {
  items: [],
  filtered: null,
  status: null,
  loader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload.categories.map((category) => {
          const obj = {
            name: category.category,
            items: action.payload.items.filter(
              (item) => category.lowercase === item.category.toLowerCase()
            ),
          };
          return obj;
        }),
        loader: false,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: state.items.find(
          (item) =>
            item.name.toLowerCase() === action.payload.category.toLowerCase()
        )
          ? state.items.map((item) =>
              item.name.toLowerCase() === action.payload.category.toLowerCase()
                ? { name: item.name, items: [...item.items, action.payload] }
                : item
            )
          : [
              ...state.items,
              { name: action.payload.category, items: [action.payload] },
            ],
        status: { color: "#00bfa5", msg: "Item has been added" },
      };

    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items
          .map((item) => {
            const obj = {
              name: item.name,
              items: item.items.filter((item) =>
                item.name.toLowerCase().includes(action.payload.toLowerCase())
              ),
            };
            return obj;
          })
          .filter((item) => item.items.length !== 0),
      };

    case SET_LOADER:
      return {
        ...state,
        loader: true,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case CLEAR_STATUS:
      return {
        ...state,
        status: null,
      };

    default:
      return state;
  }
};