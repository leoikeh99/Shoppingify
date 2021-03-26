import {
  ADD_TO_CART,
  CLEAR_STATUS,
  DELETE_FROM_CART,
  DELETE_HISTORY,
  FINISH_CART,
  GET_CART,
  GET_HISTORY,
  REMOVE_FROM_CART,
  SAVE_CART,
  SET_CLEARED,
  SET_LOADER,
  SET_LOADER3,
  SET_TOGGLE,
} from "../actions/types";

const initialState = {
  loader: false,
  loader3: false,
  savedCart: { name: "Shopping List", items: [] },
  unsavedCart: { name: "Shopping List", items: [] },
  toggle: { mode: "saved", changes: false },
  status2: null,
  history: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        unsavedCart: {
          ...state.unsavedCart,
          items: state.unsavedCart.items.some(
            (item) => item.itemId === action.payload.itemId
          )
            ? state.unsavedCart.items.map((item) =>
                item.itemId === action.payload.itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.unsavedCart.items, action.payload],
        },
        toggle: { mode: "unsaved", changes: true },
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        unsavedCart: {
          ...state.unsavedCart,
          items: state.unsavedCart.items.some(
            (item) => item.itemId === action.payload.itemId
          )
            ? state.unsavedCart.items.map((item) =>
                item.itemId === action.payload.itemId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            : [...state.unsavedCart.items, action.payload],
        },
        toggle: { mode: "unsaved", changes: true },
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        unsavedCart: {
          ...state.unsavedCart,
          items: state.unsavedCart.items.filter(
            (item) => item.itemId !== action.payload
          ),
        },
      };

    case SAVE_CART:
      return {
        ...state,
        unsavedCart: action.payload,
        savedCart: action.payload,
        status2: { color: "#00bfa5", msg: "Saved successfully" },
        toggle: { mode: "saved", changes: false },
        loader3: false,
      };

    case GET_CART:
      return {
        ...state,
        unsavedCart: action.payload.name
          ? action.payload
          : { name: "Shopping List", items: [] },
        savedCart: action.payload.name
          ? action.payload
          : { name: "Shopping List", items: [] },
        loader: false,
      };

    case FINISH_CART: {
      return {
        ...state,
        savedCart: { name: "Shopping List", items: [] },
        unsavedCart: { name: "Shopping List", items: [] },
        status2: {
          color: "#00bfa5",
          msg: action.payload.completed
            ? "Completed successfully"
            : "Shopping list cancelled",
        },
        history: [...state.history, action.payload],
        loader3: false,
      };
    }

    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        loader: false,
      };

    case DELETE_HISTORY:
      return {
        ...state,
        history: state.history.map((val) =>
          val._id === action.payload._id ? action.payload : val
        ),
        status2: { color: "#00bfa5", msg: "Deleted successfully" },
      };

    case SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
        unsavedCart: state.savedCart,
      };
    case SET_CLEARED:
      return {
        ...state,
        unsavedCart: {
          ...state.unsavedCart,
          items: state.unsavedCart.items.map((item) =>
            item.itemId === action.payload
              ? { ...item, cleared: !item.cleared }
              : item
          ),
        },
        toggle: { mode: "unsaved", changes: true },
      };

    case SET_LOADER:
      return {
        ...state,
        loader: true,
      };

    case SET_LOADER3:
      return {
        ...state,
        loader3: true,
      };

    case CLEAR_STATUS:
      return {
        ...state,
        status2: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
