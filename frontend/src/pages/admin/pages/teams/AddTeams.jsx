import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import teamsapi from "../../../../api/teamsapi";
import Toast from "../../../../common/Toast";
import ValidateTeams from "../../../../validations/admin/ValidateTeams";

const AddTeams = () => {
  const [team, setTeam] = useState({
    name: "",
    designation: "",
    image: "",
  });

  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = ValidateTeams(team);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const formdata = new FormData();
        formdata.append("image", image);
        formdata.append("name", team.name);
        formdata.append("designation", team.designation);
        await teamsapi.addTeam(formdata);
        navigate("/admin/dashboard/teams");
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
            Add Team Member
          </h2>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 mx-10 w-4/6">
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-9 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={team.name}
                      onChange={handleChange}
                      id="name"
                      autoComplete="given-name"
                      placeholder="Enter name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.name}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="designation"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={team.designation}
                      onChange={handleChange}
                      id="designation"
                      autoComplete="given-name"
                      placeholder="Enter designation"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span style={{ color: "red" }}>{errors.designation}</span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="image"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Profile Photo
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleFileChange}
                      className="btn btn-sm text-white mx-1 bg-blue-700 hover:bg-blue-600 text-base"
                    />
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

export default AddTeams;
