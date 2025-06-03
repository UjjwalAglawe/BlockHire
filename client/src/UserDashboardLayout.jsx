import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import FetchContracts from "./Components/Contract/FetchContract";

const UserDashboardLayout = ({ contract }) => {
  return (
    <div className="min-h-screen flex bg-gray-50 font-title">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-300 p-6 space-y-6 shadow-md">
        <h2 className="text-2xl font-bold text-indigo-700">Dashboard</h2>
        <nav className="space-y-4">
          <NavLink
            to="/userprofile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-100 ${isActive ? "bg-indigo-200 font-semibold" : ""
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/allchats"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-100 ${isActive ? "bg-indigo-200 font-semibold" : ""
              }`
            }
          >
            Chats
          </NavLink>
          <NavLink
            to="/contracts"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-100 ${isActive ? "bg-indigo-200 font-semibold" : ""
              }`
            }
          >
            Contracts
          </NavLink>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
        {/* <FetchContracts contract={contract} /> Injecting Contracts component */}
      </main>
    </div>
  );
};

export default UserDashboardLayout;
