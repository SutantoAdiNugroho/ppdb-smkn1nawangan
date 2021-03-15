import {
  SET_DASH,
  LOGIN,
  ERROR_AUTH,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../actions/application";

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOADER:
      return { ...state, loading: true };

    case HIDE_LOADER:
      return { ...state, loading: false };

    case SET_DASH:
      return payload;

    case "GET_USER":
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case "ERROR_USER":
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case LOGIN:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case ERROR_AUTH:
      return {
        ...state,
        user: payload,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
