"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import * as XLSX from "xlsx";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "Unknown";
  const meter = searchParams.get("meter") || "U_7_EM7"; // Default meter
  const queryType = searchParams.get("type") || "voltage"; // Default type from query

  // Validate the type parameter against allowed types in headersMap
  const validTypes = ["voltage", "current", "power_factor", "active_power","reactive_power","apparent_power","harmonics", "active_energy", "reactive_energy", "apparent_energy"];
  const type = validTypes.includes(queryType) ? queryType : "voltage";

  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const headersMap = {
    voltage: [
      { key: "time", label: "Time" },
      { key: "VoltageLN_V", label: "Voltage L-N" },
      { key: "Voltage_Ph1ToPh2_V", label: "Voltage Ph1ToPh2" },
      { key: "Voltage_Ph2ToPh3_V", label: "Voltage Ph2ToPh3" },
      { key: "Voltage_Ph3ToPh1_V", label: "Voltage Ph3ToPh1" },
      { key: "Voltage_pH1ToN_V", label: "Voltage pH1ToN" },
      { key: "Voltage_pH2ToN_V", label: "Voltage pH2ToN" },
      { key: "Voltage_pH3ToN_V", label: "Voltage pH3ToN" },
      { key: "AvgVoltageLL_V", label: "AvgVoltage LL" },
    ],
    
    current: [
      { key: "time", label: "Time" },
      { key: "CurrentPh1_A", label: "Current Ph1" },
      { key: "CurrentPh2_A", label: "Current Ph2" },
      { key: "CurrentPh3_A", label: "Current Ph3" },
      { key: "CurrentAvg_A", label: "Current Avg " },
    ],
    power_factor: [
      { key: "time", label: "Time" },
      { key: "PF_PH1", label: "PF PH1" },
      { key: "PF_PH2", label: "PF PH2" },
      { key: "PF_PH3", label: "PF PH3" },
      { key: "PF_Avg", label: "PF Avg" },
    ],
    active_power: [
      { key: "time", label: "Time" },
      { key: "Activepower_PH1_W", label: "Active power PH1" },
      { key: "Activepower_PH2_W", label: "Active power PH2" },
      { key: "Activepower_PH3_W", label: "Activepower PH3" },
      { key: "Activepower_Total_W", label: "Active power Total" },
    ],
    reactive_power:[
      { key: "time", label: "Time" },
      { key: "ReAPower_PH1_VAR", label: "ReAPower PH1" },
      { key: "ReAPower_PH2_VAR", label: "ReAPower PH2" },
      { key: "ReAPower_PH3_VAR", label: "ReAPower PH3" },
      { key: "ReAPower_Total_VAR", label: "ReAPower Total" },
      
    ],
    apparent_power:[
      { key: "time", label: "Time" },
      { key: "AppPower_PH1_VA", label: "AppPower PH1" },
      { key: "AppPower_PH2_VA", label: "AppPower PH2" },
      { key: "AppPower_PH3_VA", label: "AppPower PH3" },
      { key: "AppPower_Total_VA", label: "AppPower Total" },

    ],
    harmonics:[
      { key: "time", label: "Time" },
      { key: "VoltageTHD_PH1", label: "VoltageTHD PH1" },
      { key: "VoltageTHD_PH2", label: "VoltageTHD PH2" },
      { key: "VoltageTHD_PH3", label: "VoltageTHD PH3" },
      { key: "CurrentTHD_PH1", label: "CurrentTHD PH1" },
      { key: "CurrentTHD_PH2", label: "CurrentTHD PH2" },
     { key: "CurrentTHD_PH3", label: "CurrentTHD PH3" },
     
    ],
    active_energy:[
      { key: "time", label: "Time" },
      { key: "FWD_ActiveEnergy_Wh", label: "FWD Active Energy" },
      { key: "Rev_ActiveEnergy_Wh", label: "Rev Active Energy" },
      // { key: "Activepower_Total_W", label: "Active Power Total" },
      
     ],
     reactive_energy:[
      { key: "time", label: "Time" },
      { key: "FWD_ReAInductiveEnergy_VARh", label: "FWD ReAInductive Energy" },
      { key: "FWD_ReACapacitiveEnergy_VARh", label: "FWD ReACapacitive Energy" },
      { key: "Rev_ReAInductiveEnergy_VARh", label: "Rev ReAInductive Energy" },
      { key: "Rev_ReACapacitiveEnergy_VARh", label: "Rev ReACapacitive Energy" },

     ],
     apparent_energy:[
      { key: "time", label: "Time" },
      { key: "FWD_AppEnergy_VAh", label: "Rev App Energy" },
      { key: "Rev_AppEnergy_VAh", label: "Rev App Energy" },
     ]

  };
  

  const fetchLogs = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get("https://cblapi.jahaann.com/log2_data.php", {
        params: {
          type, // Dynamically determined type (voltage, current, power_factor)
          meters: meter, // Dynamically retrieved meter value
          start_date: startDate,
          end_date: endDate,
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
    }, [type, meter, startDate, endDate]);
  
    const exportToExcel = () => {
      if (data.length === 0) {
        alert("No data available to export.");
        return;
      }
  
      const headers = headersMap[type]?.map((header) => header.label) || [];
      const keys = headersMap[type]?.map((header) => header.key) || [];
  
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
      XLSX.utils.book_append_sheet(workbook, worksheet, `${meter}_${type}_Logs`);
      XLSX.writeFile(workbook, `${meter}_${type}_Logs.xlsx`);
    };
  

  const renderTableHeaders = () =>
    headersMap[type]?.map((header) => (
      <th
        key={header.key}
        className="px-4 py-2 border text-center bg-blue-100 text-blue-800"
        style={{ width: "150px" }}
      >
        {header.label}
      </th>
    ));

  const renderTableRows = () =>
    data.map((row, index) => (
      <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
        {headersMap[type]?.map((header) => (
          <td
            key={header.key}
            className="px-4 py-2 border text-center"
            style={{ width: "150px" }}
          >
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
    <h1 className="text-2xl font-extrabold text-gray-700 mb-4">
  Logs
</h1>
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white flex justify-between items-center py-3 px-6 shadow-md">
        <div className="flex gap-4">
          <label className="text-gray-700 font-medium">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 px-3 py-2 border rounded-md"
            />
          </label>
          <label className="text-gray-700 font-medium">
            End Date:
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 px-3 py-2 border rounded-md"
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

      {/* Table */}
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

const Logs = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeterDataComponent />
    </Suspense>
  );
};


export default Logs;
