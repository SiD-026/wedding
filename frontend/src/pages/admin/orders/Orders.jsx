import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import customerapi from "../../../api/customerapi";
import orderapi from "../../../api/orderapi";
import serviceapi from "../../../api/serviceapi";
import vendorapi from "../../../api/vendorapi";
import Pagination from "../../../common/Pagination";
import Toast from "../../../common/Toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const [serviceId, setServiceId] = useState();
  const [loading, setLoading] = useState(false);

  const orderDetails = async () => {
    try {
      const res = await orderapi.searchOrders({ sort: "date", by: "desc" });
      for (let i of res.data) {
        const vendorDetails = await vendorapi.getVendorById(i.vendorId);
        const customerDetails = await customerapi.getCustomerById(i.customerId);
        const serviceDetails = await serviceapi.getServiceById(i.serviceId);
        i.vendor = vendorDetails.data;
        i.service = serviceDetails.data;
        i.customer = customerDetails.data;
      }
      return setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const search = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    orderDetails();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleCancelId = (id) => {
    setServiceId(id);
  };

  const handleCancel = async () => {
    try {
      const res = await orderapi.updateOrderById(serviceId, {
        status: "Cancelled",
      });
      orderDetails();
      Toast.orderCancelled();
    } catch (error) {
      console.log(error);
    }
  };

  const page = orders;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(orders.length / recordsPerPage);

  return (
    <>
      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Order Cancellation</h2>
          <span>Are You really want to Cancel the Order?</span>
          <div className="flex gap-3">
            <label
              className="btn btn-error btn-block"
              htmlFor="modal-2"
              onClick={handleCancel}
            >
              Cancel Order
            </label>
            {/* <label className="btn btn-block" htmlFor="modal-2">Cancel</label> */}
          </div>
        </div>
      </div>

      <div className="container px-5 mx-auto ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex py-2 pt-10 pb-5 px-5">
            <div className="bg-indigo-600 px-2 rounded-lg">
              <h2 className="font-medium text-3xl text-white">Orders</h2>
            </div>
            {/* <select className="select select-secondary select-sm mx-5 w-1/6">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select> */}
            {/* <button
              onClick={handleClick}
              className="btn btn-md ml-auto btn-success"
            >
              ADD
            </button> */}
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="flex w-full overflow-x-auto ">
              <table className="w-full text-center">
                <thead className="bg-gray-200 ">
                  <tr>
                    <th className="py-2">ID</th>
                    <th>Customer</th>
                    <th>Vendor</th>
                    {/* <th>Email</th> */}
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Event Date</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center font-medium">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={11}
                        className="py-3 text-2xl mx-auto font-medium text-black"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                        Loading...
                      </td>
                    </tr>
                  ) : orders.length > 0 ? (
                    currentRecords.map((order, index) => (
                      <tr key={order._id}>
                        <td className="py-3 whitespace-nowrap">
                          {/* <img
                            className="h-10 w-10 rounded-full"
                            src={order.image}
                            alt=""
                          /> */}
                          {(currentPage - 1) * recordsPerPage + index + 1}
                        </td>
                        <td className=" text-gray-900">
                          {order.customer.name}
                        </td>
                        <td className=" text-gray-900">{order.vendor.name}</td>
                        <td className=" text-gray-900">
                          {order.customer.phone}
                        </td>
                        <td>
                          <div className=" text-gray-900">
                            {order.service.city}
                          </div>
                          <div className="text-sm text-gray-700">
                            {order.service.state}
                          </div>
                        </td>
                        <td>{order.service.title}</td>

                        <td>{order.price}</td>
                        <td>
                          {moment(order.bookingDate).utc().format("YYYY/MM/DD")}
                        </td>
                        <td>
                          {moment(order.createdAt).utc().format("YYYY/MM/DD")}
                        </td>
                        <td>
                          {order.status === "Pending" ? (
                            <span
                              className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-200 text-green-800"
                            >
                              {order.status}
                            </span>
                          ) : (
                            <span
                              className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-rose-200 text-error"
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="px-2 whitespace-nowrap text-sm font-medium">
                          {/* <NavLink
                            to={`/admin/dashboard/orders/edit/${order._id}`}
                            className="mx-2 inline-flex text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-base"
                          >
                            Edit
                          </NavLink> */}
                          <label
                            // onClick={() =>
                            //   handleCancel(order._id, order.status)
                            // }
                            onClick={() => handleCancelId(order._id)}
                            htmlFor="modal-2"
                            className="btn btn-sm text-white bg-rose-600 px-2 text-base"
                          >
                            Cancel
                          </label>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={11}
                        className="py-3 text-2xl mx-auto font-medium text-black"
                      >
                        No Orders to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {orders.length > 0 && (
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
      </div>
    </>
  );
};

export default Orders;
