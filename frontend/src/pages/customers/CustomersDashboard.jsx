import moment from "moment/moment";
import { useEffect, useState } from "react";
import customerapi from "../../api/customerapi";
import orderapi from "../../api/orderapi";
import serviceapi from "../../api/serviceapi";
import vendorapi from "../../api/vendorapi";
import Pagination from "../../common/Pagination";
import { CustDashboard } from "../../components/customer/CustDashboard";
import Footer from "../../components/customer/Footer";
import { toast } from "react-toastify";
import Toast from "../../common/Toast";
import ValidateBook from "../../validations/admin/ValidateBook";
import billapi from "../../api/billapi";

const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const CustomersDashboard = ({ socket }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const [name, setName] = useState("");
  const [serviceId, setServiceId] = useState();
  const [display, setDisplay] = useState();
  const [cutPrice, setPrice] = useState();
  const [loading, setLoading] = useState(false);

  const [payment, setPayment] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [bookingErrors, setBookingErrors] = useState();

  const [data, setData] = useState({
    cardName: "",
    cardNo: "",
    expiryDate: "",
    cvv: "",
  });

  const [bill, setBill] = useState({
    customerName: name.name,
    customerId: user.customerId,
    amount: "",
    paymentStatus: "paid",
    paymentMethod: "card",
    serviceName: "",
  });

  const [serviceTitle, setServiceTitle] = useState([]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const getName = async () => {
    try {
      const res = await customerapi.getCustomerById(user.customerId);
      return setName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getName();
  }, [user.customerId]);

  const orderDetails = async () => {
    try {
      const res = await orderapi.searchOrders({ customerId: user.customerId });
      for (let i of res.data) {
        const vendorDetails = await vendorapi.getVendorById(i.vendorId);
        const serviceDetails = await serviceapi.getServiceById(i.serviceId);
        const customerDetails = await customerapi.getCustomerById(i.customerId);

        i.vendor = vendorDetails.data;
        i.service = serviceDetails.data;
        i.customer = customerDetails.data;
      }
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    orderDetails();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const page = orders.length || orders;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(orders.length / recordsPerPage);

  const handleCancelId = (id, bookingDate, price) => {
    setServiceId(id);
    setPayment(true);
    var date1 = new Date();
    var date2 = new Date(bookingDate);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //To display the final no. of days (result)
    const no_of_days = Math.floor(Difference_In_Days);
    if (no_of_days > 1) {
      setDisplay(2);
    } else {
      setDisplay(3);
      setPrice(price);
    }
  };

  const handleCancel = async () => {
    try {
      const res = await orderapi.updateOrderById(serviceId, {
        status: "Cancelled",
        price: 0,
      });
      orderDetails();
      toast.success("Order Cancelled", {
        autoClose: 3000,
      });
      setPayment(false);
      socket.emit("cancel_message", {
        message: `Customer Cancelled Order`,
        vendorId: res.data.vendorId,
      });
    } catch (error) {
      Toast.error(error);
    }
  };

  const handleCancelIn24Hrs = async () => {
    try {
      const price = (cutPrice * 40) / 100;
      const res = await orderapi.updateOrderById(serviceId, {
        status: "Cancelled",
        price: price,
      });

      orderDetails();
      toast.success("Order Cancelled", {
        autoClose: 3000,
      });
      setPayment(false);

      socket.emit("cancel_message", {
        message: `Customer Cancelled Order`,
        vendorId: res.data.vendorId,
      });
    } catch (error) {
      Toast.error(error);
    }
  };

  let total = 0;
  for (let i of orders) {
    total = total + i.price;
  }

  const handlePayment = (order) => {
    setDisplay(1);
    setServiceTitle(order);
    setPayment(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (openTab === 1) {
      const newErrors = ValidateBook(data);
      setBookingErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        try {
          setBill({
            ...bill,
            customerName: name.name,
            customerId: user.customerId,
            amount: orders.price,
            // paymentMethod: ,
            serviceName: serviceTitle,
          });
          await billapi.addBill(bill);
          await orderapi.updateOrderById(serviceTitle._id, {
            paymentStatus: "paid",
          });
          orderDetails();

          setPayment(false);

          toast.success("Payment Completed Successfully", {
            autoClose: 3000,
          });

          socket.emit("payment_message", {
            message: `Customer Paid for Service ${serviceTitle.service.title} Successfully`,
            vendorId: serviceTitle.vendorId,
          });
        } catch (error) {
          Toast.error(error);
        }
      }
    } else {
      try {
        setBill({
          ...bill,
          customerName: name.name,
          customerId: user.customerId,
          amount: orders.price,
          // paymentMethod: ,
          serviceName: serviceTitle,
        });
        await billapi.addBill(bill);
        await orderapi.updateOrderById(serviceTitle._id, {
          paymentStatus: "paid",
        });

        setPayment(false);
        orderDetails();

        toast.success("Payment Completed Successfully", {
          autoClose: 3000,
        });

        socket.emit("payment_message", {
          message: `Customer Paid for Service ${serviceTitle.service.title} Successfully`,
          vendorId: serviceTitle.vendorId,
        });
      } catch (error) {
        Toast.error(error);
        console.log(error);
      }
    }
  };

  const disablePastMonth = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm;
  };

  return (
    <>
      <input className="modal-state" id="modal-2" type="checkbox" />
      {payment ? (
        display === 1 ? (
          <div className="modal w-screen">
            <label className="modal-overlay" htmlFor="modal-2"></label>
            <div className="modal-content flex flex-col gap-5 max-w-3xl">
              <label
                htmlFor="modal-2"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h2 className="text-xl">Payment</h2>
              <form onSubmit={handleSubmit}>
                <div className="px-2 py-1 w-1/2">
                  <input
                    type="text"
                    name="customerName"
                    value={(bill.customerName = serviceTitle.customer.name)}
                    hidden
                  />
                </div>

                <div className="px-2 py-1 w-1/2">
                  <input
                    type="text"
                    name="customerId"
                    value={(bill.customerId = user.customerId)}
                    hidden
                  />
                </div>

                <div className="px-2 py-1 w-1/2">
                  <input
                    type="text"
                    name="amount"
                    value={(bill.amount = serviceTitle.price)}
                    hidden
                  />
                </div>
                <div className="px-2 py-1 w-1/2">
                  <input
                    type="text"
                    name="serviceName"
                    value={(bill.serviceName = serviceTitle.service.title)}
                    hidden
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                              ? "text-white bg-rose-600"
                              : "text-rose-600 bg-white")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(2);
                            setBill({
                              paymentMethod: "cash",
                              paymentStatus: "paid",
                            });
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          CASH
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                              ? "text-white bg-rose-600"
                              : "text-rose-600 bg-white")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(1);
                            setBill({
                              paymentMethod: "card",
                              paymentStatus: "paid",
                            });
                          }}
                          data-toggle="tab"
                          href="#link2"
                          role="tablist"
                        >
                          CARD
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 3
                              ? "text-white bg-rose-600"
                              : "text-rose-600 bg-white")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(3);
                            setBill({
                              paymentMethod: "upi",
                              paymentStatus: "paid",
                            });
                          }}
                          data-toggle="tab"
                          href="#link3"
                          role="tablist"
                        >
                          UPI
                        </a>
                      </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                          <div
                            className={openTab === 1 ? "block" : "hidden"}
                            id="link1"
                          >
                            <div className="px-2 py-1 w-full">
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                placeholder="Name of Card"
                                value={data.cardName}
                                onChange={handleChange}
                                className="block text-xl input input-md border-slate-500 focus:border-none"
                              />
                              {bookingErrors && (
                                <span style={{ color: "red" }}>
                                  {bookingErrors.cardName}
                                </span>
                              )}
                            </div>
                            <div className="px-2 py-1 w-full">
                              <input
                                type="text"
                                id="cardNo"
                                name="cardNo"
                                placeholder="0000-0000-0000-0000"
                                value={data.cardNo}
                                onChange={handleChange}
                                className="block input input-md border-slate-500 focus:border-none"
                              />
                              {bookingErrors && (
                                <span style={{ color: "red" }}>
                                  {bookingErrors.cardNo}
                                </span>
                              )}
                            </div>

                            <div className="px-2 mt-2 flex flex-wrap">
                              <div className="px-2 py-1 w-1/2">
                                <span className="font-medium">Expiry Date</span>
                              </div>
                              <div className="px-2 py-1 w-1/2">
                                <span className="ml-auto font-medium">CVV</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap ">
                              <div className="px-2 py-1 w-1/2">
                                <input
                                  type="month"
                                  min={disablePastMonth()}
                                  id="expiryDate"
                                  name="expiryDate"
                                  value={data.expiryDate}
                                  onChange={handleChange}
                                  className="input input-sm border-slate-500 focus:border-none"
                                />
                                {bookingErrors && (
                                  <span style={{ color: "red" }}>
                                    {bookingErrors.expiryDate}
                                  </span>
                                )}
                              </div>
                              <div className="px-2 py-1 w-1/2">
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  value={data.cvv}
                                  onChange={handleChange}
                                  placeholder="xxx"
                                  className="input input-sm border-slate-500 focus:border-none"
                                />
                                {bookingErrors && (
                                  <span style={{ color: "red" }}>
                                    {bookingErrors.cvv}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-3 mt-3">
                              <button
                                type="submit"
                                className="btn bg-rose-500 text-white text-xl btn-block"
                              >
                                Make Payment
                              </button>
                            </div>
                          </div>
                          <div
                            className={openTab === 2 ? "block" : "hidden"}
                            id="link2"
                          >
                            <div className="flex gap-3 mt-3">
                              <button
                                type="submit"
                                className="btn bg-rose-500 text-white text-xl btn-block"
                              >
                                Make Payment
                              </button>
                            </div>
                          </div>
                          <div
                            className={openTab === 3 ? "block" : "hidden"}
                            id="link3"
                          >
                            <div className="px-2 py-1 w-full flex">
                              <input
                                type="checkbox"
                                className="checkbox-primary checkbox mr-3 mt-1"
                                defaultChecked
                              />
                              <h3 className="text-xl ">UPI ID</h3>
                            </div>
                            <div className="flex gap-3 mt-3">
                              <button
                                // htmlFor="modal-2"
                                type="submit"
                                className="btn bg-rose-500 text-white text-xl btn-block"
                              >
                                Make Payment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : display === 2 ? (
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
        ) : display === 3 ? (
          <div className="modal w-screen">
            <label className="modal-overlay" htmlFor="modal-2"></label>
            <div className="modal-content flex flex-col gap-5 max-w-3xl">
              <label
                htmlFor="modal-2"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h2 className="text-2xl">Order Cancellation Remark</h2>
              <h3 className="text-xl">
                As You Are Cancelling The Order within{" "}
                <span className="text-rose-600 font-medium">24 hrs</span> It
                Will cut <span className="text-rose-600 font-medium">40 %</span>{" "}
                of the Price
              </h3>
              <span className="mx-auto">
                Are You really want to Cancel the Order?
              </span>
              <div className="flex gap-3">
                <label
                  className="btn bg-rose-600 text-white mx-auto text-lg"
                  htmlFor="modal-2"
                  onClick={handleCancelIn24Hrs}
                >
                  Cancel Order
                </label>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
      <section className="text-gray-400 bg-gray-100 body-font">
        <CustDashboard name={name} />
        <div className="container px-5 pt-16 pb-14 mx-auto ">
          <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex pb-3 px-50">
              <button className="btn btn-md ml-auto btn-success text-2xl">
                Total : {total}
              </button>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-300 text-center">
                  <tr>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      sr
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Service Name
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Vendor
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Booking Date
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Event Date
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Payment
                    </th>
                    <th
                      scope="col"
                      className="relative px-1 py-4  text- font-medium text-gray-700 uppercase tracking-wider"
                    >
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300 text-center font-medium">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-3 text-2xl mx-auto font-medium text-black skeleton-pulse h-24"
                      >
                        {/* <button
                          disabled
                          type="button"
                          className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                        > */}
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
                        {/* </button> */}
                      </td>
                    </tr>
                  ) : orders.length > 0 ? (
                    currentRecords.map((order, index) => (
                      <tr key={order._id}>
                        <td className="px-1 py-4 whitespace-nowrap">
                          {/* <div className="flex items-center"> */}
                          {/* <div className="flex-shrink-0 h-10 w-10"> */}
                          {/* <img
                              className="h-10 w-10 rounded-full"
                              src={order.image}
                              alt=""
                            /> */}

                          <div className=" text-gray-900">
                            {(currentPage - 1) * recordsPerPage + index + 1}
                          </div>
                        </td>
                        <td>
                          <div className=" text-gray-900">
                            {order.service.title}
                          </div>
                          {/* </div> */}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.vendor.name}
                          </div>
                        </td>

                        <td>
                          <div className="text-sm text-gray-700">
                            <div className=" text-gray-900">
                              {order.service.city}
                            </div>
                            <div className="text-sm text-gray-700">
                              {order.service.state}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-sm text-gray-700 text-center">
                            {order.price}
                          </div>
                        </td>
                        <td className="text-sm text-gray-700 text-center">
                          {moment(order.bookingDate).utc().format("YYYY/MM/DD")}
                        </td>
                        <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-700">
                          {moment(order.createdAt).utc().format("YYYY/MM/DD")}
                        </td>
                        <td className=" whitespace-nowrap">
                          {order.status === "Pending" ? (
                            <span
                              className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-yellow-200 text-warning"
                            >
                              {order.status}
                            </span>
                          ) : order.status === "Selected" ? (
                            <span
                              className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-200 text-success"
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

                        {order.paymentStatus === "unpaid" ? (
                          <td>
                            {order.status === "Selected" && (
                              <label
                                htmlFor="modal-2"
                                onClick={() => handlePayment(order)}
                                className="btn btn-sm text-white bg-violet-600 text-center"
                              >
                                Payment
                              </label>
                              //   ):(
                              //   <label
                              //   htmlFor="modal-2"
                              //   className="btn btn-sm text-white bg-warning text-center"
                              // >
                              //   Pending
                              // </label>
                            )}
                          </td>
                        ) : (
                          <td>
                            <div className="text-black text-center">Paid</div>
                          </td>
                        )}

                        <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {order.status !== "Cancelled" && (
                            <label
                              onClick={() =>
                                handleCancelId(
                                  order._id,
                                  order.bookingDate,
                                  order.price
                                )
                              }
                              htmlFor="modal-2"
                              className="btn btn-sm text-white bg-rose-500 border-0 py-1 px-2 focus:outline-none hover:bg-error text-base"
                            >
                              Cancel
                            </label>
                          )}
                          {/* <button className="inline-flex text-white bg-gray-400 border-0 py-1 px-2 focus:outline-none hover:bg-gray-800 rounded text-base">
                          Cancel
                        </button> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-3 text-2xl mx-auto font-medium text-black skeleton-pulse h-24"
                      >
                        No Orders To Display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
        <Footer />
      </section>
    </>
  );
};

export default CustomersDashboard;
