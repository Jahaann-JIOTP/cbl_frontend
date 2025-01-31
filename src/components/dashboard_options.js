"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
  const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
  const [showPlantSubMenu, setShowPlantSubMenu] = useState(false);
  const [showProductionSubMenu, setShowProductionSubMenu] = useState(false);

  const toggleDashboardSubMenu = () => {
    setShowDashboardSubMenu(!showDashboardSubMenu);
  };

  const toggleReportsSubMenu = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
  };

  const togglePlantSubMenu = () => {
    setShowPlantSubMenu(!showPlantSubMenu);
  };

  const toggleProductionSubMenu = () => {
    setShowProductionSubMenu(!showProductionSubMenu);
  };

  const pathname = usePathname();

  useEffect(() => {
    // Check if the current pathname matches the expected active route
    if (
      pathname === "/dashboard" ||
      pathname === "/sankey" ||
      pathname === "/onoff" ||
      pathname === "/onoff1"
    ) {
      setShowDashboardSubMenu(true);
    } else {
      setShowReportsSubMenu(false);
    }
  }, [pathname]);

  return (
    <div>
      <nav className={`mt-4 text-gray-600 text-lg`}>
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleDashboardSubMenu}
        >
          <p className="flex-grow text-[14px] slide-from-right">
            1- Main Dashboard{" "}
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
          <ul className="bg-[#fff] slide-from-right ml-8 text-gray-600 rounded mr-5 text-[13px]">
            <li>
              <Link
                href="/dashboard"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname == "/dashboard"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Plant Summary
              </Link>
            </li>
            <li>
              <Link
                href="/onoff"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname == "/onoff"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }truncate`}  title="Compressors On/Off Hours"
              >
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                - Compressors On/Off Hours</span>
              </Link>
              <Link
                href="/onoff1"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname == "/onoff1"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }truncate`}  title="Compressors On/Off Cycles"
              >
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                - Compressors On/Off Cycles
                </span>
              </Link>

              <Link
                href="/sankey"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname == "/sankey"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Compressed Air
              </Link>
            </li>
          </ul>
        )}

        {/* New Production Dashboard Section */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleProductionSubMenu}
        >
          <p className="flex-grow text-[14px] slide-from-right">
            2- Production Dashboard
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showProductionSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {showProductionSubMenu && (
          <ul className="bg-[#fff] slide-from-right ml-8 text-gray-600 rounded mr-5 text-[13px]">
            <li>
              <Link
                href="/add_production"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname == "/add_production"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Add Production
              </Link>
            </li>
            <li>
              <Link
                href="/production_dash"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname == "/production_dash"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - View Production
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default DashboardMenu;
