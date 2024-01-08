import React, { useEffect, useState } from "react";
import reviewsapi from "../api/reviewsapi";
import Toast from "../common/Toast";
import { ReviewsHome } from "../components/customer/CustDashboard";
import Footer from "../components/customer/Footer";
import Navbar from "../components/customer/Navbar";
const _user = localStorage.getItem("token");
const user = JSON.parse(_user);
const type = user ? Object.entries(user)[1][0] : "";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState({
    brideName: "",
    groomName: "",
    city: "",
    image: "",
    comments: "",
  });
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const getReviews = async () => {
    reviewsapi
      .isFeaturedReviews({ status: true, sort: "date", by: "desc" })
      .then((res) => setReviews(res.data));
  };

  useEffect(() => {
    setLoading(true)
    getReviews();
    setTimeout(() =>{
      setLoading(false)
    },1000)
  }, []);

  const handleReview = () => {
    setShowModal(true);
    setData({
      brideName: "",
      groomName: "",
      city: "",
      image: "",
      comments: "",
    });
  };

  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("brideName", data.brideName);
      formdata.append("groomName", data.groomName);
      formdata.append("city", data.city);
      formdata.append("comments", data.comments);

      await reviewsapi.addReview(formdata);
      setShowModal(false);
      getReviews();
      Toast.success();
    } catch (error) {
      Toast.error(error);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="container">
          <input className="modal-state" id="modal-3" type="checkbox" />
          <div className="modal">
            <label className="modal-overlay"></label>
            <div className="modal-content flex flex-col gap-5">
              <label
                htmlFor="modal-3"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h2 className="text-2xl mx-auto font-medium text-rose-500">
                Reviews
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="px-2">
                  <span className="font-medium">Personal Information</span>
                </div>
                <div className="px-2 mt-2 flex flex-wrap">
                  <div className="px-2 py-1 w-1/2">
                    <span className="font-medium">Bride Name</span>
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <span className="ml-auto font-medium">Groom Name</span>
                  </div>
                </div>

                <div className="flex flex-wrap ">
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="brideName"
                      name="brideName"
                      value={data.brideName}
                      onChange={handleChange}
                      placeholder="Bride Name"
                      className="input input-sm input-primary text-lg font-medium"
                    />
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="groomName"
                      name="groomName"
                      value={data.groomName}
                      onChange={handleChange}
                      placeholder="Groom Name"
                      className="input input-sm input-primary text-lg font-medium"
                    />
                  </div>
                </div>

                <div className="px-2 mt-2 flex flex-wrap">
                  <div className="px-2 py-1 w-1/2">
                    <span className="font-medium">City</span>
                  </div>
                </div>

                <div className="flex flex-wrap ">
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="text"
                      id="text"
                      name="city"
                      value={data.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="input input-sm input-primary"
                    />
                  </div>
                  <div className="px-2 py-1 w-1/2">
                    <input
                      type="file"
                      id="photo"
                      name="image"
                      onChange={handleFileChange}
                      className="w-full
                  px-2
                  py-1
                  text-sm
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="px-2 mt-2 flex flex-wrap">
                  <div className="px-2 py-1 w-1/2">
                    <span className="font-medium">Add Comments</span>
                  </div>
                </div>
                <div className="px-2 py-1 w-full ">
                  <textarea
                    type="text"
                    id="comments"
                    name="comments"
                    value={data.comments}
                    onChange={handleChange}
                    placeholder="Enter Your Reviews..."
                    className="text-xl textarea textarea-sm textarea-primary textarea-block"
                  />
                </div>
                <div className="flex gap-3 mt-3">
                  <button type="submit" className="btn btn-error btn-block">
                    Submit
                  </button>
                  {/* <label className="btn btn-block" htmlFor="modal-3">
                Cancel
              </label> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <Navbar />
      <ReviewsHome />
      <section className="text-black bg-gray-100 body-font">
        <div className="flex flex-col text-center w-full pt-10 pb-10">
          {type === "customerId" && (
            <label
              className="btn mx-auto sm:text-2xl text-2xl border border-rose-500 font-bold title-font text-rose-500 hover:text-white hover:bg-rose-500"
              htmlFor="modal-3"
              onClick={handleReview}
            >
              ADD REVIEWS
            </label>
          )}
        </div>
        {
        loading ? 
           <div className="text-center pb-15">
           <svg
             aria-hidden="true"
             role="status"
             className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
             viewBox="0 0 100 101"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
               fill="currentColor"
             />
             <path
               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
               fill="#1C64F2"
             />
           </svg>
           Loading...
         </div> : 
         reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <div key={review._id} className="container mx-auto flex px-5 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 ">
                  <img
                    className=" h-64 lg:w-2/3 md:w-1/2 mb-10 ml-auto object-cover object-center rounded"
                    alt="Reviews Wedding Photos"
                    // src="/assets/beautiful-bride-groom-having-beach-wedding_23-2149043972 (1).webp"
                    src={`http://${window.location.hostname}:5000/reviews/${review.image}`}
                  />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-black mb-2">
                    {review.brideName.toUpperCase()} &{" "}
                    {review.groomName.toUpperCase()}{" "}
                    <span className="text-rose-500">
                      - {review.city.toUpperCase()}
                    </span>
                  </h1>
                  <p className="mb-8 leading-relaxed w-3/4">
                    {review.comments}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center font-medium text-3xl pb-16">
              No Reviews To Display
            </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Reviews;
