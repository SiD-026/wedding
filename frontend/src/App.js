import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.min.css'

import About from "./pages/About";
import Contact from "./pages/Contact";
import CustomerRegistration from "./pages/customers/CustomerRegistration";
import CustomersDashboard from "./pages/customers/CustomersDashboard";
import CustomerProfile from "./pages/customers/CustomerProfile";

import CustomersLogin from "./pages/customers/CustomersLogin";
import Photos from "./pages/Photos";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Service from "./pages/Service";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import VendorDashboard from "./pages/vendors/VendorDashboard";
import AddService from "./pages/vendors/AddService";
import VendorServices from "./pages/vendors/VendorServices";
import ServicesByTypes from "./pages/ServicesByTypes";
import VendorProfile from "./pages/vendors/VendorProfile";
import ServiceBook from "./pages/ServiceBook";
import Reviews from "./pages/Reviews";
import Vendors from "./pages/vendors/Vendors";
import EditService from "./pages/vendors/EditService";

import {
  ToastContainer,
  toast,
  Bounce,
  Zoom,
  Flip,
  Slide,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Notifications } from "react-push-notification";

import { io } from "socket.io-client";

const socket = io.connect(`http://${window.location.hostname}:5000`);

// const Home = lazy(() => import("./pages/Home"));
// const CustomersDashboard = lazy(() => import("./pages/customers/CustomersDashboard"));
// const CustomerProfile = lazy(() => import("./pages/customers/CustomerProfile"));

const _user = localStorage.getItem("token");
const user = JSON.parse(_user);
const type = user ? Object.entries(user)[1][0] : "";

const _admin = localStorage.getItem("admin");
const admin = JSON.parse(_admin);
// console.log(admin,"admin")

function App() {
  let profile = "";
  if (type === "vendorId") {
    profile = type;
  } else if (type === "customerId") {
    profile = type;
  }

  useEffect(() => {
    if (profile === "vendorId") {
      socket.on("receive_book_message", (data) => {
        if (data.vendorId === user.vendorId)
          toast.info(data.message, {
            position: "bottom-right",
            autoClose: 3000,
          });
      });

      socket.on("receive_payment_message", (data) => {
        if (data.vendorId === user.vendorId)
          toast.info(data.message, {
            position: "bottom-right",
            autoClose: 3000,
          });
      });

      socket.on("receive_cancel_message", (data) => {
        if (data.vendorId === user.vendorId)
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 3000,
          });
      });
    }

    if (profile === "customerId") {
      socket.on("receive_vendor_cancel", (data) => {
        if (data.customerId === user.customerId)
          toast.info(data.message, {
            position: "bottom-right",
            autoClose: 3000,
            transition: Zoom,
          });
      });

      socket.on("receive_vendor_selected", (data) => {
        if (data.customerId === user.customerId)
          toast.info(data.message, {
            position: "bottom-right",
            autoClose: 3000,
            transition: Zoom,
          });
      });
    }
  }, [socket]);

  return (
    <>
      <ToastContainer />
      {/* <Notifications/> */}
      <Routes>
        {/* Admin Routes */}
        <Route exact path="/admin" name="Admin Page" element={<AdminLogin />} />
        {admin && admin.type === "admin" ? (
          <Route
            exact
            path="/admin/dashboard/*"
            name="Admin Page"
            element={<AdminDashboard socket={socket} admin={admin} />}
          />
        ) : (
          <Route
            exact
            path="/admin/*"
            name="404 Page"
            element={<AdminLogin />}
          />
        )}
        {/* <Route exact path="/admin/dashboard" name="Admin Page" element={<AdminLayout />} /> */}

        {/* Home Routes */}
        <Route exact path="/" name="Home Page" element={<Home />} />
        <Route exact path="/about" name="About Page" element={<About />} />
        <Route
          exact
          path="/services"
          name="Services Page"
          element={<Services />}
        />
        <Route
          exact
          path="/services/:types"
          name="ServicesByTypes Page"
          element={<ServicesByTypes />}
        />
        <Route
          exact
          path="/service/:id"
          name="Service Page"
          element={<Service socket={socket} />}
        />
        <Route
          exact
          path="/service/book/:id"
          name="Service Book Page"
          element={<ServiceBook />}
        />

        {/* Routes for Reviews */}
        <Route
          exact
          path="/reviews"
          name="Reviews Page"
          element={<Reviews />}
        />

        {/* Routes for Gallery/Photos */}
        <Route exact path="/photos" name="Photos Page" element={<Photos />} />
        <Route
          exact
          path="/contact"
          name="Contact Page"
          element={<Contact />}
        />

        {/* Customers Routes */}
        {profile === "customerId" ? (
          <Route
            exact
            path="/customerDashboard"
            name="CustomerDashboard Page"
            element={<CustomersDashboard socket={socket} />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )}

        {profile === "customerId" ? (
          <Route
            exact
            path="/customerProfile"
            name="CustomerProfile Page"
            element={<CustomerProfile />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )}

        {/* Customer Login Route */}
        <Route
          exact
          path="/login"
          name="Login Page"
          element={<CustomersLogin />}
        />

        {/* Customer Registration Route */}

        <Route
          exact
          path="/register"
          name="Registration Page"
          element={<CustomerRegistration socket={socket} />}
        />

        {/* Vendors Routes */}
        {profile === "vendorId" ? (
          <Route
            exact
            path="/vendors"
            name="Vendor Page"
            element={<Vendors socket={socket} />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )}

        {/* {profile === "vendorId" ? (
          <Route
            exact
            path="/vendorDashboard"
            name="Vendor Dashboard Page"
            element={<VendorDashboard />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )} */}

        {profile === "vendorId" ? (
          <Route
            exact
            path="/AddVendorServices"
            name="Add Vendor Services Page"
            element={<AddService />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )}
        {profile === "vendorId" ? (
          <Route
            exact
            path="/editVendorServices/:id"
            name="Edit Vendor Services Page"
            element={<EditService />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )}

        {profile === "vendorId" ? (
          <Route
            exact
            path="/vendorProfile"
            name="Vendor Profile Page"
            element={<VendorProfile />}
          />
        ) : (
          <Route exact path="/*" name="404 Page" element={<CustomersLogin />} />
        )}
      </Routes>
    </>
  );
}

export default App;
