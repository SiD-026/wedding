import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import imageapi from "../api/imageapi";
import { PhotoHome } from "../components/customer/CustDashboard";
import Footer from "../components/customer/Footer";
import Navbar from "../components/customer/Navbar";

const Photos = () => {
    const [images, setImages] = useState([]);

  const getAllImages = async () => {
    try {
      const res = await imageapi.getAllImages();
      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
      <Navbar />

      <PhotoHome />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {images.length > 0 &&
              images.map((image) => (
                <a key={image._id} href={image.href} className="group">
                  <div className="relative lg:h-72 min-h-64  w-full overflow-hidden rounded-md bg-gray-200 group-hover:bottom-5">
                    <img
                      src={`http://${window.location.hostname}:5000/images/${image.image}`}
                      alt="avatar"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    <h2 className="absolute text-xl font-medium text-rose-500 bottom-0 text-center -translate-x bg-black  w-full">
                      {image.type}
                    </h2>
                  </div>
                  {/* <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {image.price}
                </p> */}
                </a>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Photos;
