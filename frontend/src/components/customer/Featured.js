import {
  BellIcon,
  CurrencyRupeeIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Featured = () => {
  const products = [
    {
      id: 1,
      name: "Delhi Designers",
      href: "/service/1",
      imageSrc:
        "https://www.findbanquet.com/blog/wp-content/uploads/2021/08/Destination-wedding-In-Jim-Corbett.jpg",
      imageAlt: "Wedding Designers.",
      price: "100000",
      location: "Delhi",
    },
    {
      id: 2,
      name: "Dubai Photography",
      href: "/service/2",
      imageSrc:
        "https://images.news18.com/ibnlive/uploads/2022/04/278500632_382425243893279_2392468163892208492_n-16499941003x2.jpg",
      imageAlt: "Dubai Photography",
      price: "70000",
      location: "Dubai",
    },
    {
      id: 3,
      name: "Shaadi Mandappa",
      href: "/service/3",
      imageSrc:
        "http://weddingbanquets.in/blog/wp-content/uploads/2022/04/wedding-stage-6-1.jpg",
      imageAlt: "Shaadi Mandappa",
      price: "250000",
      location: "Hyderabad",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-5 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-black">
              FEATURED <span className='text-rose-600'>SERVICES</span>
            </h1>
            <h2 className="text-xm text-indigo-400 tracking-widest font-medium title-font mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10 justify-evenly">
            {products.map((product) => (
              <div key={product.id} className="group relative shadow-md rounded-md pb-2">
                {/* <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"> */}
                  {/* <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  /> */}
                {/* </div> */}

                <div className="relative lg:h-80 min-h-80  w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">

                {/* <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"> */}
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                  {/* <h1 className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    KindaCode.com
                  </h1>
                  <h2 className="absolute text-3xl text-amber-400 bottom-4 left-1/2 -translate-x-1/2">
                    Bottom Center
                  </h2>
                  <h3 className="absolute text-2xl text-blue-300 top-5 left-5">
                    Top Left
                  </h3> */}
                  <p className="absolute text-2xl text-white bottom-5 right-5 flex">
                    <CurrencyRupeeIcon className="h-6 w-6 mt-1" aria-hidden="true" />
                    <div>{product.price}</div>
                  </p>
                 </div>
                <div className="mt-4 flex justify-between mx-2">
                  <div>
                    <h3 className="text-gray-700 text-2xl leading-tight">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex">
                      <MapPinIcon className="h-6 w-6 mx-1 mt-1" aria-hidden="true" />

                      <div className="text-2xl leading-tight">{product.location}</div>
                    </p>
                  </div>
                  {/* <p className="text-sm font-medium text-gray-900 flex">
                    <CurrencyRupeeIcon className="h-6 w-6" aria-hidden="true" />
                    <div className="mt-1">{product.price}</div>
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
