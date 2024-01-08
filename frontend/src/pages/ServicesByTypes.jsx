import { MapPinIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/customer/Pagination";
import Footer from "../components/customer/Footer";
import Typesapi from "../api/Typesapi";
import serviceapi from "../api/serviceapi";
import Navbar from "../components/customer/Navbar";
import { ServicesHome } from "../components/customer/CustDashboard";

const ServicesByTypes = () => {
  const [type, setType] = useState([]);
  const [location, setLocation] = useState([]);

  const navigate = useNavigate();
  const { types } = useParams();

  // All Filters
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);
  const [state, setState] = useState("");
  const [cities, setCities] = useState("");
  const [city, setCity] = useState("");

  // For Price Filter
  const minPrice = 0;
  const maxPrice = 500000;

  const [services, setServices] = useState([]);

  const AllTypes = async () => {
    try {
      const res = await Typesapi.getAllServiceType();
      return setType(res.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const getAllSearch = async (type, title, state, city, price) => {
//     try {
//       const res = await serviceapi.searchServices({
//         type: type,
//         title: title,
//         price: price,
//         state: state,
//         city: city,
//       });
//       return setServices(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const getAllAddress = async () => {
    try {
      const res = await serviceapi.getAllAddress();
      return setLocation(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AllTypes();
    getAllAddress();
  }, []);

  useEffect(() => {
    const res =
      location.length !== 0 ? location.find((i) => i.state === state) : "";
    setCities(res?.districts);
  }, [state]);

  const handleSearch = (e) => {
    e.preventDefault();
    // getAllSearch(typeFilter, search, state, city, priceFilter);
    navigate("/services");
  };

  const getServiceByTypes = async () => {
    try {
      const res = await serviceapi.searchServices({
        type: types,
      });
      return setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServiceByTypes();
  }, [types]);

  const handleReset = () => {
    setTypeFilter("");
    setSearch("");
    setPriceFilter(0);
    setState("");
    setCity("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const page = services;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    // data.length > 0
    //   ? data.slice(indexOfFirstRecord, indexOfLastRecord)
    // :
    services.length > 0
      ? services.slice(indexOfFirstRecord, indexOfLastRecord)
      : "";
  const nPages = services ? Math.ceil(services.length / recordsPerPage) : 0;

  return (
    <>
      <Navbar />
      <ServicesHome types={types} />
      <section className="text-gray-400 bg-rose-400 body-font">
        <div className="container px-5 py-10 mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex flex-wrap -m-2 w-2/3 mx-auto"
          >
            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative mb-4">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setTypeFilter(e.target.value)}
                  value={typeFilter}
                >
                  <option>Select Services</option>
                  {type.length > 0 &&
                    type.map((type) => {
                      return (
                        <option key={type._id} value={type.type}>
                          {type.type}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative mb-4">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>Select State</option>
                  {location.length > 0
                    ? location.map((state) => {
                        return (
                          <option key={state.state} value={state.state}>
                            {state.state}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative mb-4">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option>Select City</option>
                  {state &&
                    (cities
                      ? cities.length > 0 &&
                        cities.map((city) => {
                          return (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          );
                        })
                      : "")}
                </select>
              </div>
            </div>

            <div className="px-2 py-1 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative mb-4">
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  min={minPrice}
                  max={maxPrice}
                  //   value="2.5"
                  // defaultValue={maxPrice / 2}
                  step="1000"
                  id="customRange3"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                />
                <span>
                  <div className="grid grid-cols-4 gap-4 text-white">
                    <span className="col-start-1 col-end-3">$0</span>
                    <span className="col-end-7 col-span-2">
                      ${priceFilter === 0 ? maxPrice : priceFilter}
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative mb-4">
                <input
                  className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search By name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative text-center">
                <button
                  onClick={handleReset}
                  className="btn text-white w-1/2  bg-error border-0 py-2 text-lg"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2"></div>

            <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2">
              <div className="relative text-center">
                <button
                  type="submit"
                  className="btn text-white w-full  bg-black border-0 py-2 focus:outline-none hover:bg-gray-800 rounded text-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <div className="bg-slate-200">
        <div className="mx-auto max-w-2xl px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col text-center w-full mb-14">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              ALL <span className="text-red-400"> SERVICES</span>
            </h1>
            <h2 className="text-xm text-indigo-400 tracking-widest font-medium title-font mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3  xl:w-3/4 md:w-1/2 p-4 mx-auto">
            {services.length > 0 &&
              currentRecords.map((service) => (
                <div
                  key={service._id}
                  className="group relative card card-image-cover  rounded-md pb-2"
                >
                  <NavLink to={`/service/${service._id}`} className="group">
                    <div className="relative lg:h-60 min-h-60  w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <img
                        src={
                          service.image !== "undefined"
                            ? service.image.includes("https")
                              ? service.image
                              : `http://${window.location.hostname}:5000/services/${service.image}`
                            : `https://picsum.photos/1920/1800`
                        }
                        alt={service.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                      <p className="absolute text-2xl text-white bottom-3 right-5 flex">
                        <div>{service.price}</div>
                      </p>
                    </div>
                    <div className="pt-3 pb-4 px-2 flex justify-between mx-2">
                      <div>
                        <h3 className="text-gray-900 text-2xl leading-tight">
                          <span aria-hidden="true" className="absolute" />
                          {service.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 flex">
                          <MapPinIcon
                            className="h-6 w-6 mx-1 mt-1 text-red-600"
                            aria-hidden="true"
                          />

                          <div className="text-2xl leading-tight">
                            {service.city}
                          </div>
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
          </div>
          {services.length === 0 && (
            <div className=" mx-auto relative card card-image-cover  rounded-md mb-10 -mt-8">
              <h1 className="p-2 mx-auto">There are no services found</h1>
            </div>
          )}
        </div>

        {services.length > 0 && (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            indexOfFirstRecord={indexOfFirstRecord}
            indexOfLastRecord={indexOfLastRecord}
            services={services}
            page={page}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ServicesByTypes;
