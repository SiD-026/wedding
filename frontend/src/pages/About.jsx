import React, { useEffect, useState } from "react";
import aboutapi from "../api/aboutapi";
import { AboutHome } from "../components/customer/CustDashboard";
import Footer from "../components/customer/Footer";
import Navbar from "../components/customer/Navbar";
import Teams from "../components/customer/Teams";

const About = () => {
  const [about, setAbout] = useState([]);

  const getAbout = async () => {
    aboutapi.getAllAbouts().then((res) => setAbout(res.data));
  };

  useEffect(() => {
    getAbout();
  }, []);
  return (
    <>
      <Navbar />
      <AboutHome />
      <section className="text-black bg-gray-100 body-font">
        <div className="container mx-auto flex px-5 pt-20 p-10 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 ">
            {about.length > 0 &&
              about.map((about) => {
                return (
                  <img
                    key={about._id}
                    className="lg:w-2/3 md:w-1/2 mb-10 ml-auto object-cover object-center rounded"
                    alt="About Wedding Photos"
                    // src="/assets/beautiful-bride-groom-having-beach-wedding_23-2149043972 (1).webp"
                    src={`http://${window.location.hostname}:5000/about/${about.image}`}
                  />
                );
              })}
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            {about.length > 0 && (
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-black mb-3">
                {/* WELCOME To <span className="text-rose-500">MakeMyShaadi</span> */}
                WELCOME To <span className="text-rose-500">Bridal Services</span>

              </h1>
            )}
            {about.length > 0 &&
              about.map((about) => {
                return (
                  <p key={about._id} className="mb-8 leading-relaxed w-3/4">
                    {about.description}
                  </p>
                );
              })}

            {about.length === 0 && (
              <p className="mb-8 leading-relaxed sm:text-3xl text-2xl font-medium title-font text-black">
                No About To Display
              </p>
            )}
          </div>
        </div>
      </section>
      <Teams />
      <Footer />
    </>
  );
};

export default About;
