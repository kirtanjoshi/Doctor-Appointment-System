import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 ml-64 min-h-screen">
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
