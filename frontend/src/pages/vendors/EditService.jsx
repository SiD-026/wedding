import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serviceapi from "../../api/serviceapi";
import vendorapi from "../../api/vendorapi";
import Toast from "../../common/Toast";
import { CustDashboard } from "../../components/customer/CustDashboard";
import Footer from "../../components/customer/Footer";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const EditServices = () => {
  const [service, setService] = useState({
    title: "",
    type: "",
    price: "",
    vendorId: "",
    city: "",
    state: "",
    image: "",
    description: "",
  });

  const [vendors, setVendors] = useState([]);
  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getServiceById = async () => {
    try {
      const res = await serviceapi.getServiceById(id);
      setService(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    vendorapi.getVendorById(user.vendorId).then((res) => setVendors(res.data));
    getServiceById();
  }, []);

  useEffect(() => {
    vendorapi
      .getVendorById(service.vendorId)
      .then((res) => setVendors(res.data));
  }, [service.vendorId]);

  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const newErrors = ValidateService(service);
    // setErrors(newErrors);
    // if (!Object.keys(newErrors).length) {
    try {
      // const vendor = vendors.find((item) => item.name === service.vendorId);
      // console.log(vendor, "");
      // if (vendor) {
      const formdata = new FormData();
      if (image) {
        formdata.append("image", image);
        formdata.append("title", service.title);
        formdata.append("type", service.type);
        formdata.append("price", service.price);
        formdata.append("city", service.city);
        formdata.append("state", service.state);
        formdata.append("description", service.description);
        // service.vendorId = vendor._id;
        formdata.append("vendorId", service.vendorId);
        serviceapi.updateServiceById(id, formdata);
        navigate("/vendors");
      } else {
        formdata.append("title", service.title);
        formdata.append("type", service.type);
        formdata.append("price", service.price);
        formdata.append("city", service.city);
        formdata.append("state", service.state);
        formdata.append("description", service.description);
        // service.vendorId = vendor._id;
        formdata.append("vendorId", service.vendorId);
        serviceapi.updateServiceById(id, formdata);
        navigate("/vendors");
      }
      Toast.update()
      // }
    } catch (error) {
      Toast.error(error);
    }
    // }
  };

  const handleClick = () => {
    navigate("/vendors");
  };

  return (
    <>
      <section className="text-gray-400 bg-gray-200 body-font ">
        <CustDashboard name={vendors.name}/>

        <div className="flex flex-col text-center w-full py-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
            ADD <span className="text-rose-500">SERVICE</span>
          </h1>
        </div>

        <div className="flex flex-col bg-white text-center w-2/4 shadow-lg border rounded-lg  px-10 mx-auto py-10 mb-10">
          <form onSubmit={handleSubmit} className="flex flex-wrap -m-2 ">
            <div className="p-2 w-1/2 hidden">
              <div className="relative">
                <label
                  htmlFor="vendorId"
                  className="block text-lg font-medium text-gray-700"
                >
                  Vendor
                </label>
                <input
                  type="text"
                  id="vendorId"
                  name="vendorId"
                  value={(service.vendorId = user.vendorId)}
                  onChange={handleChange}
                  className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                />
              </div>
            </div>

            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={service.title}
                  onChange={handleChange}
                  className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                />
                <span style={{ color: "red" }}>{errors.title}</span>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="type"
                  className="block text-lg font-medium text-gray-700"
                >
                  Service Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={(service.type = vendors.type)}
                  onChange={handleChange}
                  className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  disabled
                />
                <span style={{ color: "red" }}>{errors.type}</span>
              </div>
            </div>

            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="state"
                  className="block text-lg font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={(service.state = vendors.state)}
                  onChange={handleChange}
                  className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  disabled
                />
                <span style={{ color: "red" }}>{errors.state}</span>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="city"
                  className="block text-lg font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={(service.city = vendors.city)}
                  onChange={handleChange}
                  className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                  disabled
                />
                <span style={{ color: "red" }}>{errors.city}</span>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="file"
                  className="block text-lg font-medium text-gray-700"
                >
                  Photos
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-indigo-600"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="price"
                  className="block text-lg font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={service.price}
                  onChange={handleChange}
                  className="w-full bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                />
                <span style={{ color: "red" }}>{errors.price}</span>
              </div>
            </div>
            <div className="p-2 w-full">
              <label
                for="description"
                className=" block text-lg font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                className="textarea-block textarea bg-opacity-20  bg-gray-100 focus:bg-transparent text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded border border-gray-600 focus:border-indigo-200 text-black"
                placeholder="Enter Description"
                name="description"
                value={service.description}
                onChange={handleChange}
              />
              {/* <span style={{ color: "red" }}>{errors.description}</span> */}
            </div>
            <div className="p-2 w-full flex">
              <button
                type="submit"
                className="btn btn-success flex mx-auto text-lg"
              >
                ADD SERVICE
              </button>
              <button
                onClick={handleClick}
                className="btn btn-secondary flex ml-auto text-lg"
              >
                Back
              </button>
            </div>
          </form>
        </div>
        {/* <div className="lg:w-1/3 md:w-1/3 md:pr-16 lg:pr-0 pr-0 border shadow-lg p-4 bg-white bg-opacity-50 rounded-lg "></div> */}
        {/* </div> */}
        <Footer />
      </section>
    </>
  );
};

export default EditServices;
