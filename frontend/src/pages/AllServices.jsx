import { MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Pagination from "../components/customer/Pagination";

const AllServices = ({ services }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const page = services;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    // data.length > 0
    //   ? data.slice(indexOfFirstRecord, indexOfLastRecord)
    // :
    services?.length > 0
      ? services.slice(indexOfFirstRecord, indexOfLastRecord)
      : "";
  const nPages = services ? Math.ceil(services.length / recordsPerPage) : 0;
  return (
    <>
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
            {services && services?.length > 0 &&
              currentRecords.map((service) => (
                <div
                  key={service._id}
                  className="group relative card card-image-cover  rounded-md pb-2"
                >
                  <NavLink to={`/service/${service._id}`} className="group">
                    <div className="relative lg:h-60 min-h-60  w-full overflow-hidden rounded-md bg-gray-200 group-hover:bottom-5">
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
                      <h3 className="absolute text-2xl text-white bg-rose-500 top-3 left-5 px-1 font-medium rounded-md ">
                        {service.type}
                      </h3>
                      <p className="absolute text-2xl text-white bottom-3 right-5 flex">
                        <div>{service.price}</div>
                      </p>
                    </div>
                    <div className="pt-3 pb-4 px-2 flex justify-between mx-2 ">
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
          {services && services?.length === 0 && (
            <div className=" mx-auto relative card card-image-cover  rounded-md mb-10 -mt-8">
              <h1 className="p-2 mx-auto">There are no services found</h1>
            </div>
          )}
        </div>

        {services && services.length > 0 && (
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
    </>
  );
};

export default AllServices;
