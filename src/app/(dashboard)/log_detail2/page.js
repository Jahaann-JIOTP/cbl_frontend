"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import * as XLSX from "xlsx";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "Unknown";
  const meter = searchParams.get("meter") || "U_7_EM7";
  const queryType = searchParams.get("type") || "voltage";
  const validTypes = ["voltage", "current", "power_factor", "active_power", "reactive_power", "apparent_power", "active_energy", "reactive_energy", "apparent_energy"];
  const type = validTypes.includes(queryType) ? queryType : "voltage";
 
  

 
 

  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const headersMap = {
    voltage: [
      { key: "time", label: "Time" },
      { key: "Voltage_AN_V", label: "Voltage AN" },
      { key: "Voltage_BN_V", label: "Voltage BN" },
      { key: "Voltage_CN_V", label: "Voltage CN" },
      { key: "Voltage_LN_V", label: "Voltage LN" },
      { key: "Voltage_AB_V", label: "Voltage AB" },
      { key: "Voltage_BC_V", label: "Voltage BC" },
      { key: "Voltage_CA_V", label: "Voltage CA" },
      { key: "Voltage_LL_V", label: "Voltage LL" },
    ],
    
    current: [
      { key: "time", label: "Time" },
      { key: "Current_AN_Amp", label: "Current AN" },
      { key: "Current_BN_Amp", label: "Current BN" },
      { key: "Current_CN_Amp", label: "Current CN" },
      { key: "Current_Total_Amp", label: "Current_Total" },
    ],
    power_factor: [
      { key: "time", label: "Time" },
      { key: "PowerFactor_Total", label: "PowerFactor Total" },
      
    ],
    active_power: [
      { key: "time", label: "Time" },
      { key: "ActivePower_A_kW", label: "ActivePower A" },
      { key: "ActivePower_B_kW", label: "ActivePower B" },
      { key: "ActivePower_C_kW", label: "ActivePower C" },
      { key: "ActivePower_Total_kW", label: "ActivePower Total" },
    ],
    reactive_power:[
      { key: "time", label: "Time" },
      { key: "ReactivePower_A_kVAR", label: "ReactivePower A" },
      { key: "ReactivePower_B_kVAR", label: "ReactivePower B" },
      { key: "ReactivePower_C_kVAR", label: "ReactivePower C" },
      { key: "ReactivePower_Total_kVAR", label: "ReactivePower Total" },
      
    ],
    apparent_power:[
      { key: "time", label: "Time" },
      { key: "ApparentPower_A_kVA", label: "ApparentPower A" },
      { key: "ApparentPower_B_kVA", label: "ApparentPower B" },
      { key: "ApparentPower_C_kVA", label: "ApparentPower C" },
      { key: "ApparentPower_Total_kVA", label: "ApparentPower Total" },

    ],
    // harmonics:[
    //   { key: "time", label: "Time" },
    //   { key: "VoltageTHD_PH1", label: "VoltageTHD PH1" },
    //   { key: "VoltageTHD_PH2", label: "VoltageTHD PH2" },
    //   { key: "VoltageTHD_PH3", label: "VoltageTHD PH3" },
    //   { key: "CurrentTHD_PH1", label: "CurrentTHD PH1" },
    //   { key: "CurrentTHD_PH2", label: "CurrentTHD PH2" },
    //  { key: "CurrentTHD_PH3", label: "CurrentTHD PH3" },
     
    // ],
    active_energy:[
      { key: "time", label: "Time" },
      { key: "ActiveEnergy_Delivered_kWh", label: "Active Energy Delivered" },
      { key: "ActiveEnergy_Received_kWh", label: "Active Energy Received" },
      { key: "ActiveEnergy_Total_kWh", label: "Active Energy Total" },
      
     ],
     reactive_energy:[
      { key: "time", label: "Time" },
      { key: "ReactiveEnergy_Total_kVARh", label: "Reactive Energy Total" },
     
     ],
     apparent_energy:[
      { key: "time", label: "Time" },
      { key: "ApparentEnergy_Total_kVAh", label: "Apparent Energy Total" },
      
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
      const response = await axios.get("https://cblapi.jahaann.com/log3_data.php", {
        params: {
          type,
          meters: meter,
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
      <th key={header.key} className="px-4 py-2 border text-center bg-blue-100 text-blue-800">
        {header.label}
      </th>
    ));

  const renderTableRows = () =>
    data.map((row, index) => (
      <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
        {headersMap[type]?.map((header) => (
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
          <button onClick={exportToExcel}  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 shadow-md transition-transform duration-300 transform hover:scale-105"
          >Export
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
