import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../api/config";
import Toast from "../../common/Toast";
import Navbar from "../../components/customer/Navbar";
import Validate from "../../validations/customers/ValidateLogin";
import { BsFillBellFill } from "react-icons/bs";

const CustomersLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        if (toggle === true) {
          let res = await config.post("/vendors/login", data);
          localStorage.setItem("token", JSON.stringify(res.data));
          navigate("/vendors");
          window.location.assign("/vendors");
        } else {
          let res = await config.post("/customers/login", data);
          localStorage.setItem("token", JSON.stringify(res.data));
          navigate("/customerDashboard");
          window.location.assign("/customerDashboard");
        }

        Toast.login();
      } catch (error) {
        Toast.error(error);
      }
    }
  };

  const handleSwitch = (e) => {
    setToggle(!toggle);
  };

  return (
    <>
      <Navbar />

      <section className="text-gray-400 bg-background_register ">
        <div className="container px-5 mx-auto flex flex-wrap items-center h-screen w-2/3">
          <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-black">
              Slow-carb next level shoindxgoitch ethical authentic, poko
              scenester
            </h1>
            <p className="leading-relaxed mt-4 text-gray-800 font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              repudiandae suscipit amet error dolor perferendis esse, asperiores
              reprehenderit natus perspiciatis, tempore deleniti, ea quisquam
              laboriosam?
            </p>
          </div>
          <div className="lg:w-3/6 md:w-1/2 bg-white bg-opacity-60 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
            <div className="mb-5 flex">
              {toggle === true ? (
                <h2 className="text-black text-xl font-medium title-font mb-5 w-full">
                  Vendor Login
                </h2>
              ) : (
                <h2 className="text-black text-xl font-medium title-font mb-5 w-full">
                  Customer Login
                </h2>
              )}

              {/* <div className="w-1/2 mt-2"> */}
              <div className=" mt-2">
                <label className="inline-flex relative items-center cursor-pointer">
                  <label className="inline-flex relative items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer switch switch-bordered-primary"
                      onChange={handleSwitch}
                    />
                    {/* <input type="checkbox" className="switch switch-bordered-primary" /> */}
                    <div className="w-11 h-6 bg-slate-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"> 
                     Toggle me
                   </span> */}
                  </label>
                </label>
              </div>
            </div>
            {errors.email
              ? (errors && errors.email)&& (
                  <div className="text-white px-6 py-1 border-0 rounded relative mb-2 bg-rose-500">
                    <span className="text-xl inline-block mr-5 align-middle">
                      <BsFillBellFill className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                      <b className="capitalize">{errors.email} </b>
                    </span>
                    {/* <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-1 mr-6 outline-none focus:outline-none">
                      <span>×</span>
                    </button> */}
                  </div>
                )
              : errors &&
                errors.password && (
                  <div className="text-white px-6 py-1 border-0 rounded relative mb-2 bg-rose-500">
                    <span className="text-xl inline-block mr-5 align-middle">
                      <BsFillBellFill className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                      <b className="capitalize">{errors.password} </b>
                    </span>
                    {/* <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-1 mr-6 outline-none focus:outline-none">
                      <span>×</span>
                    </button> */}
                  </div>
                )}

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4  w-full">
                <label
                  htmlFor="email"
                  className="leading-7 text-gray-800 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-20 focus:bg-transparent rounded border border-gray-600 focus:border-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {/* {errors.email && <span style={{ color: "red" }}>{errors.email}</span>} */}
              </div>
              <div className="relative mb-4  w-full">
                <label
                  htmlFor="password"
                  className="leading-7 text-gray-800 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-20 focus:bg-transparent rounded border border-gray-600 focus:border-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {/* {errors.password && <span style={{ color: "red" }}>{errors.password}</span>} */}
              </div>
              <button
                type="submit"
                className="btn btn-success px-8 hover:bg-success-700 text-lg"
              >
                Login
              </button>
            </form>
            <p className="mt-3 grid">
              <span className="text-gray-800 ">Don't have an account?</span>{" "}
              <button
                className="btn btn-error px-8 hover:bg-error-800 text-lg col-end-7"
                onClick={handleClick}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomersLogin;
