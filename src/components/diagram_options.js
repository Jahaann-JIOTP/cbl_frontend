"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DiagramMenu = () => {
  const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);

  const toggleDashboardSubMenu = () => {
    setShowDashboardSubMenu(!showDashboardSubMenu);
  };

  const pathname = usePathname();
  useEffect(() => {
    if (
      pathname === "/sld" ||
      pathname === "/sld_meters1" ||
      pathname === "/sld_meters" ||
      pathname === "/sld_meters2" ||
      pathname === "/Compresser" ||
      pathname === "/Compressernew" ||
      pathname === "/Solar_diagram"
    ) {
      setShowDashboardSubMenu(true);
    }
  }, [pathname]);

  return (
    <div>
      <nav className={`mt-4 text-gray-600 text-lg`}>
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5] rounded"
          onClick={toggleDashboardSubMenu}
        >
          <p className="flex-grow text-[14px] truncate hover:whitespace-normal hover:text-clip relative group">
            Single Line Diagram
            <span className="absolute top-full left-0 bg-white shadow-lg p-2 text-sm hidden group-hover:block">
              Single Line Diagram
            </span>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showDashboardSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {showDashboardSubMenu && (
          <ul className="bg-[#fff] ml-8 text-black rounded slide-from-right mr-5 text-[14px]">
            <li>
              <Link
                href="/sld"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/sld" ||
                  pathname === "/sld_meters1" ||
                  pathname === "/sld_meters" ||
                  pathname === "/sld_meters2"
                    ? "bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                } truncate hover:whitespace-normal`}
                title="Electricity"
              >
                - Electricity
              </Link>
            </li>
            <li>
              <Link
                href="/Compresser"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/Compresser" ||
                  pathname === "/Air_Compresser" ||
                  pathname === "/log_detail3"
                    ? "bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                } truncate hover:whitespace-normal`}
                title="Compressed Air"
              >
                - Compressed Air
              </Link>
            </li>
            <li>
              <li>
                <Link
                  href="/Compressernew"
                  className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                    pathname === "/Compressernew" ||
                    pathname === "/Air_Compresser" ||
                    pathname === "/log_detail3"
                      ? "bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2"
                      : ""
                  } truncate`}
                  title="Compressed Air (New)" // Tooltip for full text
                >
                  <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                    - Compressed Air (New)
                  </span>
                </Link>
              </li>
            </li>
            <li>
              <Link
                href="/Solar_diagram"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/Solar_diagram" ||
                  pathname === "/Solar_log" ||
                  pathname === "/solar_detail"
                    ? "bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                } truncate hover:whitespace-normal`}
                title="Solar Panel Diagram"
              >
                - Solar Panel Diagram
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default DiagramMenu;
