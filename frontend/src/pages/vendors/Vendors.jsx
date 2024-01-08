import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorapi from "../../api/vendorapi";
import { CustDashboard } from "../../components/customer/CustDashboard";
import Footer from "../../components/customer/Footer";
import VendorDashboard from "./VendorDashboard";
import VendorServices from "./VendorServices";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);
const Vendors = ({socket}) => {
  const [name, setName] = useState("");

  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const getName = async () => {
    try {
      const res = await vendorapi.getVendorById(user.vendorId);
      return setName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getName();
  }, [user.vendorId]);

  const handleClick = () => {
    navigate("/AddVendorServices");
  };
  const handleDashboard = () => {
    setToggle(false);
  };

  const handleServices = () => {
    setToggle(true);
  };

  return (
    <>
      <section className="text-gray-400 bg-gray-300 body-font">
        <CustDashboard name={name} />

        <div className="container px-5 pb-12 pt-10 mx-auto ">
          <div className="flex pb-3 px-50">
            <div className="flex ">
              <button
                onClick={handleDashboard}
                className={`font-medium text-lg text-black mx-3 first-letter ${
                  !toggle ? "btn shadow-lg" : ""
                } px-2 `}
              >
                Dashboard
              </button>
              <button
                onClick={handleServices}
                className={`font-medium text-lg text-black mx-3 first-letter ${
                  toggle ? "btn shadow-lg" : ""
                } px-2`}
              >
                Services
              </button>
            </div>
            <button
              onClick={handleClick}
              className="btn btn-md ml-auto btn-success"
            >
              ADD SERVICES
            </button>
          </div>
          {toggle === false && <VendorDashboard socket={socket}/>}

          {toggle === true && <VendorServices />}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Vendors;
