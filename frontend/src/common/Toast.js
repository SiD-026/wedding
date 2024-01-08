import { toast } from "react-toastify";

const success = () => {
  return toast.success("Added Successfully", {
    autoClose: 3000,
  });
};

const error = async (error) => {
  return toast.error(error.response.data.msg, {
    autoClose: 3000,
  });
};

const deleted = () => {
  return toast.success("Deleted Successfully", {
    autoClose: 3000,
  });
};

const update = () => {
  return toast.success("Updated Successfully", {
    autoClose: 3000,
  });
};

const isFeatured = () => {
  return toast.success("Review Has Been Published", {
    autoClose: 3000,
  });
};

const isNotFeatured = () => {
  return toast.error("Review Has Been Removed", {
    autoClose: 3000,
  });
};

const orderCancelled = () => {
  return toast.error("Order Cancelled", {
    autoClose: 3000,
  });
};

const login = () => {
  return toast.success("LoggedIn Successfully", {
    autoClose: 3000,
  });
};

const Logout = () => {
  return toast.success("Logout Successfully", {
    autoClose: 3000,
  });
};

const changePassword = () =>{
  return toast.success("Password Changed Successfully", {
    autoClose: 3000,
  });
}

const matchPassword = () =>{
  return toast.error("Password Didn't Match", {
    autoClose: 3000,
  });
}

export default {
  success,
  error,
  deleted,
  update,
  isFeatured,
  isNotFeatured,
  orderCancelled,
  login,
  Logout,
  changePassword,
  matchPassword,
};
