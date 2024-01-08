import React, { useEffect } from "react";
import addNotification from "react-push-notification";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import Bills from "../../pages/admin/bills/Bills";
import AddOrders from "../../pages/admin/orders/AddOrder";
import EditOrders from "../../pages/admin/orders/EditOrder";
import Orders from "../../pages/admin/orders/Orders";
import About from "../../pages/admin/pages/about/About";
import EditAbout from "../../pages/admin/pages/about/EditAbout";
import Contacts from "../../pages/admin/pages/contacts/Contacts";
import Images from "../../pages/admin/pages/images/Images";
import Reviews from "../../pages/admin/pages/Reviews";
import AddTeams from "../../pages/admin/pages/teams/AddTeams";
import EditTeams from "../../pages/admin/pages/teams/EditTeams";
import Teams from "../../pages/admin/pages/teams/Teams";
import AddServices from "../../pages/admin/services/AddServices";
import EditServices from "../../pages/admin/services/EditServices";
import Services from "../../pages/admin/services/Services";
import Profile from "../../pages/admin/settings/Profile";
import AddServiceTypes from "../../pages/admin/types/AddServiceTypes";
import EditServiceTypes from "../../pages/admin/types/EditServiceTypes";
import ServiceTypes from "../../pages/admin/types/ServiceTypes";
import AddCustomers from "../../pages/admin/users/AddCustomers";
import EditCustomers from "../../pages/admin/users/EditCustomers";
import Users from "../../pages/admin/users/Users";
import AddVendors from "../../pages/admin/vendors/AddVendors";
import EditVendors from "../../pages/admin/vendors/EditVendors";
import Vendors from "../../pages/admin/vendors/Vendors";

// const _admin = localStorage.getItem("admin");
// const admin = JSON.parse(_admin);

const AdminLayout = ({ socket, admin }) => {
  useEffect(() => {
    if (admin !== null && admin.type === "admin") {
      socket.on("receive_book_message", (data) => {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });

      socket.on("receive_payment_message", (data) => {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });

      socket.on("receive_cancel_message", (data) => {
        toast.error(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });

      socket.on("receive_message", (data) => {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });

      socket.on("receive_vendor_cancel", (data) => {
        toast.error(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });

      socket.on("receive_vendor_selected", (data) => {
        toast.error(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
    }
  }, [socket]);

  return (
    <>
      <Routes>
        <Route exact path="/orders" name="Orders Page" element={<Orders />} />
        <Route
          exact
          path="/orders/add"
          name="Add Orders Page"
          element={<AddOrders />}
        />
        <Route
          exact
          path="/orders/edit/:id"
          name="Edit Orders Page"
          element={<EditOrders />}
        />

        {/* Admin Bills Routes */}
        <Route exact path="/bills" name="Bills Page" element={<Bills />} />

        {/* Admin Services Routes */}
        <Route
          exact
          path="/services"
          name="Services Page"
          element={<Services />}
        />
        <Route
          exact
          path="/services/add"
          name="Add Services Page"
          element={<AddServices />}
        />

        <Route
          exact
          path="/services/edit/:id"
          name="Edit Services Page"
          element={<EditServices />}
        />

        {/* Admin Services Types Routes */}
        <Route
          exact
          path="/serviceType"
          name="Services Type Page"
          element={<ServiceTypes />}
        />
        <Route
          exact
          path="/serviceType/add"
          name="Add Service Types Page"
          element={<AddServiceTypes />}
        />

        <Route
          exact
          path="/serviceType/edit/:id"
          name="Edit Service Type Page"
          element={<EditServiceTypes />}
        />

        {/* Admin - Vendors Routes */}
        <Route
          exact
          path="/vendors"
          name="Vendors Page"
          element={<Vendors />}
        />
        <Route
          exact
          path="/vendors/add"
          name="Add Vendors Page"
          element={<AddVendors />}
        />
        <Route
          exact
          path="/vendors/edit/:id"
          name="Edit Vendors Page"
          element={<EditVendors />}
        />

        {/* Admin - User Routes */}
        <Route exact path="/users" name="Users Page" element={<Users />} />
        <Route
          exact
          path="/users/add"
          name="Add Users Page"
          element={<AddCustomers />}
        />
        <Route
          exact
          path="/users/edit/:id"
          name="Edit Users Page"
          element={<EditCustomers />}
        />

        <Route
          exact
          path="/profile"
          name="Profile Page"
          element={<Profile />}
        />

        {/* Admin About Page */}
        <Route exact path="/about" name="About Page" element={<About />} />
        <Route
          exact
          path="/about/edit/:id"
          name="Edit About Page"
          element={<EditAbout />}
        />

        <Route
          exact
          path="/contacts"
          name="Contacts Page"
          element={<Contacts />}
        />

        <Route exact path="/images" name="Images Page" element={<Images />} />
        <Route
          exact
          path="/reviews"
          name="Reviews Page"
          element={<Reviews />}
        />
        <Route exact path="/teams" name="Teams Page" element={<Teams />} />
        <Route
          exact
          path="/teams/add"
          name="Add Teams Page"
          element={<AddTeams />}
        />
        <Route
          exact
          path="/teams/edit/:id"
          name="Edit Teams Page"
          element={<EditTeams />}
        />
      </Routes>
    </>
  );
};

export default AdminLayout;
