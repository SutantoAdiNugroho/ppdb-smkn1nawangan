import { axiosReportsUsers } from "../modules/helpers";
import axios from "axios";

export const SET_DASH = "SET_DASH";

export const fetchDash = (id) => (dispatch) => {
  return axiosReportsUsers()
    .get(`ppdb/id/${id}`)
    .then((result) => {
      dispatch(setDash(result.data.data));
    });
};

export const setDash = (payload) => {
  return {
    type: SET_DASH,
    payload,
  };
};

export const showLoader = () => (dispatch) => {
  dispatch({
    type: "SHOW_LOADER",
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: "HIDE_LOADER",
  });
};
