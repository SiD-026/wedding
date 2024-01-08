import {
  CalculatorIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import contactapi from "../api/contactapi";
import Toast from "../common/Toast";
import { ContactHome } from "../components/customer/CustDashboard";
import Footer from "../components/customer/Footer";
import Navbar from "../components/customer/Navbar";
import ValidateContacts from "../validations/admin/ValidateContacts";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
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
    const newErrors = ValidateContacts(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        contactapi.addContact(data);
        setData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
        navigate("/contact");
        Toast.success();
      } catch (error) {
        Toast.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <ContactHome />
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-14 mx-auto flex flex-wrap items-center w-4/5">
          <div className="flex flex-col text-center w-full pb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              CONTACT <span className="text-rose-500">US</span>
            </h1>
            <h2 className="text-xm text-indigo-500 tracking-widest font-medium title-font mt-2">
              Please contact us for further information.
            </h2>
          </div>

          <div className="lg:w-1/2 md:w-1/2 sm:py-10 bg-white border rounded-lg px-6 py-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md mx-10">
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
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-xl outline-none pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span className="mx-3" style={{ color: "red" }}>
                    {errors.name}
                  </span>
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
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full bg-opacity-20 bg-gray-100 focus:bg-transparent text-xl outline-none pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span className="mx-3" style={{ color: "red" }}>
                    {errors.email}
                  </span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone"
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-xl outline-none pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span className="mx-3" style={{ color: "red" }}>
                    {errors.phone}
                  </span>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={data.subject}
                    onChange={handleChange}
                    placeholder="Enter Subject"
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-xl outline-none pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  />
                  <span className="mx-3" style={{ color: "red" }}>
                    {errors.subject}
                  </span>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    placeholder="Enter Message"
                    className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-xl outline-none pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  ></textarea>
                  <span className="mx-3" style={{ color: "red" }}>
                    {errors.message}
                  </span>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="btn btn-success flex mx-auto px-8 text-lg"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-1/3 md:w-1/3 md:pr-16 lg:pr-0 pr-0 border shadow-lg p-4 bg-white bg-opacity-50 rounded-lg ">
            <nav className="list-none mt-2 p-2">
              {/* <li className="text-gray-400 hover:text-white">
                <h1>Phone</h1>
              </li> */}
              <li className="mb-4 flex">
                <div>
                  <PhoneIcon
                    className="h-10 w-8 mt-2 text-gray-800 mr-3"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h1 className="text-black text-xl font-medium">Phone</h1>
                  <p className="hover:text-gray-400 text-gray-600 font-medium">
                    8888000077
                  </p>
                </div>
              </li>
              <li className="mb-4 flex">
                <div>
                  <EnvelopeIcon
                    className="h-10 w-8 mt-2 text-gray-800 mr-3"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h1 className="text-black text-xl font-medium">Email</h1>
                  <p className="hover:text-gray-400 text-gray-600 font-medium">
                    xyz@gmail.com
                  </p>
                </div>
              </li>
              <li className="mb-4 flex">
                <div>
                  <GlobeAltIcon
                    className="h-10 w-8 mt-2 text-gray-800 mr-3"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h1 className="text-black text-xl font-medium">Web</h1>
                  <p className="hover:text-gray-400 text-gray-600 font-medium">
                    xyz@gmail.com
                  </p>
                </div>
              </li>
              <li className="mb-4 flex">
                <div>
                  <CalculatorIcon
                    className="h-10 w-8 mt-2 text-gray-800 mr-3"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h1 className="text-black text-xl font-medium">Fax</h1>
                  <p className="hover:text-gray-400 text-gray-600 font-medium">
                    1923456789
                  </p>
                </div>
              </li>
            </nav>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Contact;
