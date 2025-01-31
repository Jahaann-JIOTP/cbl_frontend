"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import DashboardMenu from "@/components/dashboard_options";
import DiagramMenu from "@/components/diagram_options";
import TrendMenu from "@/components/trend_options";
import AlarmMenu from "@/components/alarms_options";
import SettingMenu from "@/components/setting_options";
import Custom_dashMenu from "@/components/cutom_dashboard";
import ReportsMenu from "@/components/reports_options";

const Sidebar = ({ activeTab, handleTabClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Ensure the sidebar is open by default on large screens (browser-only check)
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        setIsSidebarOpen(true); // Open sidebar on large screens
      } else {
        setIsSidebarOpen(false); // Close sidebar on small screens
      }
    };

    // Set initial state based on current screen size
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMenu = () => {
    if (activeTab === "Home") return <DashboardMenu />;
    if (activeTab === "Diagram") return <DiagramMenu />;
    if (activeTab === "Trends") return <TrendMenu />;
    if (activeTab === "Alarms") return <AlarmMenu />;
    if (activeTab === "Setting") return <SettingMenu />;
    if (activeTab === "Custom") return <Custom_dashMenu />;
    if (activeTab === "Reports") return <ReportsMenu />;

    return null;
  };

  return (
    <div
      className={`relative ${
        isSidebarOpen ? "w-[285px]" : "w-[64px]"
      } transition-all duration-300`}
    >
      <aside
        className={`flex-shrink-0 bg-[#f2f2f2] text-[#808080] h-[100vh] sm:h-[85vh] m-3 rounded-[7px] border-t-[5px] border-t-[#1f5897] relative border-2 border-[grey] ${
          isSidebarOpen ? "p-0" : "p-0"
        }`}
      >
        {/* Close/Open Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-[5px] right-[2px] bg-[#1f5897] text-white w-[32px] h-[32px] rounded-full flex justify-center items-center cursor-pointer shadow-md ${
            isSidebarOpen ? "text-red-500" : "text-green-500"
          }`}
          title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
        </button>

        {/* Active Tab Section */}
        <div
          className={`p-2 border-b-[1px] border-[#808080] ${
            !isSidebarOpen ? "hidden" : ""
          }`}
        >
          <p className="text-[13px] py-1 text-black">{activeTab} Section</p>
        </div>

        {/* Dynamic Menu Rendering */}
        {isSidebarOpen && renderMenu()}

        {/* Logo */}
        <img
          src={"./Jahaanns.png"}
          alt="User Image"
          className={`w-full h-[auto] rounded-full absolute m-[auto] bottom-0 opacity-80 ${
            !isSidebarOpen ? "hidden" : ""
          }`}
        />
      </aside>

      {/* Responsive Overlay for Small Screens */}
      {!isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 1024 && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
