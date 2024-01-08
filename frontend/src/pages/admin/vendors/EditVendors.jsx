import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serviceapi from "../../../api/serviceapi";
import Typesapi from "../../../api/Typesapi";
import vendorapi from "../../../api/vendorapi";
import Toast from "../../../common/Toast";
import ValidateVendors from "../../../validations/admin/ValidateEditVendors";

const EditVendors = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    type: "",
  });

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
      location.length !== 0 ? location.find((i) => i.state === data.state) : "";
    setCities(res?.districts);
  }, [data.state, location]);

  useEffect(() => {
    vendorapi.getVendorById(id).then((res) => setData(res.data));
    getAllTypes();
    getAllAddress();
  }, [id]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = ValidateVendors(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        await vendorapi.updateVendorById(id, data);

        navigate("/admin/dashboard/vendors");
        Toast.update();
      } catch (error) {
        Toast.error(error);
      }
    }
  };

  return (
    <>
      <div className="mt-10 sm:mt-0 mb-10">
        <div className="md:col-span-1 px-10 py-7">
          <h2 className="text-3xl font-medium leading-6 text-white">
            Edit Vendors
          </h2>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 mx-10 w-full">
          <div className="overflow-hidden shadow sm:rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-lg font-medium text-gray-700 "
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      id="name"
                      autoComplete="given-name"
                      placeholder="Enter Name"
                      className="input mt-1 w-full font-medium border-gray-300"
                    />
                    <span style={{ color: "red" }}>{errors.name}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      id="email"
                      autoComplete="given-email"
                      placeholder="Enter Email"
                      className="input mt-1 w-full font-medium border-gray-300"
                    />
                    <span style={{ color: "red" }}>{errors.email}</span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      id="phone"
                      autoComplete="given-phone"
                      placeholder="Enter Phone"
                      className="input mt-1 w-full font-medium border-gray-300"
                    />
                    <span style={{ color: "red" }}>{errors.phone}</span>
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
                      value={data.type}
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
                      htmlFor="type"
                      className="block text-lg font-medium text-gray-700"
                    >
                      State
                    </label>
                    <select
                      className="input mt-1 w-full font-medium border-gray-300 block"
                      id="grid-state"
                      name="state"
                      value={data.state}
                      onChange={handleChange}
                    >
                      <option defaultValue>State</option>
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
                      className="input mt-1 w-full font-medium border-gray-300 block"
                      id="grid-city"
                      name="city"
                      value={data.city}
                      onChange={handleChange}
                    >
                      <option defaultValue>City</option>
                      {cities && cities.length > 0 &&
                        cities.map((city) => {
                          return <option key={city}>{city}</option>;
                        })}
                    </select>
                    <span style={{ color: "red" }}>{errors.city}</span>
                  </div>
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
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default EditVendors;
