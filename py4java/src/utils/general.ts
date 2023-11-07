
import { toast } from "react-toastify";

export const classnames = (...args: string[]) => {
    return args.join(" ");
  };

export const titleToFileName = (title: string) => {
   return title.split(" ").map(word => word.toLowerCase()).join("-");
};

export const wrappedText = (text: string) => {
  return text.replace(/`(.*?)`/g, "<code>$&</code>").replace(/`/g, "");
};

export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const showSuccessToast = (msg: string) => {
  toast.success(msg || `Compiled Successfully!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const showErrorToast = (msg?: string, timer?: number) => {
  toast.error(msg || `Something went wrong! Please try again.`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
