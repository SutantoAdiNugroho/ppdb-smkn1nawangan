import { SET_DASH } from "../actions/application";

const initialState = {
  loading: false,
  users: [],
};

export default (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case "SHOW_LOADER":
      return { ...state, loading: true };

    case "HIDE_LOADER":
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

    default:
      return state;
  }
};
