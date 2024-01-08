import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import contactapi from "../../../../api/contactapi";
import Pagination from "../../../../common/Pagination";
import Toast from "../../../../common/Toast";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [loading, setLoading] = useState(false)

  const contactDetails = async () => {
    try {
      const res = await contactapi.getAllContacts();
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true)
    contactDetails();
    setTimeout(() =>{
      setLoading(false)
    },1000)
  }, []);

  const handleDeleteById = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleDelete = async () => {
    try {
      await contactapi.deleteContactById(deleteId);
      setContacts(contacts.filter((data) => data._id !== deleteId));
      setModal(false);
      Toast.deleted();
    } catch (error) {
      Toast.error(error);
    }
  };

  const page = contacts;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = contacts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(contacts.length / recordsPerPage);

  return (
    <>
      {modal === true ? (
        <div>
          <input className="modal-state" id="modal-2" type="checkbox" />
          <div className="modal w-screen">
            <label className="modal-overlay" htmlFor="modal-2"></label>
            <div className="modal-content flex flex-col gap-5 max-w-3xl">
              <label
                htmlFor="modal-2"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h1 className="text-xl font-semibold mt-3">
                Do You Really Want To Delete?
              </h1>
              <div className="flex gap-3">
                <button
                  className="btn bg-rose-600 text-white text-xl btn-block"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <label htmlFor="modal-2" className="btn text-xl btn-block">
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container px-5 mx-auto ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex py-2 pt-10 pb-5 px-5">
            <div className="bg-indigo-600 px-2 py-1 rounded-lg shadow-md">
              <h2 className="font-medium text-3xl text-white">CONTACTS</h2>
            </div>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="flex w-full overflow-x-auto ">
              <table className="w-full text-center">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-2 py-3">ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created Date</th>
                    <th className="w-1/12">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center font-medium">
                  {loading ? 
                     <tr>
                     <td
                       colSpan={8}
                       className="py-3 text-2xl mx-auto font-medium text-black"
                     >
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
                     </td>
                   </tr>
                   :
                  contacts.length > 0 ? (
                    currentRecords.map((contact, index) => (
                      <tr key={contact._id}>
                        <td className="py-3 whitespace-nowrap">
                          {/* <img
                            className="h-10 w-10 rounded-full"
                            src={contact.image}
                            alt=""
                          /> */}
                          {(currentPage - 1) * recordsPerPage + index + 1}
                        </td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.subject}</td>
                        <td className="whitespace-nowrap">{contact.message}</td>
                        <td>
                          {moment(contact.createdAt).utc().format("YYYY/MM/DD")}
                        </td>
                        <td className="text-sm font-medium flex pt-4 w-1/2 mx-auto">
                          <label
                            htmlFor="modal-2"
                            onClick={() => handleDeleteById(contact._id)}
                          >
                            <MdDelete className=" cursor-pointer text-2xl text-rose-600 hover:text-rose-500" />
                          </label>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-3 text-2xl mx-auto font-medium text-black"
                      >
                        No Contacts to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {contacts.length > 0 && (
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                indexOfFirstRecord={indexOfFirstRecord}
                indexOfLastRecord={indexOfLastRecord}
                page={page}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
