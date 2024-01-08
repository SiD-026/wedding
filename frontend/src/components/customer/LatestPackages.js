import { CurrencyRupeeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import serviceapi from "../../api/serviceapi";
import { FaRupeeSign } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const LatestPackages = () => {
  const [services, setservices] = useState([]);

  const getAllServices = async () => {
    try {
      const res = await serviceapi.searchServices({ sort: "date", by: "desc" });
      return setservices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              LATEST <span className="text-rose-600">PACKAGES</span>
            </h1>
            <h2 className="text-xm text-indigo-400 tracking-widest font-medium title-font mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h2>
          </div>

          <div className="bg-gray-100">
            <div className="mx-auto max-w-2xl  px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
              {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <a
                    key={product._id}
                    href={product.href}
                    className="group shadow-md rounded-md pb-2"
                  >
                    <div className="relative lg:h-80 min-h-80  w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />

                      <h2 className="absolute text-xl text-amber-300 bottom-0 text-center -translate-x bg-black opacity-50 w-full">
                        {product.date}
                      </h2>
                      <button className="btn absolute text-xl text-white px-1 rounded-md bg-red-500 border-red-500 top-5 right-5">
                        {product.services}
                      </button>
                    </div>
                    <div className=" my-2 flex justify-between mx-2 px-2">
                      <div>
                        <h3 className="text-gray-700 text-2xl leading-tight">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 flex">
                          <MapPinIcon
                            className="h-6 w-6 mx-1 mt-1"
                            aria-hidden="true"
                          />

                          <div className="text-2xl leading-tight">
                            {product.location}
                          </div>
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="mt-2 flex justify-between mx-2 px-2">
                      <div>
                        <h3 className="text-red-500 font-medium text-2xl leading-tight">
                          {product.state}
                        </h3>
                      </div>
                      <p className=" flex">
                        <div className="mt-1 text-xl font-medium text-red-500">
                          {product.price}
                        </div>
                      </p>
                    </div>
                  </a>
                ))}
              </div> */}

              {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> */}
              <div className="flex overflow-x-auto space-x-8">
                {services &&
                  services.map((service) => (
                    <section
                      key={service._id}
                      className="flex-shrink-0 rounded-md border mb-5 w-1/4 shadow-md pb-2"
                    >
                      <NavLink to={`/service/${service._id}`} className="group">
                        <div className="relative lg:h-80 min-h-80  w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                          <img
                            src={
                              service.image !== "undefined"
                                ? service.image.includes("https")
                                  ? service.image
                                  : `http://${window.location.hostname}:5000/services/${service.image}`
                                : `https://picsum.photos/1920/1800`
                            }
                            alt={service.imageAlt}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />

                          {/* <h1 className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        KindaCode.com
                      </h1> */}
                          <h2 className="absolute text-xl font-medium text-amber-300 bottom-0 text-center -translate-x bg-black opacity-50 w-full">
                            {moment(service.createdAt)
                              .utc()
                              .format("YYYY/MM/DD")}
                          </h2>
                          {/* <h3 className="absolute text-2xl text-blue-300 top-5 left-5">
                        Top Left
                      </h3> */}
                          <button className="btn absolute text-xl text-white px-1 rounded-md bg-rose-500 border-rose-500 top-5 right-5">
                            {service.type}
                          </button>
                          {/* <p className="absolute text-2xl text-white bottom-5 right-5 flex">
                        <CurrencyRupeeIcon
                          className="h-6 w-6 mt-1"
                          aria-hidden="true"
                        />
                        <div>{service.price}</div>
                      </p> */}
                        </div>
                        <div className=" my-1 flex justify-between mx-2 px-2">
                          <div>
                            <h3 className="text-gray-900 text-2xl leading-tight">
                              <span aria-hidden="true" className="absolute" />
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-700 flex">
                              <MapPinIcon
                                className="h-6 w-6 mx-1 mt-1"
                                aria-hidden="true"
                              />

                              <div className="text-2xl leading-tight">
                                {service.city}
                              </div>
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="mt-2 flex justify-between mx-2 px-2">
                          <div>
                            <h3 className="text-rose-600 font-medium text-2xl leading-tight">
                              {service.state}
                            </h3>
                          </div>
                          <p className=" flex">
                            <div className="mt-1 text-xl font-medium text-rose-600 flex ">
                              <FaRupeeSign className="mt-2 text-base" />
                              {service.price}
                            </div>
                          </p>
                        </div>
                      </NavLink>
                    </section>
                  ))}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestPackages;
