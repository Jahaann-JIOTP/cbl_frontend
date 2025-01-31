"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import localforage from "localforage";
import { FaEdit } from "react-icons/fa"; // FontAwesome edit icon

const Custom_dashMenu = () => {
    const pathname = usePathname();
    const [titles, setTitles] = useState([
        "1- Add Title",
        "2- Add Title",
        "3- Add Title",
        "4- Add Title",
        "5- Add Title",
        "6- Add Title",
    ]);
    const [editIndex, setEditIndex] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        // Load saved titles from localforage
        const loadTitles = async () => {
            const savedTitles = await localforage.getItem("dashboardTitles");
            if (savedTitles) {
                setTitles(savedTitles);
            }
        };
        loadTitles();
    }, []);

    const saveTitles = async (updatedTitles) => {
        await localforage.setItem("dashboardTitles", updatedTitles);
        setTitles(updatedTitles);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewTitle(titles[index]);
    };

    const handleSave = (index) => {
        const updatedTitles = [...titles];
        updatedTitles[index] = newTitle;
        saveTitles(updatedTitles);
        setEditIndex(null);
        setNewTitle("");
    };

    const handleCancel = () => {
        setEditIndex(null);
        setNewTitle("");
    };

    return (
        <div>
            <nav className="mt-4 text-gray-600 text-[14px] slide-from-right">
                {titles.map((title, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                        {editIndex === index ? (
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="py-2 px-2 border text-[grey] text-[14px] border-gray-300 rounded w-[93%] mx-2"
                                />
                                <div className="mt-2 mx-2 flex gap-2 justify-end text-[12px]">
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="py-1 px-2 text-white bg-blue-500 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="py-1 px-2 text-white bg-gray-500 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <Link
                                    href={`/dash_${index + 1}`}
                                    className={`block flex-grow py-2 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname === `/dash_${index + 1}` ? "bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2" : ""
                                        }`}
                                >
                                    {title}
                                </Link>
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="text-[gray] hover:text-blue-700 mr-3"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Custom_dashMenu;
