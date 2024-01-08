import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminapi from "../../../../api/adminapi";
import imageapi from "../../../../api/imageapi";
import Typesapi from "../../../../api/Typesapi";
import Toast from "../../../../common/Toast";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

const Images = () => {
  // const [date, setDate] = useState([]);
  const [data, setData] = useState({
    type: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [types, setTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [images, setImages] = useState([]);

  const getTypes = async () => {
    try {
      const res = await Typesapi.getAllServiceType();
      setTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllImages = async () => {
    try {
      const res = await imageapi.getAllImages();
      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTypes();
    getAllImages();
  }, []);

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
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("type", data.type);
      await imageapi.addImage(formdata);
      setShowModal(false);
      setData({
        type: "",
      });
      getAllImages();
      Toast.success();
    } catch (error) {
      console.log(error);
    }
    // }
  };
  const handleDelete = async (id) => {
    try {
      await imageapi.deleteImageById(id);
      setData(data.filter((data) => data._id !== id));
      Toast.deleted();
    } catch (error) {
      Toast.error(error);
    }
  };

  return (
    <>
      {showModal ? (
        <div>
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
              <h2 className="text-xl">Add Images</h2>
              <form onSubmit={handleSubmit} className="flex flex-wrap -m-2 ">
                <div className="p-2 pb-5 w-1/2">
                  {/* <div className="relative"> */}
                  <label htmlFor="type" className="text-xl px-2 text-gray-700">
                    Types
                  </label>
                  <select
                    name="type"
                    value={data.type}
                    onChange={handleChange}
                    className="select select-primary py-2 mt-2"
                  >
                    <option defaultValue>Service Type</option>
                    {types.length > 0 &&
                      types.map((type) => {
                        return <option key={type._id}>{type.type}</option>;
                      })}
                  </select>
                  {/* <span style={{ color: "red" }}>{errors.type}</span> */}
                  {/* </div> */}
                </div>
                <div className="p-2 w-1/2">
                  <label htmlFor="image" className="text-xl px-2 text-gray-800">
                    Image
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                    className="input sm:text-sm py-2 mt-2"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn btn-success btn-block">
                    Submit
                  </button>
                  <label className="btn btn-block" htmlFor="modal-3">
                    Cancel
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <section className="text-gray-400  body-font">
        <div className="container px-5 py-7 items-center">
          <div className="flex py-2 pb-10 px-5">
            <div className="bg-indigo-600 px-2 rounded-lg mx-auto">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-white bg-indigo-600 px-4 py-1 rounded-lg">
                GALLERY
              </h1>
            </div>
            <label
              className="btn btn-md mr-auto btn-success"
              onClick={() => setShowModal(true)}
              htmlFor="modal-3"
            >
              ADD
            </label>
          </div>
          <div className="bg-white  rounded-lg shadow-md p-5">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {images.length > 0 ? (
                images.map((image) => (
                  <div
                    key={image._id}
                    className="relative lg:h-60 min-h-64 w-full overflow-hidden rounded-md bg-gray-200 group-hover:bottom-5"
                  >
                    <img
                      src={`http://${window.location.hostname}:5000/images/${image.image}`}
                      alt="avatar"
                      className="h-full w-full object-cover object-center group-hover:bottom-5"
                    />
                    <h2 className="absolute text-xl font-medium text-rose-500 bottom-0 text-center -translate-x bg-black  w-full">
                      {image.type}
                    </h2>
                  </div>
                ))
              ) : (
                <div>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Images;
