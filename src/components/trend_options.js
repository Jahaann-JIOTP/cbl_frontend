"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TrendMenu = () => {
  const pathname = usePathname();

  // Open submenu if the current page matches one of the submenu links
  const [showElectricitySubMenu, setShowElectricitySubMenu] = useState(false);
  const [showCompressedAirSubMenu, setShowCompressedAirSubMenu] = useState(false);
  const [showSolarSubMenu, setShowSolarSubMenu] = useState(false);

  // Open the submenu automatically if pathname matches submenu links
  useEffect(() => {
    if (pathname === "/custom_trend" || pathname === "/trends_elec") {
      setShowElectricitySubMenu(true);
    }
    if (pathname === "/compressed_custom_trend" || pathname === "/compressed_trends" || pathname === "/compressed_consumption") {
      setShowCompressedAirSubMenu(true);
    }
    if (pathname === "/solar_custom_trend" || pathname === "/solar_trends") {
      setShowSolarSubMenu(true);
    }
  }, [pathname]);

  const toggleElectricitySubMenu = () => {
    setShowElectricitySubMenu(!showElectricitySubMenu);
  };
  const toggleCompressedAirSubMenu = () => {
    setShowCompressedAirSubMenu(!showCompressedAirSubMenu);
  };
  const toggleSolarSubMenu = () => {
    setShowSolarSubMenu(!showSolarSubMenu);
  };

  return (
    <div>
      <nav className={`mt-4 text-gray-600 text-lg`}>
        {/* Electricity Menu */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleElectricitySubMenu}
        >
          <p className="flex-grow text-[14px]">1- Electricity</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showElectricitySubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {showElectricitySubMenu && (
          <ul className="bg-[#fff] ml-8 text-gray-600 rounded mr-5 text-[13px]">
            {/* Customized Trend */}
            <li>
              <Link
                href="/custom_trend"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/custom_trend"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Customized Trend
              </Link>
            </li>

            {/* Trends */}
            <li>
              <Link
                href="/trends_elec"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/trends_elec"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Trends
              </Link>
            </li>
          </ul>
        )}

        {/* Compressed Air Menu */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleCompressedAirSubMenu}
        >
          <p className="flex-grow text-[14px]">2- Compressed Air</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showCompressedAirSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {showCompressedAirSubMenu && (
          <ul className="bg-[#fff] ml-8 text-gray-600 rounded mr-5 text-[13px]">
            {/* Customized Trend */}
            <li>
              <Link
                href="/compressed_custom_trend"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/compressed_custom_trend"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Customized Trend
              </Link>
            </li>

            {/* Trends */}
            <li>
              <Link
                href="/compressed_trends"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/compressed_trends"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Trends
              </Link>
            </li>
            <li>
              <Link
                href="/compressed_consumption"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/compressed_consumption"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                -Production Per Unit
              </Link>
            </li>
          </ul>
        )}

        {/* Solar Menu */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleSolarSubMenu}
        >
          <p className="flex-grow text-[14px]">3- Solar</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showSolarSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {showSolarSubMenu && (
          <ul className="bg-[#fff] ml-8 text-gray-600 rounded mr-5 text-[13px]">
            {/* Customized Trend */}
            <li>
              <Link
                href="/solar_custom_trend"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/solar_custom_trend"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Customized Trend
              </Link>
            </li>

            {/* Trends */}
            {/* <li>
              <Link
                href="/solar_trends"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/solar_trends"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Trends
              </Link>
            </li> */}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default TrendMenu;
