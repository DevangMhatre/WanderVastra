import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isSidebarOpen]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center p-4 bg-gray-900 text-white z-30">
        <button onClick={toggleSidebar} className="cursor-pointer">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-30
          h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <AdminSidebar toggleSidebar={toggleSidebar} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* spacer for mobile top bar */}
        <div className="md:hidden h-16" />

        {/* scrollable page area ONLY */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
