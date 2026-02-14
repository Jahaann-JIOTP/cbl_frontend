"use client";

import React, { useState, useEffect , Suspense} from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import * as XLSX from "xlsx";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const apiType = searchParams.get("val") || "F_1"; // Dynamically set API type based on URL parameter
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const queryType = searchParams.get("type") || "F_1";
  

  // Validate the type parameter against allowed types in headersMap
  const validTypes = ["F_1", "F_2"];
  const type = validTypes.includes(queryType) ? queryType : "F_1";

  const headersMap = {
    F_1: [
      { key: "PLC_Date_Time", label: "Time" },
      { key: "F1_GWP_Flowrate", label: "GWP Flowrate" },
      { key: "F2_Airjet_Flowrate", label: "Airjet Flowrate" },
      { key: "F4_Sewing2_Flowrate", label: "Sewing2 Flowrate" },
      { key: "F5_Textile_Flowrate", label: "Textile Flowrate" },
      { key: "F7_PG_Flowrate", label: "Sewing1 Flowrate" },
      { key: "F6_Sewing1_Flowrate", label: "F7 PG Flowrate" },
      
    ],
    F_2: [
      { key: "PLC_Date_Time", label: "Time" },
      { key: "F1_GWP_TotalFlow", label: "GWP Total Flow" },
      { key: "F2_Airjet_TotalFlow", label: "Airjet Total Flow" },
      { key: "F4_Sewing2_TotalFlow", label: "Sewing2 Total Flow" },
      { key: "F5_Textile_TotalFlow", label: "Textile Total Flow" },
      { key: "F7_PG_TotalFlow", label: "Sewing1 TotalFlow" },
      { key: "F6_Sewing1_TotalFlow", label: "F7 PG TotalFlow" },
      
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
      const response = await axios.get("https://cblapi.jahaann.com/flowshow.php", {
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
            <td colSpan={headersMap[type]?.length || 1} className="text-center py-4 text-gray-500">
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

const MainPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeterDataComponent />
    </Suspense>
  );
};


export default MainPage;
