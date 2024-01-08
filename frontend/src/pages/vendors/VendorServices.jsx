import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import serviceapi from "../../api/serviceapi";
import Pagination from "../../common/Pagination";
import { NavLink } from "react-router-dom";
import Toast from "../../common/Toast";

const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const VendorServices = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const servicesDetails = async () => {
    try {
      const res = await serviceapi.searchServiceByVendors({
        vendorId: user.vendorId,
      });
      setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    servicesDetails();
  }, []);

  // const handleClick = () => {
  //   navigate("/AddVendorServices");
  // };

  const handleDelete = async (id) => {
    try {
      await serviceapi.deleteServiceById(id);
      setServices(services.filter((data) => data._id !== id));
      Toast.deleted();
    } catch (error) {
      console.log(error);
      Toast.error(error);
    }
  };

  const page = services;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = services.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(services.length / recordsPerPage);

  return (
    <>
      <div className="py-2 align-middle inline-block min-w-full sm:text-center lg:3x-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 whitespace-nowrap uppercase text-gray-900">
                  sr
                </th>
                <th className=" text-center font-medium text-gray-900 uppercase tracking-wider">
                  Title
                </th>
                <th className=" text-center font-medium text-gray-900 uppercase tracking-wider">
                  Service Type
                </th>
                <th className=" text-center font-medium text-gray-900 uppercase tracking-wider">
                  Price
                </th>
                <th className=" text-center font-medium text-gray-900 uppercase tracking-wider">
                  Created At
                </th>
                <th className="relative text-gray-900">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.length > 0 ? (
                currentRecords.map((services, index) => (
                  <tr key={services._id}>
                    <td className="text-center text-gray-900 py-3 whitespace-nowrap">
                      {(currentPage - 1) * recordsPerPage + index + 1}
                    </td>
                    <td className="text-center py-3 whitespace-nowrap">
                      <div className=" text-gray-900 font-medium">
                        {services.title}
                      </div>
                    </td>
                    <td>
                      <div className=" text-gray-700 font-medium">
                        {services.type}
                      </div>
                    </td>

                    <td>
                      <div className=" text-gray-700 font-medium">
                        {services.price}
                      </div>
                    </td>
                    <td className=" text-gray-700 font-medium text-center">
                      {moment(services.createdAt).utc().format("YYYY/MM/DD")}
                    </td>
                    <td className="text-center py-3 whitespace-nowrap">
                      <NavLink
                        to={`/editVendorServices/${services._id}`}
                        className="btn btn-sm btn-primary mx-2 hover:bg-indigo-600 text-base"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(services._id)}
                        className="btn btn-sm bg-rose-600 hover:bg-error text-base"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-3 text-2xl mx-auto font-medium text-black"
                  >
                    No Services
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {services.length > 0 && (
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              indexOfFirstRecord={indexOfFirstRecord}
              indexOfLastRecord={indexOfLastRecord}
              page={page}
            />
          )}
        </div>
      </div>
      {/* </div> */}
      {/* <Footer />
      </section> */}
    </>
  );
};

export default VendorServices;
