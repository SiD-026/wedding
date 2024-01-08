import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../api/config";
import Toast from "../../common/Toast";
import ValidateCustomersLogin from "../../validations/customers/ValidateLogin";

const AdminLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [errorsMsg, setErrorsMsg] = useState([]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = ValidateCustomersLogin(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        let res = await config.post("/admin/login", data);
        localStorage.setItem("admin", JSON.stringify(res.data));
        navigate("/admin/dashboard/orders");
        window.location.assign("/admin/dashboard/orders");
        Toast.login();
      } catch (error) {
        Toast.error(error);
      }
    }
  };
  return (
    <>
      <section className="text-gray-400 bg-gray-800 body-font py-5">
        <div className="container px-5 py-32 w-50 flex flex-wrap items-center mx-auto">
          <form
            onSubmit={handleSubmit}
            className="lg:w-96 md:w-1/2 bg-white rounded-lg p-8 flex flex-col shadow-md mx-auto "
          >
            <h2 className="text-black text-xl font-medium title-font mb-5 w-full">
              Login
            </h2>
            {errorsMsg && <span style={{ color: "red" }}>{errorsMsg}</span>}
            {errors.email
              ? errors && <span style={{ color: "red" }}>{errors.email}</span>
              : errors && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )}
            <div className="relative mb-4 w-full">
              <label for="email" className="leading-7 text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full bg-black bg-opacity-5 focus:bg-transparent rounded border border-gray-600 focus:border-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4  w-full ">
              <label for="password" className="leading-7 text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full bg-black bg-opacity-5 focus:bg-transparent rounded border border-gray-600 focus:border-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="text-white w-full bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
