import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Toast from "../../common/Toast";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Navbar = () => {
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
    localStorage.removeItem("admin");
    window.location.assign("/admin");
    Toast.Logout();
    toast.showToast();
  };
  return (
    <>
      <Popover className="sticky top-0 z-50 bg-rose-600 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-white text-3xl">Bridal Services</span>
            </div>
            <div className="items-center justify-end md:flex space-x-5 md:flex-1 lg:w-0">
              {/* <Link
                to="/admin/dashboard"
                className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/dashboard"
                className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900"
              >
                PROFILE
              </Link> */}
              <Link
                onClick={handleLogout}
                className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900 flex"
              >
                <ArrowLeftOnRectangleIcon
                  className="h-6 w-6 text-white hover:text-gray-900"
                  aria-hidden="true"
                />
                <span>LOGOUT</span>
              </Link>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Navbar;
