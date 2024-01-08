import React, { useEffect, useState } from "react";
import customerapi from "../../api/customerapi";
import Navbar from "./Navbar";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);

export const CustDashboard = ({name}) => {
  return (
    <>
      <section className="text-gray-400 bg-background_dashboard bg-no-repeat bg-cover bg-center bg-fixed body-font">
        <Navbar />
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <div className="w-full md:w-full flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              DASHBOARD
            </h1>
            <p className="leading-relaxed font-medium text-white">
              HOME / {name ? name.toUpperCase() : ''}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export const PhotoHome = () => {
  return (
    <>
      <section className="text-gray-400 bg-background_dashboard bg-no-repeat bg-cover bg-center bg-fixed body-font">
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <div className="w-full md:w-full flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              GALLERY
            </h1>
            <p className="leading-relaxed font-medium text-white">
              HOME / GALLERY
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export const ContactHome = () => {
  return (
    <>
      <section className="text-gray-400 bg-background_dashboard bg-no-repeat bg-cover bg-center bg-fixed body-font">
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <div className="w-full md:w-full flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              CONTACT
            </h1>
            <p className="leading-relaxed font-medium text-white">
              HOME / CONTACT
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export const AboutHome = () => {
  return (
    <>
      <section className="text-gray-400 bg-background_dashboard bg-no-repeat bg-cover bg-center bg-fixed body-font">
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <div className="w-full md:w-full flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              ABOUT
            </h1>
            <p className="leading-relaxed font-medium text-white">
              HOME / ABOUT
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export const ReviewsHome = () => {
  return (
    <>
      <section className="text-gray-400 bg-background_dashboard bg-no-repeat bg-cover bg-center bg-fixed body-font">
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <div className="w-full md:w-full flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              REVIEWS
            </h1>
            <p className="leading-relaxed font-medium text-white">
              HOME / REVIEWS
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export const ServicesHome = ({ types }) => {
  return (
    <>
      <section className="text-gray-400 bg-background_dashboard bg-no-repeat bg-cover bg-center bg-fixed body-font">
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <div className="w-full md:w-full flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              SERVICES
            </h1>
            {types === undefined ? (
              <p className="leading-relaxed font-medium text-white">
                HOME / SERVICES
              </p>
            ) : (
              <p className="leading-relaxed font-medium text-white">
                HOME / {types.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
