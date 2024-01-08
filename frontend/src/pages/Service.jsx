import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { ServicesHome } from "../components/customer/CustDashboard";
import Footer from "../components/customer/Footer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import serviceapi from "../api/serviceapi";
import moment from "moment/moment";
import vendorapi from "../api/vendorapi";
import customerapi from "../api/customerapi";
import Navbar from "../components/customer/Navbar";
import { FaRupeeSign } from "react-icons/fa";
import ServiceBook from "./ServiceBook";
import { toast } from "react-toastify";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const Service = ({ socket }) => {
  const [service, setService] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState();

  const getDetails = async () => {
    const res = await serviceapi.getServiceById(id);
    setService(res.data);

    const vendorDetails = await vendorapi.getVendorById(res.data.vendorId);
    setVendor(vendorDetails.data);

    const customerDetails = await customerapi.getCustomerById(user.customerId);
    setCustomer(customerDetails.data);
  };

  useEffect(() => {
    getDetails();

    // if (service.likes) {
    //   for (let i of service.likes) {
    //     if (i === user.customerId) {
    //       console.log(i, "jjj");
    //       setLike(1)
    //       // setIsLiked(!isLiked);
    //     } else {
    //       console.log(i, "i");
    //       setLike(0)
    //       // setIsLiked(!isLiked);
    //     }
    //   }
    // }
  }, []);

  const handleClick = (id) => {
    setShowModal(true);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLiked = async () => {
    console.log("hello");
    try {
      await serviceapi.getLikes(id, {
        customerId: user.customerId,
      });
      getDetails();
      toast.success("Liked Successfully", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLiked = async () => {
    console.log("disli");

    try {
      await serviceapi.getDisLikes(id, {
        customerId: user.customerId,
      });
      getDetails();
      toast.success("DisLiked Successfully", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isLiked, "isliked");
  console.log(service.likes, "likes");
  return (
    <>
      {showModal ? (
        <ServiceBook
          socket={socket}
          setShowModal={setShowModal}
          service={service}
          vendor={vendor}
          customer={customer}
        />
      ) : null}

      <Navbar />
      <ServicesHome />
      <section className="text-gray-400 bg-white body-font overflow-hidden">
        <div className="container px-5 pt-10 mx-auto">
          <div className="lg:w-3/5 mx-auto flex flex-wrap">
            <div className="lg:w-2/3 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-3xl leading-tight title-font font-semibold text-black tracking-widest">
                {service.title}
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-4">
                <p className="mt-2 text-sm text-gray-700 flex">
                  <MapPinIcon
                    className="h-6 w-6 text-rose-600"
                    aria-hidden="true"
                  />

                  <div className="text-lg leading-tight">{service.city}</div>
                </p>
              </h1>
              <img
                alt=""
                className={`w-full ${
                  toggle === true ? "lg:h-64 h-64" : "lg:h-80 h-64"
                } object-cover object-center rounded`}
                src={
                  service.image !== "undefined"
                    ? service.image === "https://picsum.photos/1920/1800"
                      ? service.image
                      : `http://${window.location.hostname}:5000/services/${service.image}`
                    : `https://picsum.photos/1920/1800`
                }

                // src={ `http://${window.location.hostname}:5000/services/${service.image}`}
              />
              {toggle === true && (
                <p className="w-full rounded-lg  bg-gray-200 shadow-md p-3 text-left text-black">
                  {service.description}
                  <button
                    className="btn btn-error px-4 text-lg ml-2"
                    onClick={handleToggle}
                  >
                    back
                  </button>
                </p>
              )}
              {toggle === false && (
                <button
                  className="btn btn-secondary mt-2 text-xl"
                  onClick={handleToggle}
                >
                  Description
                </button>
              )}
            </div>

            <div className="lg:w-1/3 w-full mt-10  lg:py-6 lg:mb-10 card border px-3 h-4/5">
              {user ? (
                <label
                  className="btn btn-outline-success mb-3 w-full"
                  htmlFor="modal1"
                  onClick={() => handleClick(service._id)}
                >
                  Book Now
                </label>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn text-rose-600 border-2 border-rose-600 hover:text-white hover:bg-rose-600   mb-3 w-full"
                >
                  Login To Book
                </button>
              )}
              <h2 className="text-3xl leading-tight title-font font-medium text-gray-800 tracking-widest">
                Details
              </h2>

              <div className="flex border-gray-800 pt-2">
                <span className="text-gray-800">Price</span>
                <span className="ml-auto text-gray-800 flex">
                  <FaRupeeSign className="mt-1 text-sm" />
                  {service.price}
                </span>
              </div>
              <div className="flex border-t border-gray-200 pt-2">
                <span className="text-gray-800">City</span>
                <span className="ml-auto text-gray-800">{service.city}</span>
              </div>
              <div className="flex border-t border-gray-200 pt-2">
                <span className="text-gray-800 ">State</span>
                <span className="ml-auto text-gray-800 ">{service.state}</span>
              </div>
              {/* <div className="flex border-t border-gray-200 pt-2">
                <span className="text-gray-800 ">Country</span>
                <span className="ml-auto text-gray-800 ">India</span>
              </div> */}
              <div className="flex border-y border-gray-200 py-2">
                <span className="text-gray-800 ">Published On</span>
                <span className="ml-auto text-gray-800 ">
                  {moment(service.createdAt).utc().format("YYYY/MM/DD")}
                </span>
              </div>
              <div className="border-gray-200 mt-2">
                <div className="text-gray-800 font-medium mb-2">Contacts</div>
                <div className="flex my-1">
                  <MapPinIcon
                    className="h-6 w-6 text-rose-600 mr-3"
                    aria-hidden="true"
                  />
                  <span className="text-rose-500 font-medium">{`${service.city}, ${service.state}`}</span>
                </div>
                <div className="flex my-1">
                  <EnvelopeIcon
                    className="h-6 w-6 text-rose-600 mr-3"
                    aria-hidden="true"
                  />
                  {vendor && (
                    <span className="text-rose-500 font-medium">
                      {vendor.email}
                    </span>
                  )}
                </div>
                <div className="flex my-1">
                  <PhoneIcon
                    className="h-6 w-6 text-rose-600 mr-3"
                    aria-hidden="true"
                  />
                  {vendor && (
                    <span className="text-rose-500 font-medium">
                      {vendor.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex">
                <NavLink to={"/services"} className="btn btn-primary w-1/3">
                  Back
                </NavLink>

                {/* {service.likes &&
                  service.likes.length > 0 &&
                  service.likes.map((like, index) => {
                    return (
                      <div className="ml-auto" key={index}>
                        {like.includes(user.customerId) ? (
                          <div>
                            <span
                              className="tooltip tooltip-top ml-auto"
                              data-tooltip="DisLike"
                            >
                              <button
                                name="likes"
                                value={service.likes}
                                onClick={handleUnLiked}
                                className="rounded-full w-10 h-10  bg-rose-400 p-0 border-0 inline-flex items-center justify-center text-error"
                              >
                                <svg
                                  fill="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                              </button>
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span
                              className="tooltip tooltip-top mx-2"
                              data-tooltip="Like"
                            >
                              <button
                                name="likes"
                                value={service.likes}
                                onClick={handleLiked}
                                className="rounded-full w-10 h-10  bg-gray-400 p-0 border-0 inline-flex items-center justify-center text-secondary"
                              >
                                <svg
                                  fill="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                              </button>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })} */}

                {/* {service.likes && service.likes.length === 0 && (
                  <div className="ml-auto">
                    <span
                      className="tooltip tooltip-top mx-2"
                      data-tooltip="Like"
                    >
                      <button
                        name="likes"
                        value={service.likes}
                        onClick={handleLiked}
                        className="rounded-full w-10 h-10  bg-rose-400 p-0 border-0 inline-flex items-center justify-center text-white"
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </span>
                    <span
                      className="tooltip tooltip-top ml-auto"
                      data-tooltip="DisLike"
                    >
                      <button
                        name="likes"
                        value={service.likes}
                        onClick={handleUnLiked}
                        className="rounded-full w-10 h-10 ml-auto bg-gray-600 p-0 border-0 inline-flex items-center justify-center text-white"
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                )} */}
              </div>
              {/* <div>{service.likes && service.likes.length}</div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Service;
