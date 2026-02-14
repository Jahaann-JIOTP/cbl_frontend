"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Preloader from "@/components/Preloader";

const Page = () => {
  const [data, setData] = useState([]); // Store alarms data
  const [filteredData, setFilteredData] = useState([]); // Store filtered alarms
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [filter, setFilter] = useState("Today"); // Selected filter
  const filters = ["Today", "Last7days", "Last15days", "Last30days"]; // Available filters

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show preloader
      setData([]); // Reset data

      try {
        const response = await axios.get(
          `https://cblapi.jahaann.com/comparison2.php?filter=${filter}`
        );

        // Validate and process response
        if (response.data && Array.isArray(response.data.recentalarms)) {
          setData(response.data.recentalarms);
          setError(null);
        } else {
          setError("No alarm data found.");
        }
      } catch (error) {
        console.error("API fetch error:", error);
        setError("Failed to fetch data from the server.");
      } finally {
        setLoading(false); // Hide preloader
      }
    };

    fetchData();
  }, [filter]); // Re-fetch data when the filter changes

  // Apply filtering logic
  useEffect(() => {
    const applyFilter = () => {
      const today = new Date();

      const filtered = data.filter((alarm) => {
        const alarmDate = new Date(alarm.start_time);
        const differenceInDays = Math.floor(
          (today - alarmDate) / (24 * 60 * 60 * 1000)
        );

        if (filter === "Today") {
          return alarmDate.toDateString() === today.toDateString();
        } else if (filter === "Last7days") {
          return differenceInDays <= 7;
        } else if (filter === "Last15days") {
          return differenceInDays <= 15;
        } else if (filter === "Last30days") {
          return differenceInDays <= 30;
        }

        return false;
      });

      setFilteredData(filtered);
    };

    applyFilter();
  }, [filter, data]); // Re-run when filter or data changes

  if (loading) return <Preloader />;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="w-full bg-white shadow-lg h-[85vh] rounded-lg border-t-4 border-t-[#1F5897] overflow-auto border-2 border-[#808080]">
      {/* Header */}
      <div className="p-4 bg-blue-50 border-b border-gray-300 flex justify-between items-center mb-6">
        <p className="text-lg font-bold text-black">
          Alarms History - Recent Alarms
        </p>
        <div className="relative">
          <select
            className="block w-full px-4 py-2 text-sm border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filters.map((f) => (
              <option key={f} value={f}>
                {f.replace(/([A-Z])/g, " $1")} {/* Format filter names */}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alarms Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50 border-b border-gray-300">
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Meter</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Start Time
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                End Time
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((alarm, index) => {
                const color =
                  alarm.option_selected?.includes("High Current")
                    ? "bg-red-500"
                    : alarm.option_selected?.includes("Low Voltage")
                    ? "bg-yellow-400"
                    : alarm.option_selected?.includes("High Voltage")
                    ? "bg-red-500"
                    : "bg-transparent";

                return (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-gray-100 transition duration-200"
                  >
                    {/* Side Color Bar */}
                    <td className="relative p-2 text-sm">
                      <div className={`absolute left-0 top-0 h-full w-1 ${color}`}></div>
                      <div className="pl-4">
                        <strong className="block">
                          {alarm.meter || "N/A"}
                        </strong>
                        <span
                          className={`text-sm font-medium ${
                            color === "bg-red-500"
                              ? "text-red-500"
                              : color === "bg-yellow-400"
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          {`(${alarm.option_selected || "N/A"})`}
                        </span>
                        <br />
                        <span className="text-gray-600 text-xs">
                          {alarm.url_value || "N/A"}
                        </span>
                      </div>
                    </td>
                    {/* Displaying Start Time, End Time, and Duration */}
                    <td className="p-2 text-sm text-gray-700">
                      {alarm.start_time || "N/A"}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      {alarm.end_time || "N/A"}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      {alarm.total_duration || "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No alarms available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
