import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/customer/Navbar";
import customerapi from "../../api/customerapi";
import vendorapi from "../../api/vendorapi";
import ValidateVendors from "../../validations/vendors/ValidateVendors";
import ValidateCustomers from "../../validations/customers/ValidateCustomers";
import Typesapi from "../../api/Typesapi";
import serviceapi from "../../api/serviceapi";
import Toast from "../../common/Toast";

const CustomerRegistration = ({ socket }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    type: "",
    city: "",
    state: "",
  });
  const [location, setLocation] = useState([]);
  const [cities, setCities] = useState("");

  const [errors, setErrors] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();

  const getAllTypes = async () => {
    try {
      const res = await Typesapi.getAllServiceType();
      return setTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAddress = async () => {
    try {
      const res = await serviceapi.getAllAddress();
      return setLocation(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTypes();
    getAllAddress();
  }, []);

  useEffect(() => {
    const res =
      location.length !== 0 ? location.find((i) => i.state === data.state) : "";
    setCities(res?.districts);
  }, [data.state, location]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors =
      toggle === true ? ValidateVendors(data) : ValidateCustomers(data);
    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      const { password, confirm_password } = data;
      if (password !== confirm_password) {
        Toast.matchPassword();
      } else {
        try {
          toggle === true
            ? await vendorapi.addVendor(data)
            : await customerapi.addCustomer(data);
          navigate("/login");

          socket.emit(
            "send_message",
            toggle === true
              ? { message: "Vendor added" }
              : { message: "customer added" }
          );

          Toast.success();
        } catch (error) {
          Toast.error(error);
        }
      }
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  const handleSwitch = (e) => {
    setToggle(!toggle);
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-400 bg-background_register body-font pb-6  ">
        <div className="container px-5 py-5 w-50 flex flex-wrap items-center mx-auto">
          <div className="lg:w-1/2 md:w-1/2 bg-white bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0 shadow-md mx-auto ">
            <div className="mb-5 flex">
              {toggle === true ? (
                <h2 className="text-black text-xl font-medium title-font mb-5 w-full">
                  Vendor Register
                </h2>
              ) : (
                <h2 className="text-black text-xl font-medium title-font mb-5 w-full">
                  Customer Register
                </h2>
              )}

              {/* <div className="w-1/2 mt-2"> */}
              <div className=" mt-2">
                <label className="inline-flex relative items-center cursor-pointer">
                  <label className="inline-flex relative items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={handleSwitch}
                    />
                    <div className="w-11 h-6 bg-slate-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"> 
                     Toggle me
                   </span> */}
                  </label>
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-wrap ">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.name}</span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.email}</span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.password}</span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="confirm-password"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    Confirm-Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm_password"
                    value={data.confirm_password}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>
                    {errors.confirm_password}
                  </span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span style={{ color: "red" }}>{errors.phone}</span>
                </div>
              </div>

              {/* <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-gray-800 font-medium">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none  px-3  transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  ></textarea>
                  <span style={{ color: "red" }}>{errors.address}</span>
                </div>
              </div> */}

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="state"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    State
                  </label>
                  <select
                    className="w-full  bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                    id="grid-state"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                  >
                    <option>Select State</option>
                    {location.length > 0 &&
                        location.map((state) => {
                          return <option key={state._id}>{state.state}</option>;
                        })}
                  </select>
                  <span style={{ color: "red" }}>{errors.state}</span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="city"
                    className="leading-7 text-gray-800 font-medium"
                  >
                    City
                  </label>
                  <select
                    className="w-full  bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                    id="grid-city"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                  >
                    <option>Select City</option>
                    {cities &&
                      cities.length > 0 &&
                      cities.map((city) => {
                        return <option key={city}>{city}</option>;
                      })}
                  </select>
                  <span style={{ color: "red" }}>{errors.city}</span>
                </div>
              </div>
              {toggle === true && (
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="type"
                      className="leading-7 text-gray-800 font-medium"
                    >
                      Service Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={data.type}
                      onChange={handleChange}
                      autoComplete="type"
                      className="w-full  bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                    >
                      <option defaultValue>Service Type</option>
                      {types.length > 0 &&
                        types.map((type) => {
                          return <option key={type._id}>{type.type}</option>;
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.type}</span>
                  </div>
                </div>
              )}
              <div className="p-2 text-center w-full"></div>
              <button
                type="submit"
                className="btn btn-success px-8 flex mx-auto m-2 py-2 text-lg"
              >
                Register
              </button>
            </form>
            <p className="mt-3 grid">
              <span className="text-gray-800 col-end-6 mt-2">
                Already have an Account?
              </span>{" "}
              <button
                className="btn btn-error px-8 hover:bg-error-800 text-lg col-end-7"
                onClick={handleClick}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerRegistration;
