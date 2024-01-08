import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import aboutapi from "../../../../api/aboutapi";
import teamsapi from "../../../../api/teamsapi";
import Toast from "../../../../common/Toast";
import ValidateTeams from "../../../../validations/admin/ValidateTeams";

const EditAbout = () => {
  const [about, setAbout] = useState({
    description: "",
    image: "",
  });

  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getAbout = async () => {
    try {
      const res = await aboutapi.getAboutById(id);
      setAbout(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbout();
  }, [id]);

  console.log(about);
  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // const newErrors = ValidateAbout(about);
    // setErrors(newErrors);
    // if (!Object.keys(newErrors).length) {
    try {
      const formdata = new FormData();
      if (image) {
        formdata.append("image", image);
        formdata.append("description", about.description);
        await aboutapi.updateAboutById(id, formdata);
        navigate("/admin/dashboard/about");
      } else {
        formdata.append("description", about.description);
        await aboutapi.updateAboutById(id, formdata);
        navigate("/admin/dashboard/about");
      }
      Toast.update()
    } catch (error) {
      Toast.error(error);
    }
    // }
  };
  return (
    <>
      <div className="mt-10 sm:mt-0 mb-10">
        <div className="md:col-span-1 px-10 py-7">
          <h2 className="text-3xl font-medium leading-6 text-white">
            Add About Image
          </h2>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 mx-10 w-full">
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAbout;
