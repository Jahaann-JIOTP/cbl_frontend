"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Preloader from "@/components/Preloader";

const AlarmTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 14;

  // Utility function to remove duplicates
  const removeDuplicates = (alarms) => {
    const uniqueAlarms = [];
    const seen = new Set();

    alarms.forEach((alarm) => {
      const uniqueKey = `${alarm.Source}-${alarm.Status}-${alarm.Time}`; // Define a unique key for each alarm
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueAlarms.push(alarm);
      }
    });

    return uniqueAlarms;
  };

  // Fetch data periodically using useEffect
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://www.cblapi.jiotp.com/cbl_backend/comparison1.php") // Update to your backend API URL
        .then((response) => {
          console.log("API Response:", response.data); // Debugging API response
          if (response.data && Array.isArray(response.data.alarms)) {
            const uniqueData = removeDuplicates(response.data.alarms); // Remove duplicates
            setData(uniqueData);
          } else {
            setError("No alarm data found.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err); // Log error details
          setError("Failed to fetch data from the server.");
          setLoading(false);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loading) return <Preloader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const getStatusDetails = (status) => {
    if (status === "Low Voltage" || status === "Low Current") {
      return { color: "bg-yellow-400", image: "/yellow.png" };
    }
    if (status === "High Voltage" || status === "High Current") {
      return { color: "bg-red-500", image: "/red.png" };
    }
    return { color: "bg-green-500", image: null };
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const exportData = data.map((item) => ({
      State: item.state || "N/A",
      Source: item.Source || "N/A",
      Status: item.Status || "N/A",
      LastOccurrence: item.Time ? new Date(item.Time).toLocaleString() : "N/A",
      Occurrences: item.alarm_count || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alarms");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelFile, "alarms_data.xlsx");
  };

  return (
    <div className="w-full bg-white shadow-lg h-[85vh] rounded-lg border-t-4 border-t-[#1F5897] overflow-hidden border-2 border-[#808080]">
      {/* Header */}
      <div className="p-4 bg-blue-50 border-b border-gray-300">
        <p className="text-lg font-bold text-black">All Historical Alarms</p>
      </div>

      {/* Export Button */}
      <div className="p-4">
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300 float-right"
        >
          Export to Excel
        </button>
      </div>
      <br />
      <br />

      {/* Table */}
      <div className="overflow-x-auto h-[75%]">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-50 border-b border-gray-300">
            <tr>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                State
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Source
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Last Occurrence
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Occurrences
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((item, index) => {
                const { color, image } = getStatusDetails(item.Status);
                return (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-2 text-sm flex items-center relative">
                      <div
                        className={`h-full w-1 absolute top-0 left-0 ${color}`}
                      ></div>
                      {image && (
                        <img
                          src={image}
                          alt="status indicator"
                          className="w-4 h-4 mr-2"
                        />
                      )}
                      {item.state || "N/A"}
                    </td>
                    <td className="p-2 text-sm">{item.Source || "N/A"}</td>
                    <td className="p-2 text-sm">{item.Status || "N/A"}</td>
                    <td className="p-2 text-sm">
                      {item.Time ? new Date(item.Time).toLocaleString() : "N/A"}
                    </td>
                    <td className="p-2 text-sm">{item.alarm_count || 0}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-sm text-gray-500"
                >
                  No alarms available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md mr-2"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md mr-2"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md"
          >
            Last
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default AlarmTable;
