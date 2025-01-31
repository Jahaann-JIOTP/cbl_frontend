"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingMenu = () => {
  const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

  const toggleDashboardSubMenu = () => {
    setShowDashboardSubMenu(!showDashboardSubMenu);
  };

  const toggleReportsSubMenu = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
  };
  const pathname = usePathname();
  useEffect(() => {
    // Check if the current pathname matches the expected active route
    if (pathname === "/user") {
      setShowDashboardSubMenu(true);
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
          <p className="flex-grow text-[16px] slide-from-right">
            {" "}
            1- User Managment
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
              <Link href="/add_roles" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "/add_roles" ? 'bg-[#B4D5F8] text-gray-600' : ''}`}>
                  - Add Roles
              </Link>
          </li>
          <li>
              <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'bg-[#B4D5F8] text-gray-600' : ''}`}>
                  - Add User
              </Link>
          </li>
          <li>
              <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'bg-[#B4D5F8] text-gray-600' : ''}`}>
                  - View User
              </Link>
          </li>
      </ul>
        )}

        {/* <Link
          href="#"
          className={`block py-3 px-4 hover:bg-[#12a7ff] text-[16px] slide-from-right rounded ${
            pathname == "#" ? "bg-[#2b388f] text-white mx-2" : ""
          }`}
        >
          Logout
        </Link>
        <Link
          href="#"
          className="block py-3 px-4 hover:bg-[#12a7ff] text-[16px] slide-from-right rounded"
        >
          Contact Us
        </Link> */}

        {/* <Link href="#" className="flex items-center py-2 px-4 hover:bg-[#12a7ff] rounded" onClick={toggleReportsSubMenu}>
                    <p className='flex-grow'> Reports </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform  ${showReportsSubMenu ? "transform rotate-180" : ""
                            }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
                {showReportsSubMenu && (
                    <ul className="bg-[#fff] ml-8 text-black rounded mr-1 text-[14px]">
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "#" ? 'bg-[#2b37cc] text-white' : ''}`}>
                                - Cost Report
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "#" ? 'bg-[#2b37cc] text-white' : ''}`}>
                                - Usage Report
                            </Link>
                        </li>
                    </ul>
                )} */}
      </nav>
    </div>
  );
};

export default SettingMenu;
