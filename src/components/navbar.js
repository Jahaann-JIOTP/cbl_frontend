"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faGear } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from "next/navigation";
import Link from 'next/link';

const NavBar = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const pathname = usePathname();
// console.log(activeTab);
    return (
        <div>
            <header className="bg-[#0091cf] text-white m-3 mt-0 p-2 rounded-2xl flex">
                <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Home')}>
                    <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Home' ? 'bg-white text-black' : ''}`}>Home</p>
                </Link>
                {/* <Link className={`py-[8px] px-4`} onClick={() => handleTabClick('Diagram')}>
                    <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Diagram' ? 'bg-white text-black' : ''}`}>Diagram</p>
                </Link>
                <Link className={`py-[8px] px-4`} onClick={() => handleTabClick('Trends')}>
                    <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Trends' ? 'bg-white text-black' : ''}`}>Trends</p>
                </Link>
                <Link className={`py-[8px] px-4`} onClick={() => handleTabClick('Reports')}>
                    <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Reports' ? 'bg-white text-black' : ''}`}>Reports</p>
                </Link> */}
                <Link href="/user" className={`py-[8px] px-4`}>
                    <p className={`px-4 py-1 cursor-pointer rounded-lg ${pathname == "/user" ? 'bg-white text-black' : ''}`}><FontAwesomeIcon icon={faUserCog} /> User Managment</p>
                </Link>
                <Link href="/setting" className={`py-[8px] px-4`}>
                    <p className={`px-4 py-1 cursor-pointer rounded-lg ${pathname == "/setting" ? 'bg-white text-black' : ''}`}><FontAwesomeIcon icon={faGear} /> Settings</p>
                </Link>
                <img
                    src={'./logout.png'}
                    alt="User Image"
                    className="w-[auto] h-12 rounded-full ml-[auto] cursor-pointer"
                />
            </header>
        </div>
    );
};

export default NavBar;
