import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serviceapi from "../../../api/serviceapi";
import Typesapi from "../../../api/Typesapi";
import vendorapi from "../../../api/vendorapi";
import Toast from "../../../common/Toast";

import ValidateService from "../../../validations/admin/ValidateService";

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
  const [types, setTypes] = useState([]);

  const [location, setLocation] = useState([]);
  const [cities, setCities] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const getAllTypes = async () => {
    try {
      const res = await Typesapi.getAllServiceType();
      return setTypes(res.data);
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
    const res =
      location.length !== 0
        ? location.find((i) => i.state === service.state)
        : "";
    setCities(res?.districts);
  }, [service.state, location]);

  const getServiceById = async () => {
    try {
      const res = await serviceapi.getServiceById(id);
      setService(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServiceById();

    // vendorapi.getAllVendors().then((res) => setVendors(res.data));
    getAllAddress();
    getAllTypes()
  }, []);

  useEffect(() => {
    vendorapi
      .getVendorById(service.vendorId)
      .then((res) => setVendors(res.data));
  }, [service.vendorId]);

  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  // console.log(vendors, "vendors");
  // console.log(service.vendorId, "service");
  // const vendor = vendors.find((item) => item._id === service.vendorId);
  // vendors.length > 0 ?  console.log(vendors.find((item) => item._id === service.vendorId).name,"gkg") : console.log("no")
  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = ValidateService(service);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
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
        navigate("/admin/dashboard/services");
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
        navigate("/admin/dashboard/services");
      }
      Toast.update();
      // }
    } catch (error) {
      Toast.error(error);
    }
    }
  };

  return (
    <>
      <div className="mt-10 sm:mt-0 mb-10">
        {/* <div className="md:grid md:grid-cols-3 md:gap-6"> */}
        <div className="md:col-span-1 px-10 py-7">
          <h2 className="text-3xl font-medium leading-6 text-white">
            Update Services
          </h2>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 mx-10 w-full">
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-9 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={service.title}
                      onChange={handleChange}
                      id="title"
                      autoComplete="given-name"
                      placeholder="Enter Title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.title}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="type"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Service Type
                    </label>
                    <select
                      className="input mt-1 w-full font-medium border-gray-300 block"
                      id="grid-state"
                      name="type"
                      value={service.type}
                      onChange={handleChange}
                    >
                      <option defaultValue>Service Types</option>
                      {types.length > 0 &&
                        types.map((type) => {
                          return <option key={type._id}>{type.type}</option>;
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.type}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="vendorId"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Vendor ID/ Name
                    </label>
                    {/* <select
                      id="vendorId"
                      name="vendorId"
                      value={service.vendorId}
                      onChange={handleChange}
                      autoComplete="vendorId"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Vendors</option>

                      {vendors &&
                        vendors.map((vendor) => {
                          return (
                            <option key={vendor._id}>{vendor.name}</option>
                          );
                        })}
                    </select> */}

                    <input
                      disabled
                      type="text"
                      name="vendorId"
                      value={vendors && vendors.name}
                      onChange={handleChange}
                      id="vendor"
                      autoComplete="given-name"
                      placeholder="Enter Vendor"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.vendorId}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="state"
                      className="block text-lg font-medium text-gray-700"
                    >
                      State
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      id="grid-state"
                      name="state"
                      value={service.state}
                      onChange={handleChange}
                    >
                      <option>Select State</option>
                      {location.length > 0 &&
                        location.map((state) => {
                          return <option key={state._id}>{state.state}</option>;
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.state}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-lg font-medium text-gray-700"
                    >
                      City
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      id="grid-city"
                      name="city"
                      value={service.city}
                      onChange={handleChange}
                    >
                      <option>Select City</option>
                      {cities &&
                        cities.length > 0 &&
                        cities.map((city) => {
                          return <option key={city}>{city}</option>;
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.city}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={service.price}
                      onChange={handleChange}
                      id="price"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.price}</span>
                  </div>

                  {/* <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div> */}

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="image"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Service Photo
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* <div className="col-span-6 sm:col-span-3"></div> */}

                  <div className="col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Description"
                      autoComplete="family-name"
                      value={service.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* <div className="col-span-6 ">
                    <label
                      htmlFor="othersdetails"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Others Details
                    </label>
                    <textarea
                      type="text"
                      name="othersdetails"
                      id="othersdetails"
                      autoComplete="address-level2"
                      placeholder="Other Details"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div> */}

                  {/* <div className="col-span-6 ">
                    <label
                      htmlFor="othersdetails"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Others Details
                    </label>
                    <textarea
                      type="text"
                      name="othersdetails"
                      id="othersdetails"
                      autoComplete="address-level2"
                      placeholder="Other Details"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div> */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default EditServices;
