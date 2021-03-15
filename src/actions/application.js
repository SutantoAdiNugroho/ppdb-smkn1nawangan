import { axiosReportsUsers } from "../modules/helpers";
import Alert from "../components/SweetAlert/SweetAlert";

export const SET_DASH = "SET_DASH";
export const LOGIN = "LOGIN";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const ERROR_AUTH = "ERROR_AUTH";

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
    type: SHOW_LOADER,
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADER,
  });
};

export const adminLogin = (params, history) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  return axiosReportsUsers()
    .post("admin/login", params)
    .then((res) => {
      console.log("response", res);
      dispatch({ type: HIDE_LOADER });

      const isSuccess = res.data.message;

      switch (isSuccess) {
        case "Login successfull":
          Alert({
            type: LOGIN,
            icon: "success",
            title: "Login Berhasil",
            history: history,
            data: res.data.data.token,
          });
          dispatch({ type: LOGIN, payload: res.data });
          break;

        default:
          Alert({ type: ERROR_AUTH, icon: "error", title: isSuccess });
          dispatch({ type: ERROR_AUTH, payload: res.data });
          break;
      }
    })
    .catch((error) => {
      var errorData = { data: {}, message: error };
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
    });
};
