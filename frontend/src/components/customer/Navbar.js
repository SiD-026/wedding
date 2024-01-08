import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import Typesapi from "../../api/Typesapi";
import serviceapi from "../../api/serviceapi";
import Toast from "../../common/Toast";
import { RiLogoutBoxFill } from "react-icons/ri";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import customerapi from "../../api/customerapi";
import vendorapi from "../../api/vendorapi";

const _user = localStorage.getItem("token");
const user = JSON.parse(_user);
const type = user ? Object.entries(user)[1][0] : "";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [types, setTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [vendorName, setVendorName] = useState("");

  const navigate = useNavigate();

  const toast = Toastify({
    text: "Logout Successfully",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.assign("/login");
    Toast.Logout();
    toast.showToast();
  };

  const getAllTypes = async () => {
    try {
      const res = await Typesapi.getAllServiceType();
      return setTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomer = async () => {
    try {
      const res = await customerapi.getCustomerById(user.customerId);
      setCustomerName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getVendor = async () => {
    try {
      const res = await vendorapi.getVendorById(user.vendorId);
      setVendorName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTypes();
    getCustomer();
    getVendor();
  }, []);

  const getAllSearch = async (type) => {
    try {
      setServices();
      const res = await serviceapi.searchServices({
        type: type,
        // title: title,
        // price: price,
        // state: state,
        // city: city,
      });
      setServices(res.data);
      navigate(`/services/${type}`);
    } catch (error) {
      console.log(error);
    }
  };

  let profile = "";
  if (type === "vendorId") {
    profile = type;
  } else if (type === "customerId") {
    profile = type;
  }


  return (
    <>
      <Popover className="sticky top-0 z-50 bg-rose-600 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              {/* <a to="#">
              <span className="sr-only">MakeMyShaadi</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a> */}
              {/* <span className="text-white text-3xl">MakeMyShaadi</span> */}
              <span className="text-white text-3xl">Bridal Services</span>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Link
                to="/"
                className="text-white font-medium hover:text-gray-900"
              >
                HOME
              </Link>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-white",
                        "group inline-flex items-center rounded-md bg-error bg-opacity-5 font-medium hover:text-gray-900 focus:outline-none"
                      )}
                    >
                      <span>SERVICES</span>
                      {/* <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    /> */}
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-[250%]	 transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-gray-200 py-2 sm:gap-8 ">
                            <Link
                              to={"/services"}
                              className="flex items-start rounded-lg p-3 hover:bg-white"
                            >
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  ALL SERVICES
                                </p>
                              </div>
                            </Link>
                            {/* {types.length > 0 &&
                              types.map((item) => (
                                <Link
                                  key={item._id}
                                  onClick={() => getAllSearch(item.type)}
                                  value={services}
                                  className=" flex items-start rounded-lg px-3 py-1 hover:bg-white"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      {item.type}
                                    </p>
                                  </div>
                                </Link>
                              ))} */}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Link
                to="/about"
                className="text-white font-medium hover:text-gray-900"
              >
                ABOUT
              </Link>
              <Link
                to="/reviews"
                className="text-white font-medium hover:text-gray-900"
              >
                REVIEWS
              </Link>
              <Link
                to="/photos"
                className="text-white font-medium hover:text-gray-900"
              >
                GALLERY
              </Link>
              <Link
                to="/contact"
                className="text-white font-medium hover:text-gray-900"
              >
                CONTACT
              </Link>
            </Popover.Group>
            {profile === "customerId" ? (
              <div className="items-center justify-end md:flex space-x-5 md:flex-1 lg:w-0">
                <Link
                  to="/customerDashboard"
                  className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/customerProfile"
                  className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
                >
                  {customerName.toUpperCase()}
                </Link>
                <Link
                  onClick={handleLogout}
                  className="whitespace-nowrap flex text-base font-medium text-white hover:text-xl"
                >
                  <RiLogoutBoxFill className="mt-1 text-lg" />
                  LOGOUT
                </Link>
              </div>
            ) : profile === "vendorId" ? (
              <div className="items-center justify-end md:flex space-x-5 md:flex-1 lg:w-0">
                <Link
                  to="/vendors"
                  className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/vendorProfile"
                  className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
                >
                {vendorName.toUpperCase()}
                </Link>
                <Link
                  onClick={handleLogout}
                  className="whitespace-nowrap flex text-base font-medium text-white hover:text-gray-900"
                >
                  <RiLogoutBoxFill className="mt-1 text-lg" />
                  LOGOUT
                </Link>
              </div>
            ) : (
              <div className="items-center justify-end md:flex space-x-5 md:flex-1 lg:w-0">
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Navbar;
