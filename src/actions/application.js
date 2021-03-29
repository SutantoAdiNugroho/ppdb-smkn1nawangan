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
    .post("auth/admin/login", params)
    .then((res) => {
      console.log("response", res);
      dispatch({ type: HIDE_LOADER });

      const isSuccess = res.data.status;

      switch (isSuccess) {
        case 200:
          Alert({
            type: LOGIN,
            icon: "success",
            title: res.data.message.id,
            history: history,
            data: res.data.data.token,
          });
          dispatch({ type: LOGIN, payload: res.data });
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.log("error msg", error);
      var errorData = { data: {}, message: error };

      try {
        var errorMsg = error.response.data;

        switch (errorMsg.status) {
          case 401:
            Alert({
              type: ERROR_AUTH,
              icon: "error",
              title: errorMsg.message.id,
            });
            break;
          case 404:
            Alert({
              type: ERROR_AUTH,
              icon: "error",
              title: errorMsg.message.id,
            });
            break;

          default:
            break;
        }
      } catch (err) {
        if (error === "Error: Network Error") {
          Alert({
            type: ERROR_AUTH,
            icon: "error",
            title: "Gagal mengambil data, silahkan cek koneksi anda",
          });
        } else {
          Alert({
            type: ERROR_AUTH,
            icon: "error",
            title: "Gagal mengambil data, silahkan coba kembali",
          });
        }
      }

      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ERROR_AUTH, payload: errorData });
    });
};
