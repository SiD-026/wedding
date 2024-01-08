import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ValidateOrders from "../../../validations/admin/ValidateOrders";

const AddOrders = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    price: "",
    event_date: "",
    created_at: "",
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = ValidateOrders(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        axios.post("http://localhost:5000/orders", data);
        navigate("/admin/dashboard/orders");
      } catch (error) {
        console.log(error);
      }
    }
  };

 

  return (
    <>
      <div className="mt-10 sm:mt-0 mb-10">
        {/* <div className="md:grid md:grid-cols-3 md:gap-6"> */}
        <div className="md:col-span-1 px-10 py-7">
          <h2 className="text-3xl font-medium leading-6 text-white">
            Add Orders
          </h2>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 mx-10 w-full">
          <div className="overflow-hidden shadow sm:rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.name}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.email}</span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      id="title"
                      autoComplete="given-title"
                      placeholder="Enter title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.title}</span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={data.price}
                      onChange={handleChange}
                      id="price"
                      autoComplete="given-price"
                      placeholder="Enter Confirm Password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>
                      {errors.price}
                    </span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.phone}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="event_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="event_date"
                      value={data.event_date}
                      onChange={handleChange}
                      id="event_date"
                      autoComplete="given-event_date"
                      placeholder="Enter Service Type"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.event_date}</span>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      type="textarea"
                      name="address"
                      value={data.address}
                      onChange={handleChange}
                      id="address"
                      placeholder="Enter Address"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.address}</span>
                  </div>

                  {/* <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
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
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default AddOrders;
