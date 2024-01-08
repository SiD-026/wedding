import React, { useEffect, useState } from "react";
import teamsapi from "../../api/teamsapi";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  const getAllTeams = async () => {
    try {
      const res = await teamsapi.getAllTeams();
      return setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <>
      <section className=" body-font bg-white">
        <div className="container px-5 pb-20 pt-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              Executive <span className="text-rose-500">TEAMS</span>
            </h1>
            <h2 className="text-xm text-indigo-400 tracking-widest font-medium title-font mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h2>
          </div>
          <div className="flex flex-wrap -m-4 mx-auto w-2/3">
            {teams.length > 0 &&
              teams.map((team) => {
                return (
                  <div key={team._id} className="xl:w-1/4 md:w-1/2 p-4 mx-auto">
                    <div className="bg-gray-200 shadow-md bg-opacity-40 rounded-lg w-full mx-auto">
                      <img
                        className="h-40 w-full object-cover object-center"
                        src={`http://${window.location.hostname}:5000/teams/${team.image}`}
                        alt="avatar"
                      />
                      <div className="text-center p-4">
                        <h3 className="tracking-widest text-gray-800 font-medium title-font  text-sm">
                          {team.name}
                        </h3>
                        <h2 className="text-sm text-gray-800 font-base title-font">
                          {team.designation}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* <div className="xl:w-1/4 md:w-1/2 p-4 mx-auto">
              <div className="bg-gray-200 shadow-md bg-opacity-40 rounded-lg w-full mx-auto">
                <img
                  className="h-40 w-full object-cover object-center"
                  src="https://www.vrsiddhartha.ac.in/me/wp-content/uploads/learn-press-profile/4/172522ec1028ab781d9dfd17eaca4427.jpg"
                  alt="content"
                />
                <div className="text-center p-4">
                  <h3 className="tracking-widest text-gray-800 font-medium title-font  text-sm">
                    Gautam
                  </h3>
                  <h2 className="text-sm text-gray-800 font-base title-font">
                    Manager
                  </h2>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4 mx-auto">
              <div className="bg-gray-200 shadow-md bg-opacity-40 rounded-lg w-full mx-auto">
                <img
                  className="h-40 w-full object-cover object-center"
                  src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                  alt="content"
                />
                <div className="text-center p-4">
                  <h3 className="tracking-widest text-gray-800 font-medium title-font  text-sm">
                    Vamsi
                  </h3>
                  <h2 className="text-sm text-gray-800 font-base title-font">
                    Co-Founder
                  </h2>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4 mx-auto">
              <div className="bg-gray-200 shadow-md bg-opacity-40 rounded-lg w-full mx-left">
                <img
                  className="h-40 w-full object-cover object-center"
                  src="https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg"
                  alt="content"
                />
                <div className="text-center p-4">
                  <h3 className="tracking-widest text-gray-800 font-medium title-font  text-sm">
                    Keertana
                  </h3>
                  <h2 className="text-sm text-gray-800 font-base title-font">
                    Founder
                  </h2>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4 mx-auto">
              <div className="bg-gray-200 shadow-md bg-opacity-40 rounded-lg w-full mx-left">
                <img
                  className="h-40 w-full object-cover object-center"
                  src="http://projects.websetters.in/digg-seos/digg/wp-content/themes/twentytwenty-child-theme/img/demo-prof.jpg"
                  alt="content"
                />
                <div className="text-center p-4">
                  <h3 className="tracking-widest text-gray-800 font-medium title-font  text-sm">
                    Balram
                  </h3>
                  <h2 className="text-sm text-gray-800 font-base title-font">
                    CEO
                  </h2>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Teams;
