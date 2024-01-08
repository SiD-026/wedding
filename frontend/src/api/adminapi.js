import config from "./config";

const changePassword = async (data) => {
  return await config.post("/admin/password/change", data);
};

export default {
  changePassword,
};
