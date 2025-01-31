"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Import usePathname
import TopHeader from "@/components/topheader";
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const [loading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  const pathname = usePathname(); // Get the current pathname

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update activeTab state
  };

  useEffect(() => {
    setActiveTab((prevTab) => {
      if (pathname === "/sld" ||  pathname === "/Compresser" ||  pathname === "/Compressernew" ||  pathname === "/Solar_diagram" ||  pathname === "/sld_meters1" ||  pathname === "/sld_meters" ||  pathname === "/sld_meters2" || pathname === "/Air_Compresser" || pathname === "/log_detail3" || pathname === "/Solar_log" || pathname === "/solar_detail" ) return "Diagram";
      else if (pathname === "/custom_trend"  ) return "Trends";
      else if (pathname === "/trends_elec") return "Trends";
      else if (pathname === "/compressed_custom_trend") return "Trends";
      else if (pathname === "/compressed_trends") return "Trends";
      else if (pathname === "/compressed_consumption") return "Trends";
      else if (pathname === "/solar_custom_trend") return "Trends";
      else if (pathname === "/solar_trends") return "Trends";
      else if (pathname === "/add_roles") return "Setting";
      else if (pathname === "/dash_1") return "Custom";
      else if (
        pathname === "/alarms" ||
        pathname === "/Recent_Alarms" ||
        pathname === "/All_Alarms"
      )
        return "Alarms";
      else if (pathname === "/energy_cost" ||
        pathname === "/energy_usage" ||
        pathname === "/energy_shift"  ||
        pathname === "/energy_cost_air" ||
        pathname === "/production_cost" ||
        pathname === "/energy_cost_solar" || pathname === "/energy_usage_air" ||
        pathname === "/energy_usage_solar" || pathname === "/energy_shift_air" ||
        pathname === "/energy_shift_solar" ) return "Reports";
      return prevTab;
    });
  }, [pathname]);

  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      {/* Header Section */}
      <TopHeader />
      <Header handleTabClick={handleTabClick} />

      {/* Main Content Section */}
      <div className="flex">
        <Sidebar activeTab={activeTab} handleTabClick={handleTabClick} />{" "}
        {/* Pass activeTab and handleTabClick */}
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto m-3 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: 'url("./bglogo.png")' }}
        >
          {children}
        </main>
      </div>

      {/* Footer Section */}
      {/* <footer className="bg-gray-100 text-center py-4 border-t">
        © 2024 Your Company. All rights reserved.
      </footer> */}
    </div>
  );
}
