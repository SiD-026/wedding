import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typesapi from "../../../api/Typesapi";
import Toast from "../../../common/Toast";
import ValidateServiceTypes from "../../../validations/admin/ValidateServiceTypes";

const AddServiceTypes = () => {
  const [data, setData] = useState({
    type: "",
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = ValidateServiceTypes(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        await Typesapi.addServiceType(data);
        navigate("/admin/dashboard/serviceType");
        Toast.success();
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
            ADD Service Type
          </h2>
        </div>
        <div className=" md:col-span-2 md:mt-0 mx-10 w-full">
          <div className="overflow-hidden shadow sm:rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="type"
                      className="block text-lg font-medium text-gray-700 "
                    >
                      Service Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={data.type}
                      onChange={handleChange}
                      id="type"
                      autoComplete="given-type"
                      placeholder="Enter Service Type"
                      className="input mt-1 w-full font-medium border-gray-300 block"
                    />
                    <span style={{ color: "red" }}>{errors.type}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex sm:px-6">
                <div className="mt-2">
                  {/* {errorsMsg.length > 0 ? (
                  <span style={{ color: "red" }}>{errorsMsg}</span>
                ) : (
                  ""
                )} */}
                </div>
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default AddServiceTypes;
