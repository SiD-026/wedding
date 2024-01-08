import React, { useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";


const AdminDashboard = ({socket, admin}) => {

  return (
    <>
      {/* <div className="flex bg-gray-600">
       <div className="overflow-hidden">
       <Sidebar />
       </div>
        <div className="h-screen flex-1 wrapper d-flex flex-column min-vh-100">
            <Navbar />
          <div className="absolute">
            <AdminLayout />
          </div>
        </div>
      </div> */}



      <main className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col wrapper d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex flex-1 bg-gray-600 overflow-y-auto paragraph px-4">
              <AdminLayout socket={socket} admin={admin}/>
            </div>
          </div>
        </div>
        {/* <div className="flex">Footer</div> */}
      </main>
    </>
  );
};

export default AdminDashboard;
