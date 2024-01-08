import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import {
  BanknotesIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  PhoneIcon,
  PhotoIcon,
  QueueListIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { MdOutlineMiscellaneousServices, MdOutlineReviews } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Vendors",
      to: "/admin/dashboard/vendors",
      icon: <UserGroupIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Users",
      to: "/admin/dashboard/users",
      icon: <UsersIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    
    {
      title: "Services",
      to: "/admin/dashboard/services",
      icon: <MdOutlineMiscellaneousServices className="h-6 w-6 mt-1" aria-hidden="true" />,
      gap: true,
    },
    {
      title: "Service Type",
      to: "/admin/dashboard/serviceType",
      icon: <ListBulletIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Orders",
      to: "/admin/dashboard/orders",
      icon: <QueueListIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Bills",
      to: "/admin/dashboard/bills",
      icon: <BanknotesIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Pages",
      // to:'/admin/dashboard/',
      // icon: <UserGroupIcon className="h-6 w-6 mt-1" aria-hidden="false" />,
      gap: true,
    },
    {
      title: "About images",
      to: "/admin/dashboard/about",
      icon: <PhotoIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Contacts",
      to: "/admin/dashboard/contacts",
      icon: <PhoneIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Images",
      to: "/admin/dashboard/images",
      icon: <PhotoIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Reviews",
      to: "/admin/dashboard/reviews",
      icon: <MdOutlineReviews className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Teams",
      to: "/admin/dashboard/teams",
      icon: <RiTeamLine className="h-6 w-6 mt-1" aria-hidden="true" />,
    },
    {
      title: "Setting",
      to: "/admin/dashboard/profile",
      icon: <Cog6ToothIcon className="h-6 w-6 mt-1" aria-hidden="true" />,
      gap: true,
    },
  ];

  return (
    <>
      {/* <div className="flex bg-gray-600"> */}
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } bg-gray-900 h-screen p-5  pt- relative duration-300 `}
      >
        <ArrowLeftIcon
          aria-hidden="true"
          className={`h-7 absolute cursor-pointer -right-0 top-9 w-7 border-white text-white
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/wedding_icon.png"
            className={`cursor-pointer duration-500 w-10 ${
              open && "rotate-[360deg]"
            }`}
            onClick={() => setOpen(!open)}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            WELCOME <span className="text-red-500">ADMIN</span>
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link
              to={Menu.to}
              key={index}
              className={`flex  rounded-md p-1 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-4" : "mt-0"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              {/* <img src={`./src/assets/${Menu.src}.png`} /> */}
              <span className={`${!open ? 'tooltip tooltip-right' : ''}`} data-tooltip={Menu.title}>{Menu.icon}</span>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-base font-medium`}
              >
                {Menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>

      {/* </div> */}
    </>
  );
};
export default Sidebar;
