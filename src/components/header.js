"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faGear,
  faProjectDiagram,
  faArrowTrendUp,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleTabClick }) => {
  const pathname = usePathname();

  return (
    <header className="bg-[#1F5897] text-white mx-0 my-2 mt-0 flex text-sm w-full">
      <Link
        href="/dashboard"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Home")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/dashboard" ||  pathname === "/onoff"  ||  pathname === "/sankey"  ||  pathname === "/onoff1" ||  pathname === "/production_dash" ||  pathname === "/add_production"  ||  pathname === "/Compresser_Efficiency" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faDashboard} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} /> DASHBOARD
        </p>
      </Link>
      <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Custom")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/dash_1" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faDashboard} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} /> CUSTOM DASHBOARD
        </p>
      </Link>
      <Link
        href="/sld"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Diagram")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/sld" ||  pathname === "/sld_meters1" ||  pathname === "/Solar_diagram"  ||  pathname === "/sld_meters" ||  pathname === "/sld_meters2" ||  pathname === "/Compresser"  ||  pathname === "/Compressernew"|| pathname === "/Air_Compresser" || pathname === "/log_detail3" || pathname === "/Solar_log" || pathname === "/solar_detail"  ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faProjectDiagram} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} /> DIAGRAM
        </p>
      </Link>
      <Link
        href="/All_Alarms"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Alarms")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/alarms" || pathname === "/All_Alarms" || pathname === "/Recent_Alarms"  ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} /> ALARMS
        </p>
      </Link>
      <Link
        href="/custom_trend"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Trends")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/custom_trend" || pathname === "/trends_elec" || pathname === "/compressed_custom_trend" || pathname === "/compressed_trends" || pathname === "/compressed_consumption" || pathname === "/solar_custom_trend"  || pathname === "/solar_trends" 
              ? "bg-white text-black"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faArrowTrendUp} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} /> TRENDS
        </p>
      </Link>
      
      <Link
        href="/energy_cost"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Reports")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/energy_cost" || pathname === "/energy_cost_air" || pathname === "/production_cost" || pathname === "/energy_cost_solar" || pathname === "/energy_usage" ||  pathname === "/energy_shift"  || pathname === "/energy_usage_air" || pathname === "/energy_usage_solar" || pathname === "/energy_shift_air" || pathname === "/energy_shift_solar" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} />REPORTS
        </p>
      </Link>
      {/* <Link
        href="#"
        className={`py-[8px] px-4`}
        onClick={() => handleTabClick("Setting")}
      >
        <p
          className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
            pathname === "/add_roles" ? "bg-white text-black" : ""
          }`}
        >
          <FontAwesomeIcon icon={faGear} style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }} /> SETTING
        </p>
      </Link> */}
    </header>
  );
};

export default Header;
