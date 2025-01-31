"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ReportsMenu = () => {
  const pathname = usePathname();
  const [showCostSubMenu, setShowCostSubMenu] = useState(false);
  const [showUsageSubMenu, setShowUsageSubMenu] = useState(false);
  const [showShiftSubMenu, setShowShiftSubMenu] = useState(false);

  useEffect(() => {
    if (
      pathname === "/energy_cost" ||
      pathname === "/energy_cost_air" ||
      pathname === "/production_cost" ||
      pathname === "/energy_cost_solar"
    ) {
      setShowCostSubMenu(true);
    }
    if (
      pathname === "/energy_usage" ||
      pathname === "/energy_usage_air" ||
      pathname === "/energy_usage_solar"
    ) {
      setShowUsageSubMenu(true);
    }
    if (
      pathname === "/energy_shift" ||
      pathname === "/energy_shift_air" ||
      pathname === "/energy_shift_solar"
    ) {
      setShowShiftSubMenu(true);
    }
  }, [pathname]);

  const toggleCostSubMenu = () => {
    setShowCostSubMenu(!showCostSubMenu);
  };

  const toggleUsageSubMenu = () => {
    setShowUsageSubMenu(!showUsageSubMenu);
  };

  const toggleShiftSubMenu = () => {
    setShowShiftSubMenu(!showShiftSubMenu);
  };

  return (
    <div>
      <nav className={`mt-4 text-black text-lg slide-from-right`}>
        {/* Cost Menu */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleCostSubMenu}
        >
          <p className="flex-grow text-[14px]">1- Energy Cost Report</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showCostSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        {showCostSubMenu && (
          <ul className="bg-[#fff] ml-8 text-gray-600 rounded mr-5 text-[13px]">
            <li>
              <Link
                href="/energy_cost"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_cost"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Electricity
              </Link>
            </li>
            <li>
              <Link
                href="/energy_cost_air"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_cost_air"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Compressed Air
              </Link>
            </li>
            <li>
              <Link
                href="/production_cost"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/production_cost"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Production Cost
              </Link>
            </li>
            <li>
              <Link
                href="/energy_cost_solar"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_cost_solar"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Solar
              </Link>
            </li>
          </ul>
        )}

        {/* Usage Menu */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleUsageSubMenu}
        >
          <p className="flex-grow text-[14px]">2- Energy Usage Report</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showUsageSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        {showUsageSubMenu && (
          <ul className="bg-[#fff] ml-8 text-gray-600 rounded mr-5 text-[13px]">
            <li>
              <Link
                href="/energy_usage"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_usage"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Electricity
              </Link>
            </li>
            <li>
              <Link
                href="/energy_usage_air"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_usage_air"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Compressed Air
              </Link>
            </li>
            <li>
              <Link
                href="/energy_usage_solar"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_usage_solar"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Solar
              </Link>
            </li>
          </ul>
        )}

        {/* Shift Menu */}
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleShiftSubMenu}
        >
          <p className="flex-grow text-[14px]">3- Energy Shift Report</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showShiftSubMenu ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        {showShiftSubMenu && (
          <ul className="bg-[#fff] ml-8 text-gray-600 rounded mr-5 text-[13px]">
            <li>
              <Link
                href="/energy_shift"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_shift"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Electricity
              </Link>
            </li>
            <li>
              <Link
                href="/energy_shift_air"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_shift_air"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Compressed Air
              </Link>
            </li>
            <li>
              <Link
                href="/energy_shift_solar"
                className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${
                  pathname === "/energy_shift_solar"
                    ? "border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2"
                    : ""
                }`}
              >
                - Solar
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default ReportsMenu;
