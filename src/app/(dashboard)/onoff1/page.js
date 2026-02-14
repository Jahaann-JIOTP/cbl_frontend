"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";

function DashboardPage() {
  const today = new Date();
  const [startDate, setStartDate] = useState(format(today, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedMeters, setSelectedMeters] = useState([
    "U_4_EM4_Activepower_Total_W",
  ]);
  const [cyclesData, setCyclesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const meterNames = {
    U_3_EM3_Activepower_Total_W: "Ozen 350",
    U_4_EM4_Activepower_Total_W: "Atlas Copco",
    U_5_EM5_Activepower_Total_W: "Compressor Aux",
    U_6_EM6_Activepower_Total_W: "Ganzair Compressor",
    U_7_EM7_ActivePowerTotal_kW: "New Centac Comp#2",
    U_8_EM8_Activepower_Total_W: "ML-132",
    U_9_EM9_ActivePowerTotal_kW: "New Centac Comp#1",
    // U_10_EM10_Activepower_Total_W: "Kaeser Compressor",
    U_15_ActivePower_Total_kW: "Dryer",
    U_21_ActivePower_Total_kW: "DSD281(Kaeser)+ML-15",
  };

  const handleMeterChange = (meter) => {
    setSelectedMeters((prev) =>
      prev.includes(meter) ? prev.filter((m) => m !== meter) : [...prev, meter]
    );
  };

  const exportToExcel = () => {
    const sheetData = [
      ["Compressor Name", "Cycle", "On Time", "Off Time", "Duration"],
    ];

    selectedMeters.forEach((meter) => {
      const cycles = cyclesData[meter] || [];
      if (cycles.length > 0) {
        cycles.forEach((cycle) => {
          sheetData.push([
            meterNames[meter] || meter,
            cycle.cycle,
            cycle.on_time || "No Data",
            cycle.off_time || "Still Off",
            cycle.duration || "No Activity",
          ]);
        });
      } else {
        sheetData.push([
          meterNames[meter] || meter,
          "Still Off",
          "Still Off",
          "Still Off",
          "Still Off",
        ]);
      }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compressors Data");
    XLSX.writeFile(workbook, "Compressors_On_Off_Cycles.xlsx");
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      if (!startDate || !endDate || selectedMeters.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://cblapi.jahaann.com/ozoncycle.php?start_date=${startDate}&end_date=${endDate}&meter=${selectedMeters.join(
            ","
          )}`
        );
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();

        const processedData = {};
        for (const [meter, cyclesObj] of Object.entries(data.meters || {})) {
          processedData[meter] = Object.values(cyclesObj);
        }

        setCyclesData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [startDate, endDate, selectedMeters]);

  return (
    <main className="p-1">
      <div className="flex flex-wrap gap-3">
        <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Compressors On/Off Cycles
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={exportToExcel}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md transition-transform duration-300 transform hover:scale-105 border h-10"
              >
                Export
              </button>
              <div className="flex items-center gap-2">
                <label htmlFor="start-date" className="text-sm">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md h-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="end-date" className="text-sm">
                  End Date:
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md h-10"
                />
              </div>
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="p-2 border rounded bg-white text-gray-700 w-60 flex items-center justify-between h-10">
                  <span>Select Meters</span>
                  <span className="text-gray-500">▼</span>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute z-10 bg-white border rounded shadow-md w-auto min-w-[200px] max-w-[300px] overflow-auto"
                    style={{ right: 0 }}
                  >
                    {Object.entries(meterNames).map(([meter, name]) => (
                      <label
                        key={meter}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          value={meter}
                          checked={selectedMeters.includes(meter)}
                          onChange={() => handleMeterChange(meter)}
                        />
                        {name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : Object.entries(cyclesData).length > 0 ? (
            <div>
              {Object.entries(cyclesData).map(([meter, cycles]) => (
                <div key={meter} className="mb-8">
                  <h3 className="text-gray-700 font-semibold">
                    {meterNames[meter] || meter}
                  </h3>
                  <div className="overflow-x-auto overflow-y-auto mb-5">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
                      <thead className="sticky top-0 bg-gray-200">
                        <tr>
                          <th className="border border-gray-300 px-2 py-1 text-center">
                            Cycle
                          </th>
                          <th className="border border-gray-300 px-3 py-1 text-center">
                            On Time
                          </th>
                          {/* <th className="border border-gray-300 px-3 py-1 text-center">
                            On Time End
                          </th> */}
                          
                          {/* <th className="border border-gray-300 px-3 py-1 text-center">
                            Off Time Start
                          </th> */}
                          <th className="border border-gray-300 px-3 py-1 text-center">
                            Off Time
                          </th>
                          <th className="border border-gray-300 px-3 py-1 text-center">
                            On Time Duration
                          </th>
                          <th className="border border-gray-300 px-3 py-1 text-center">
                            Off Time Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cycles.length > 0 ? (
                          cycles.map((cycle, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                              <td className="border border-gray-300 px-4 py-2 bg-[#3989c6] text-white text-center">
                                {cycle.cycle}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                {cycle.on_time_start || "No Data"}
                              </td>
                              {/* <td className="border border-gray-300 px-4 py-2 text-center">
                                {cycle.on_time_end || "Still On"}
                              </td> */}
                              
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                {cycle.off_time_start || "...."}
                              </td>
                              {/* <td className="border border-gray-300 px-4 py-2 text-center">
                                {cycle.off_time_end || "...."}
                              </td> */}
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                {cycle.on_duration || "No Activity"}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                {cycle.off_duration || "...."}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                            >
                              Still Off
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No data available for the selected meter(s).</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
