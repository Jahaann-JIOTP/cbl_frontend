"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Logs = () => {
  const [apiType, setApiType] = useState("S_1");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch query parameters from the URL on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setApiType(params.get("val") || "S_1");
    }
  }, []);

  const headersMap = {
    S_1: [
      { key: "PLC_Date_Time", label: "Time" },
      { key: "U11_SM11_PowerYield_EXP_Daily_kWh", label: "Daily PowerYield" },
      { key: "U11_SM11_PowerYield_EXP_Total_kWh", label: "Total PowerYield" },
      { key: "U11_SM11_ActivePower_EXP_Total_kW", label: "Total ActivePower" },
      { key: "U11_SM11_ReAPower_EXP_Total_var", label: "Total ReAPower" },
    ],
    S_2: [
      { key: "PLC_Date_Time", label: "Time" },
      { key: "U12_SM12_PowerYield_EXP_Daily_kWh", label: "Daily PowerYield" },
      { key: "U12_SM12_PowerYield_EXP_Total_kWh", label: "Total PowerYield" },
      { key: "U12_SM12_ActivePower_EXP_Total_kW", label: "Total ActivePower" },
      { key: "U12_SM12_ReAPower_EXP_Total_var", label: "Total ReAPower" },
    ],
  };

  const fetchLogs = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get("https://www.cblapi.jiotp.com/cbl_backend/solarshow.php", {
        params: {
          val: apiType, // Pass `apiType` dynamically based on URL
          s: startDate,
          e: endDate,
        },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
        setError(response.data.message || "No valid data received.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [apiType, startDate, endDate]);

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = headersMap[apiType]?.map((header) => header.label) || [];
    const keys = headersMap[apiType]?.map((header) => header.key) || [];

    const worksheetData = [
      headers,
      ...data.map((row) =>
        keys.map((key) =>
          key === "time" && row[key] ? new Date(row[key]).toLocaleString() : row[key] ?? "-"
        )
      ),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${apiType}_Logs`);
    XLSX.writeFile(workbook, `${apiType}_Logs.xlsx`);
  };

  const renderTableHeaders = () =>
    headersMap[apiType]?.map((header) => (
      <th key={header.key} className="px-4 py-2 border text-center bg-blue-100 text-blue-800">
        {header.label}
      </th>
    ));

  const renderTableRows = () =>
    data.map((row, index) => (
      <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
        {headersMap[apiType]?.map((header) => (
          <td key={header.key} className="px-4 py-2 border text-center">
            {header.key === "time"
              ? row[header.key]
                ? new Date(row[header.key]).toLocaleString()
                : "-"
              : typeof row[header.key] === "number"
              ? row[header.key].toFixed(2)
              : row[header.key] ?? "-"}
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] relative">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-4">Logs</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 border rounded-md px-3 py-2"
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 border rounded-md px-3 py-2"
            />
          </label>
        </div>
        <div className="flex gap-4">
          <button
            onClick={exportToExcel}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Export
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Back to Logs
          </button>
        </div>
      </div>

      <div className="overflow-auto h-[calc(76vh-80px)] bg-white rounded-md shadow">
        {loading ? (
          <p className="text-center py-4 text-blue-500">Loading data...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-100 sticky top-0 z-10">
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                renderTableRows()
              ) : (
                <tr>
                  <td colSpan={headersMap[apiType]?.length || 1} className="text-center py-4 text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Logs;
