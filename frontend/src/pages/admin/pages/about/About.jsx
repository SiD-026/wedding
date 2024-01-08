import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import aboutapi from "../../../../api/aboutapi";
import Toast from "../../../../common/Toast";

const About = () => {
  const [about, setAbout] = useState([]);
  const [data, setData] = useState({
    description: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getAbout = async () => {
    await aboutapi.getAllAbouts().then((res) => setAbout(res.data));
  };

  useEffect(() => {
    setLoading(false);
    getAbout();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handleClick = () => {
    navigate("/admin/dashboard/about/add");
  };

  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newErrors = ValidateAbout(about);
    // setErrors(newErrors);
    // if (!Object.keys(newErrors).length) {
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("description", data.description);
      await aboutapi.addAbout(formdata);
      setShowModal(false);
      getAbout();
      Toast.success();
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const handleDelete = async (id) => {
    try {
      await aboutapi.deleteAboutById(id);
      setAbout(about.filter((data) => data._id !== id));
      Toast.deleted();
    } catch (error) {
      Toast.error(error);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="">
          <input className="modal-state" id="modal-3" type="checkbox" />
          <div className="modal">
            <label className="modal-overlay"></label>
            <div className="modal-content flex flex-col gap-5">
              <label
                htmlFor="modal-3"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h2 className="text-2xl mx-auto font-medium text-rose-500">
                Add About Image
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="image"
                        className="block text-lg font-medium text-gray-700"
                      >
                        About Image
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block text-lg font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        value={about.description}
                        onChange={handleChange}
                        id="description"
                        autoComplete="given-name"
                        placeholder="Enter Description"
                        className="textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {/* <span style={{ color: "red" }}>{errors.description}</span> */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container px-5 mx-auto ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex py-2 pt-10 pb-5 px-5">
            <div className="bg-indigo-600 px-2 rounded-lg">
              <h2 className="font-medium text-3xl text-white">About</h2>
            </div>
            {about.length === 0 && (
              <label
                htmlFor="modal-3"
                onClick={() => setShowModal(true)}
                className="btn btn-md ml-auto btn-success"
              >
                ADD
              </label>
            )}
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3">ID</th>
                  <th>About Image</th>
                  <th>Description</th>
                  {/* <th>Created At</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? 
                  <tr>
                    <td
                      colSpan={5}
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
                 : about.length > 0 ? (
                  about.map((about, index) => (
                    <tr className="py-3" key={about._id}>
                      <td className="py-3">
                        <div className="text-lg font-medium text-gray-900">
                          {index + 1}
                        </div>
                      </td>

                      <td className="py-3">
                        <div className="avatar avatar-ring-primary avatar-squared truncate">
                          <img
                            src={`http://${window.location.hostname}:5000/about/${about.image}`}
                            alt="avatar"
                          />
                        </div>
                      </td>
                      <td className="w-1/2">
                        <div className="text-md text-left p-2 text-gray-900 ">
                          {about.description}
                        </div>
                      </td>

                      <td className="text-sm font-medium flex mx-auto w-1/2 pt-12">
                        <NavLink
                          to={`/admin/dashboard/about/edit/${about._id}`}
                          className="mr-3"
                        >
                          <AiFillEdit className="text-3xl text-blue-600 hover:text-blue-500" />
                        </NavLink>
                        <NavLink onClick={() => handleDelete(about._id)}>
                          <MdDelete className="text-3xl text-rose-600 hover:text-rose-500" />
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-3 text-2xl mx-auto font-medium text-black"
                    >
                      No About To Display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
