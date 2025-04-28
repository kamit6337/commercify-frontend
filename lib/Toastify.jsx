import {
  ToastContainer as OriginalToastContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = () => {
  const showErrorMessage = ({
    message,
    time = 5000,
    position = "top-right",
  }) => {
    toast.error(message, {
      autoClose: time,
      position: position,
    });
  };

  const showSuccessMessage = ({
    message,
    time = 2000,
    position = "top-right",
  }) => {
    toast.success(message, {
      position: position,
      autoClose: time,
    });
  };

  const showAlertMessage = ({
    message,
    time = 5000,
    position = "top-right",
  }) => {
    toast.warn(message, {
      position: position,
      autoClose: time,
    });
  };

  return {
    showErrorMessage,
    showSuccessMessage,
    showAlertMessage,
  };
};

export const ToastContainer = OriginalToastContainer;
export default Toastify;
