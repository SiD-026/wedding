import React from "react";
import Featured from "../components/customer/Featured";
import Footer from "../components/customer/Footer";
import LatestPackages from "../components/customer/LatestPackages";
import Navbar from "../components/customer/Navbar";
import { Search } from "../components/customer/Search";
import Teams from "../components/customer/Teams";

const Home = () => {
  return (
    <>
      <div className="bg-background_wedding bg-no-repeat bg-cover bg-center bg-fixed">
        <Navbar />
        <section className="body-font w-2/3 mx-auto">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font text-white sm:text-4xl text-3xl mb-4 font-medium">
                Before It's Too Late
                <br className="hidden lg:inline-block " />
                Book On Your Bridal Services
              </h1>
              <p className="mb-8 leading-relaxed text-white text-2xl">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab
                doloribus corporis laudantium, iusto sunt distinctio molestias
                veritatis dolor voluptate voluptas quo ratione nihil magnam,
                enim repellat. Nesciunt, aspernatur, excepturi ullam voluptatem
                tenetur ducimus qui odio quod vero esse modi voluptate beatae
                quasi delectus, eum est!
              </p>
              <div className="flex justify-center">
                {/* <button className="inline-flex text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                  READ MORE
                </button> */}
                {/* <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                  Button
                </button> */}
              </div>
            </div>
            {/* <div className="lg:max-w-lg lg:w-80 md:w-1/2 w-2/3">
              <Search />
            </div> */}
          </div>
        </section>
        {/* <Featured /> */}
        <LatestPackages />

        <Teams />
        <Footer />
      </div>
    </>
  );
};

export default Home;
