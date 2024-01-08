import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import serviceapi from "../../api/serviceapi";
import Typesapi from "../../api/Typesapi";
import AllServices from "../../pages/AllServices";
import ServicesByTypes from "../../pages/ServicesByTypes";
import Footer from "./Footer";

export const Search = () => {
  const [type, setType] = useState([]);
  const [location, setLocation] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

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

  const getAllSearch = async (type, title, state, city, price) => {
    try {
      const res = await serviceapi.searchServices({
        type: type,
        title: title,
        price: price,
        state: state,
        city: city,
      });
      return setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    // getAllservices();
    // getAllSearch();
    getAllAddress();
  }, []);

  useEffect(() => {
    const res =
      location.length !== 0 ? location.find((i) => i.state === state) : "";
    setCities(res?.districts);
  }, [state]);

  useEffect(() => {
    serviceapi.getAllServices().then((res) => setServices(res.data));
  }, []);

  const handleReset = () => {
    setTypeFilter("");
    setSearch("");
    setPriceFilter(0);
    setState("");
    setCity("");
  };

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    getAllSearch(typeFilter, search, state, city, priceFilter);
    navigate("/services");
  };

  return (
    <>
      <div className="bg-white rounded-lg px-8 py-5 flex flex-col md:ml-auto mt-10 md:mt-0 shadow-md">
        {/* <h2 className="text-black text-lg font-medium title-font mb-5">
          Login
        </h2> */}

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
        <div className="relative mb-4">
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Select City</option>
            <option>New Mexico</option>
            <option>Missouri</option>
            <option>Texas</option>
          </select>
        </div>
        <div className="relative mb-4">
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Select State</option>
            <option>New Mexico</option>
            <option>Missouri</option>
            <option>Texas</option>
          </select>
        </div>
        <div className="relative mb-4">
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Select Services</option>
            <option>Services - 1</option>
            <option>Services - 2</option>
            <option>Services - 3</option>
          </select>
        </div>
        <div className="relative mb-4">
          <div className="relative pt-1">
            <label htmlFor="customRange3" className="form-label">
              Price
            </label>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              min="0"
              max="5"
              //   value="2.5"
              // defaultValue="2.5"
              step="0.5"
              id="customRange3"
            />
            <span>
              <div className="grid grid-cols-4 gap-4">
                <span className="col-start-1 col-end-3">$0</span>
                <span className="col-end-7 col-span-2">$500000</span>
              </div>
            </span>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="text-white w-full bg-rose-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
        >
          Search
        </button>
      </div>
    </>
  );
};

export const ServiceSearch = () => {
  const [type, setType] = useState([]);
  const [location, setLocation] = useState([]);

  const navigate = useNavigate()

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

  const getAllSearch = async (type, title, state, city, price) => {
    try {
      const res = await serviceapi.searchServices({
        type: type,
        title: title,
        price: price,
        state: state,
        city: city,
      });
      return setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    // getAllservices();
    // getAllSearch();
    getAllAddress();
  }, []);

  useEffect(() => {
    const res =
      location.length !== 0 ? location.find((i) => i.state === state) : "";
    setCities(res?.districts);
  }, [state]);

  const handleSearch = (e) => {
    e.preventDefault();
    getAllSearch(typeFilter, search, state, city, priceFilter);
    navigate('/services')
  };

  useEffect(() => {
    serviceapi.getAllServices().then((res) => setServices(res.data));
  }, []);

  const handleReset = () => {
    setTypeFilter("");
    setSearch("");
    setPriceFilter(0);
    setState("");
    setCity("");
  };

  

  return (
    <>
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

      <AllServices services={services}/>
      <Footer />
    </>
  );
};
