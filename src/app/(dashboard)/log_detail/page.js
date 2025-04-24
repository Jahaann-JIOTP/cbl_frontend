"use client"

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
      { key: "VoltageAB_V", label: "Voltage A-B" },
      { key: "VoltageBC_V", label: "Voltage B-C" },
      { key: "VoltageCA_V", label: "Voltage C-A" },
      { key: "VoltageAN_V", label: "Voltage A-N" },
      { key: "VoltageBN_V", label: "Voltage B-N" },
      { key: "VoltageCN_V", label: "Voltage C-N" },
      { key: "VoltageLN_V", label: "Voltage L-N" },
      { key: "VoltageLL_V", label: "Voltage L-L" },
    ],
    current: [
      { key: "time", label: "Time" },
      { key: "CurrentA_A", label: "Current A" },
      { key: "CurrentC_A", label: "Current C" },
      { key: "CurrentN_A", label: "Current N" },
      { key: "CurrentAvg_A", label: "Current Avg" },
    ],
    power_factor: [
      { key: "time", label: "Time" },
      { key: "PowerFactorA", label: "Power Factor A" },
      { key: "PowerFactorB", label: "Power Factor B" },
      { key: "PowerFactorC", label: "Power Factor C" },
      { key: "PowerFactorTotal", label: "Power Factor Total" },
    ],
    active_power: [
      { key: "time", label: "Time" },
      { key: "ActivePowerA_kW", label: "Active Power A" },
      { key: "ActivePowerB_kW", label: "Active Power B" },
      { key: "ActivePowerC_kW", label: "Active Power C" },
      { key: "ActivePowerTotal_kW", label: "Active Power Total" },
    ],
    reactive_power:[
      { key: "time", label: "Time" },
      { key: "ReactivePowerA_kVAR", label: "Reactive Power A" },
      { key: "ReactivePowerB_kVAR", label: "Reactive Power B" },
      { key: "ReactivePowerC_kVAR", label: "Reactive Power C" },
      { key: "ReactivePowerTotal_kVAR", label: "Reactive Power Total" },
    ],
    apparent_power:[
      { key: "time", label: "Time" },
      { key: "ApparentPowerA_kVA", label: "Apparent Power A" },
      { key: "ApparentPowerB_kVA", label: "Apparent Power B" },
      { key: "ApparentPowerC_kVA", label: "Apparent Power C" },
      { key: "ApparentPowerTotal_kVA", label: "Apparent Power Total" },

    ],
    harmonics:[
      { key: "time", label: "Time" },
      { key: "HarmonicsTHDIA", label: "Harmonics IA" },
      { key: "HarmonicsTHDIB", label: "Harmonics IB" },
      { key: "HarmonicsTHDIC", label: "Harmonics IC" },
      { key: "HarmonicsTHDIN", label: "Harmonics IN" },
      { key: "HarmonicsTHDIG", label: "Harmonics IG" },
     
      { key: "HarmonicsTHDVAB", label: "Harmonics VAB" },
      { key: "HarmonicsTHDVCA", label: "Harmonics VCA" },
      { key: "HarmonicsTHDVBC", label: "Harmonics VBC" },
      { key: "HarmonicsTHDVAN", label: "Harmonics VAN" },
    ],
    active_energy:[
      { key: "time", label: "Time" },
      { key: "ActiveEnergyDelivered_Wh", label: "Active Energy Del" },
      { key: "ActiveEnergyReceived_Wh", label: "Active Energy Rece" },
      { key: "ActiveEnergy_DelpRec_Wh", label: "Active Energy Delp" },
      { key: "ActiveEnergy_DelmRec_Wh", label: "Active Energy Delm" },
     ],
     reactive_energy:[
      { key: "time", label: "Time" },
      { key: "ReactiveEnergyDelivered_VARh", label: "Reactive Energy Del" },
      { key: "ReactiveEnergyReceived_VARh", label: "Reactive Energy Rece" },
      { key: "ReactiveEnergy_DelpRec_VARh", label: "Reactive Energy Delp" },
      { key: "ReactiveEnergy_DelmRec_VARh", label: "Reactive Energy Delm" },

     ],
     apparent_energy:[
      { key: "time", label: "Time" },
      { key: "ApparentEnergyDelivered_VAh", label: "Apparent Energy Del" },
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
      const response = await axios.get("https://cblapi.jiotp.com/log1_data.php", {
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
          key === "time" && row[key]
            ? new Date(row[key]).toLocaleString("en-US", { hour12: true }) // Ensures AM/PM
            : row[key] ?? "-"
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