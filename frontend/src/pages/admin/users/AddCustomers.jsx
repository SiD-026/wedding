import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import customerapi from "../../../api/customerapi";
import serviceapi from "../../../api/serviceapi";
import Toast from "../../../common/Toast";
import ValidateCustomers from "../../../validations/admin/ValidateUser";

const AddCustomers = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState([]);
  const [errorsMsg, setErrorsMsg] = useState([]);

  const [location, setLocation] = useState([]);
  const [cities, setCities] = useState("");

  const navigate = useNavigate();

  const getAllAddress = async () => {
    try {
      const res = await serviceapi.getAllAddress();
      return setLocation(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    const newErrors = ValidateCustomers(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      const { password, confirm_password } = data;
      if (password !== confirm_password) {
        setErrorsMsg("password didn't match");
      } else {
        try {
          await customerapi.addCustomer(data);
          navigate("/admin/dashboard/users");
          Toast.success();
        } catch (error) {
          Toast.error(error);
        }
      }
    }
  };
  return (
    <>
      <div className="mt-10 sm:mt-0 mb-10">
        <div className="md:col-span-1 px-10 py-7">
          <h2 className="text-3xl font-medium leading-6 text-white">
            ADD Customer
          </h2>
        </div>
        <div className=" md:col-span-2 md:mt-0 mx-10 w-full">
          <div className="overflow-hidden shadow sm:rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-lg font-medium text-gray-700 "
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      id="name"
                      autoComplete="given-name"
                      placeholder="Enter Name"
                      className="input mt-1 w-full font-medium border-gray-300 block"
                    />
                    <span style={{ color: "red" }}>{errors.name}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      id="email"
                      autoComplete="given-email"
                      placeholder="Enter Email"
                      className="input mt-1 w-full font-medium border-gray-300 block"
                    />
                    <span style={{ color: "red" }}>{errors.email}</span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      id="password"
                      autoComplete="given-password"
                      placeholder="Enter Password"
                      className="input mt-1 w-full font-medium border-gray-300 block"
                    />
                    <span style={{ color: "red" }}>{errors.password}</span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={data.confirm_password}
                      onChange={handleChange}
                      id="confirm_password"
                      autoComplete="given-confirm_password"
                      placeholder="Enter Confirm Password"
                      className="input mt-1 w-full font-medium border-gray-300 block"
                    />
                    <span style={{ color: "red" }}>
                      {errors.confirm_password}
                    </span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      id="phone"
                      autoComplete="given-phone"
                      placeholder="Enter Phone"
                      className="input mt-1 w-full font-medium border-gray-300 block"
                    />
                    <span style={{ color: "red" }}>{errors.phone}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="state"
                      className="block text-lg font-medium text-gray-700"
                    >
                      State
                    </label>
                    <select
                      className="input mt-1 w-full font-medium border-gray-300 block"
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

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-lg font-medium text-gray-700"
                    >
                      City
                    </label>
                    <select
                      className="input mt-1 w-full font-medium border-gray-300 block"
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

                  {/* <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex sm:px-6">
                <div className="mt-2">
                  {errorsMsg.length > 0 ? (
                    <span style={{ color: "red" }}>{errorsMsg}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default AddCustomers;
