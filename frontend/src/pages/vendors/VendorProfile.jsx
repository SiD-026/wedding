import React, { useEffect, useState } from "react";
import vendorapi from "../../api/vendorapi";
import { CustDashboard } from "../../components/customer/CustDashboard";
import Footer from "../../components/customer/Footer";
import ValidateCustomerProfile from "../../validations/customers/validateCustomerProfile";
import Toast from "../../common/Toast";

const _user = localStorage.getItem("token");
const user = JSON.parse(_user);
const VendorProfile = () => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profile, setProfile] = useState("");
  const [errors, setErrors] = useState([]);

  const getProfile = async () => {
    try {
      const profile = await vendorapi.getVendorById(user.vendorId);
      setProfile(profile.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

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
          await vendorapi.changePassword(data);
          localStorage.removeItem("token");
          window.location.reload();
          Toast.changePassword()
        } catch (error) {
          setErrors(error.response.data.msg);
          Toast.error(error);
        }
      }
    }
  };

  return (
    <>
      <CustDashboard name={profile.name} />

      <section className="text-gray-400 bg-gray-100  body-font">
        <div className="container px-5 py-14 mx-auto flex flex-wrap items-center w-2/3">
          <div className="flex flex-col text-left w-full pb-14">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              WELCOME{" "}
              <span className="text-rose-500">
                {profile ? profile.name.toUpperCase() : ""}
              </span>
            </h1>
            <h2 className="text-xm text-indigo-500 tracking-widest font-medium title-font mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h2>
          </div>
          <div className="flex flex-col text-center w-full pb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              UPDATE <span className="text-rose-500">PROFILE</span>
            </h1>
          </div>

          <div className="lg:w-1/2 md:w-1/2 sm:py-10 bg-white border rounded-lg px-6 py-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-lg mx-10">
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2 ">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={(data.name = profile.name)}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-gray-500 font-bold text-lg text-black input input-sm card py-2 px-2 border"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={(data.email = profile.email)}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-gray-500 font-bold text-lg text-black input input-sm card py-2 px-2 border"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="oldPassword"
                    className="block text-lg font-medium text-gray-900"
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
                    className="block text-lg font-medium text-gray-900"
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
                    className="block text-lg font-medium text-gray-900"
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
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Button
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 border shadow-lg p-4 bg-white bg-opacity-50 rounded-lg ">
            <p className="leading-relaxed mt-4 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              repudiandae suscipit amet error dolor perferendis esse, asperiores
              reprehenderit natus perspiciatis, tempore deleniti, ea quisquam
              laboriosam?
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default VendorProfile;
