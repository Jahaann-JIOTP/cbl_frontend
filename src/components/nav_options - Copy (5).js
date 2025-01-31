"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const NavMenu = () => {
    const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
    const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

    const toggleDashboardSubMenu = () => {
        setShowDashboardSubMenu(!showDashboardSubMenu);
    };

    const toggleReportsSubMenu = () => {
        setShowReportsSubMenu(!showReportsSubMenu);
    };
    const pathname = usePathname();
    return (
        <div>

            <nav className={`mt-4 text-white text-lg`}>
                <a href="#" className="flex items-center py-2 px-4 hover:bg-[#12a7ff] rounded" onClick={toggleDashboardSubMenu}>
                    <p className='flex-grow'> Dashboards </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform ${showDashboardSubMenu ? "transform rotate-180" : ""
                            }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>

                {showDashboardSubMenu && (
                    <ul className="bg-[#fff] ml-8 text-black rounded mr-1 text-[16px]">
                        <li>
                            <Link href="/" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "/" ? 'bg-[#1988eb] text-white' : ''}`}>
                                - Plant Summary
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "#" ? 'bg-[#1988eb] text-white' : ''}`}>
                                - Energy Comparision
                            </Link>
                        </li>
                    </ul>
                )}

                <Link href="/sld" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "/sld" ? 'bg-[#2b388f] text-white mx-2' : ''}`}>
                    SLD
                </Link>
                <Link href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                    Trends
                </Link>

                <Link href="#" className="flex items-center py-2 px-4 hover:bg-[#12a7ff] rounded" onClick={toggleReportsSubMenu}>
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
                    <ul className="bg-[#fff] ml-8 text-black rounded mr-1 text-[16px]">
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "#" ? 'bg-[#1988eb] text-white' : ''}`}>
                                - Cost Report
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#12a7ff] rounded ${pathname == "#" ? 'bg-[#1988eb] text-white' : ''}`}>
                                - Usage Report
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default NavMenu;
