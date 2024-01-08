import { CurrencyRupeeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import serviceapi from "../api/serviceapi";
import { ServicesHome } from "../components/customer/CustDashboard";
import Footer from "../components/customer/Footer";
import Navbar from "../components/customer/Navbar";
import Pagination from "../components/customer/Pagination";
import { ServiceSearch } from "../components/customer/Search";

const Services = () => {
  // const [services, setServices] = useState([]);

  // useEffect(() => {
  //   serviceapi.getAllServices().then((res) => setServices(res.data));
  // }, []);

  return (
    <>
      <Navbar />

      <ServicesHome />
      <ServiceSearch />

     
    </>
  );
};

export default Services;
