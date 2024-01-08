import React, { useEffect, useState } from "react";
import adminapi from "../../../api/adminapi";
import Toast from "../../../common/Toast";
import ValidateCustomerProfile from "../../../validations/customers/validateCustomerProfile";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const Profile = () => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profile, setProfile] = useState("");
  const [errors, setErrors] = useState([]);

  // const getProfile = async () => {
  //   try {
  //     const profile = await adminapi.getCustomerById(user.customerId);
  //     setProfile(profile.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getProfile();
  // }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = ValidateCustomerProfile(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      const { newPassword, confirmPassword } = data;
      if (newPassword !== confirmPassword) {
        Toast.matchPassword();
      } else {
        try {
          await adminapi.changePassword(data);
          localStorage.removeItem("admin");
          window.location.reload();
          Toast.changePassword();
        } catch (error) {
          Toast.error(error.response.data.msg);
          Toast.error(error);
        }
      }
    }
  };

  return (
    <>
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-10 items-center">
          {/* <div className="w-full pb-10">
            <h1 className="sm:text-3xl text-2xl w-1/4 font-medium title-font text-white bg-indigo-600 px-4 py-1 rounded-lg">
              UPDATE <span className="text-white">PROFILE</span>
            </h1>
          </div> */}

          <div className="flex py-2 pb-10 px-5">
            <div className="bg-indigo-600 px-2 rounded-lg mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-white bg-indigo-600 px-4 py-1 rounded-lg">
                  UPDATE <span className="text-white">PROFILE</span>
                </h1>
              </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 sm:py-10 bg-white border rounded-lg px-6 py-8  w-full mt-10 md:mt-0 shadow-md mx-10">
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2 ">
              {/* <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email = profile.email}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-gray-500 font-bold text-lg text-black input input-sm card py-2 px-2 border"
                  />
                </div>
              </div> */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="oldPassword"
                    className="leading-7 text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={data.oldPassword}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.oldPassword}</span>
                </div>
              </div>
              <div className="p-2 w-1/2"></div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="newPassword"
                    className="leading-7 text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.newPassword}</span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="leading-7 text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.confirmPassword}</span>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="btn btn-success flex mx-auto text-lg"
                >
                  CHANGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
