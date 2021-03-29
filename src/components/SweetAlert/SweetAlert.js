import swal from "sweetalert2";
import { LOGIN, ERROR_AUTH } from "../../actions/application";

const SweetAlert = (props) => {
  switch (props.type) {
    case LOGIN:
      swal
        .fire({
          icon: props.icon,
          title: props.title,
        })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(props.data));
          props.history.push("/");
          // window.location.reload();
        });
      break;
    case ERROR_AUTH:
      swal.fire({
        icon: props.icon,
        title: props.title,
      });
      break;
    default:
      break;
  }
};

export default SweetAlert;
