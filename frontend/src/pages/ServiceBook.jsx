import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderapi from "../api/orderapi";
import { toast } from "react-toastify";
import Toast from "../common/Toast";
import billapi from "../api/billapi";
import ValidateBook from "../validations/admin/ValidateBook";
import {BsEmojiSmile } from "react-icons/bs";

const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const ServiceBook = ({ socket, setShowModal, service, vendor, customer }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [orders, setOrders] = useState({
    vendorId: "",
    customerId: "",
    serviceId: id,
    bookingDate: "",
    details: [],
    price: 0,

    cardName: "",
    cardNo: "",
    expiryDate: "",
    cvv: "",
  });

  const [bill, setBill] = useState({
    customerName: customer.name,
    customerId: user.customerId,
    amount: service.price,
    paymentStatus: "paid",
    paymentMethod: "card",
    serviceName: service.title,
  });

  const [errors, setErrors] = useState();
  const [bookingErrors, setBookingErrors] = useState();
  const [payment, setPayment] = useState(false);
  // const paymentMethod = ["card", "upi"];
  const [openTab, setOpenTab] = useState(1);
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setOrders({
      ...orders,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orders.bookingDate !== "") {
          try {
            const data = [customer.email, customer.phone];
            setOrders({
              ...orders,
              vendorId: service.vendorId,
              customerId: user.customerId,
              details: data,
              price: service.price,
            });
            await orderapi.addOrder(orders);

            setBill({
              ...bill,
              customerName: customer.name,
              customerId: user.customerId,
              amount: service.price,
              // paymentMethod: ,
              serviceName: service.title,
            });
            await billapi.addBill(bill);

            toast.success("Booked Successfully", {
              autoClose: 3000,
            });
            setVisible(true);

            socket.emit("book_message", {
              message: `Customer Booked Service ${service.title}`,
              vendorId: service.vendorId,
            });
          } catch (error) {
            setVisible(false);
            setShowModal(true);
            Toast.error(error);
          }

    } else {
      setVisible(false);
      setShowModal(true);
      setErrors("Booking Date is needed");
      toast.error("Booking Date is needed", {
        autoClose: 3000,
      });
    }
  };

  const handlePayment = () => {
    setPayment(true);
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };



  return (
    <>
      <div className="container">
        <input className="modal-state" id="modal1" type="checkbox" />
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal1"></label>
          {visible === false ? (
            <div className="modal-content flex flex-col gap-5">
              <label className="modal-close " htmlFor="modal1"></label>
              <h2 className="text-xl text-rose-600 font-bold border-b border-rose-600">
                Book Now
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="px-2">
                  <span className="font-medium">Personal Information</span>
                </div>
                <div className="flex flex-wrap ">
                  <input
                    type="text"
                    name="vendorId"
                    value={(orders.vendorId = service.vendorId)}
                    hidden
                  />
                  <input
                    type="text"
                    name="customerId"
                    value={(orders.customerId = user.customerId)}
                    hidden
                  />
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customer.name}
                      placeholder="Customer Name"
                      className="input input-sm bg-rose-100 border-rose-400 text-lg font-medium "
                      disabled
                    />
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="vendorname"
                      name="vendorname"
                      value={vendor.name}
                      placeholder="Vendor Name"
                      className="input input-sm bg-rose-100 border-rose-400 text-black text-lg font-medium "
                      disabled
                    />
                  </div>
                  <div className="px-2 py-1 w-full">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={service.title}
                      className="input input-sm bg-rose-100 border-rose-400 text-black text-lg font-medium w-full"
                      disabled
                    />
                  </div>
                </div>

                <div className="px-2 mt-2">
                  <span className="font-medium">Booking Information</span>
                </div>

                <div className="flex flex-wrap ">
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="date"
                      id="bookingDate"
                      name="bookingDate"
                      onChange={handleChange}
                      placeholder="Booking Date"
                      min={disablePastDate()}
                      className="input input-sm input-primary"
                    />
                    {errors && <span style={{ color: "red" }}>{errors}</span>}
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={(orders.price = `${service.price}`)}
                      placeholder="Amount"
                      className="input input-sm input-primary bg-blue-100 text-lg font-medium"
                      disabled
                    />
                  </div>
                </div>

                <div className="px-2 mt-2 flex flex-wrap">
                  <div className="px-2 py-1 w-1/2">
                    <span className="font-medium">Contacts by email at</span>
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <span className="ml-auto font-medium">or by phone at</span>
                  </div>
                </div>

                <div className="flex flex-wrap ">
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="email"
                      id="email"
                      name="details"
                      value={customer.email}
                      onChange={handleChange}
                      placeholder="Customer Email"
                      className="input input-sm input-primary"
                    />
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="phone"
                      name="details"
                      value={customer.phone}
                      onChange={handleChange}
                      placeholder="Customer Phone"
                      className="input input-sm input-primary"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    type="submit"
                    className="btn bg-rose-500 text-white text-xl btn-block"
                  >
                    Book Now
                  </button>
                </div>

                {/* <div className="my-5 w-full mx-auto text-center">
                  <button
                    onClick={handlePayment}
                    className="btn btn-outline-success font-bold text-3xl mx-auto "
                  >
                    PAYMENTS
                  </button>
                </div>

              */}
              </form>
            </div>
          ) : (
            <div>
              <label className="modal-overlay" htmlFor="modal-1"></label>
              <div className="modal-content flex flex-col gap-5">
                <div className="px-2 py-1 ">
                  <h1 className="text-5xl text-success font-bold">Thank You</h1>
                </div>
                <BsEmojiSmile className="h-6 w-6 text-rose-600 mx-auto" aria-hidden="true" />
                <p className="text-pink-600 mx-auto">Vendor Will Contact You Soon...</p>
                <div className="flex gap-3">
                  <button
                    className="btn btn-secondary mx-auto "
                    onClick={() => navigate("/customerDashboard")}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceBook;
