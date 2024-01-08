import axios from "axios";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user) || {};

const _admin = localStorage.getItem("admin");
const admin = JSON.parse(_admin) || {};

const config = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api/v1`,
  headers: {
    Authorization: `Bearer ${user.token || admin.token || ""}`,
  },
});

export default config;
