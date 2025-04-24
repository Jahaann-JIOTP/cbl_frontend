"use client";

import React, { useState, useEffect, useCallback } from "react";
// import Div from "@/components/Div";
import DateRangePicker1 from "@/components/newcalendar";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Chart.register(...registerables);

function DashboardPage() {
  const today = new Date();
  const [range, setRange] = useState({ from: today, to: today });
  const [range1, setRange1] = useState({ from: today, to: today });
  const [range2, setRange2] = useState({ from: today, to: today });
  const [range3, setRange3] = useState({ from: today, to: today });
  const [range4, setRange4] = useState({ from: today, to: today });
  const [range5, setRange5] = useState({ from: today, to: today });
  const [range6, setRange6] = useState({ from: today, to: today });
  const [range7, setRange7] = useState({ from: today, to: today });
  const [range8, setRange8] = useState({ from: today, to: today });
  const [range9, setRange9] = useState({ from: today, to: today });

  // State for Energy Usage Data
  const [energyData, setEnergyData] = useState(null);
  const [energyLoading, setEnergyLoading] = useState(false);
  const [energyError, setEnergyError] = useState(null);
  const [energyData1, setEnergyData1] = useState(null);
  const [energyLoading1, setEnergyLoading1] = useState(false);
  const [energyError1, setEnergyError1] = useState(null);
  const [energyData2, setEnergyData2] = useState(null);
  const [energyLoading2, setEnergyLoading2] = useState(false);
  const [energyError2, setEnergyError2] = useState(null);
  const [energyData3, setEnergyData3] = useState(null);
  const [energyLoading3, setEnergyLoading3] = useState(false);
  const [energyError3, setEnergyError3] = useState(null);
  const [energyData4, setEnergyData4] = useState(null);
  const [energyLoading4, setEnergyLoading4] = useState(false);
  const [energyError4, setEnergyError4] = useState(null);
  const [energyData5, setEnergyData5] = useState(null);
  const [energyLoading5, setEnergyLoading5] = useState(false);
  const [energyError5, setEnergyError5] = useState(null);
  const [energyData6, setEnergyData6] = useState(null);
  const [energyLoading6, setEnergyLoading6] = useState(false);
  const [energyError6, setEnergyError6] = useState(null);
  const [energyData7, setEnergyData7] = useState(null);
  const [energyLoading7, setEnergyLoading7] = useState(false);
  const [energyError7, setEnergyError7] = useState(null);
  

  const [energyData8, setEnergyData8] = useState(null);
  const [energyLoading8, setEnergyLoading8] = useState(false);
  const [energyError8, setEnergyError8] = useState(null);

  const [energyData9, setEnergyData9] = useState(null);
  const [energyLoading9, setEnergyLoading9] = useState(false);
  const [energyError9, setEnergyError9] = useState(null);
  // Fetch Energy Usage Data
  const fetchEnergyData = async (startDate, endDate) => {
    setEnergyLoading(true);
    setEnergyError(null);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ozenon.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData = await response.json();
      console.log("Fetched Data:", fetchedData); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData({
        totalOnTime: fetchedData.total_on_time,
        totalOffTime: fetchedData.total_off_time,
        comsumption: fetchedData.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError("Failed to fetch energy data.");
      console.error("Error fetching energy data:", err);
    } finally {
      setEnergyLoading(false);
    }
  };
  const fetchEnergyData1 = async (startDate, endDate) => {
    setEnergyLoading1(true);
    setEnergyError1(null);

    const apiUrl1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/atlascopcoon.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl1);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData1 = await response.json();
      console.log("Fetched Data:", fetchedData1); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData1({
        totalOnTime: fetchedData1.total_on_time,
        totalOffTime: fetchedData1.total_off_time,
        consumption: fetchedData1.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError1("Failed to fetch energy data.");
      console.error1("Error fetching energy data:", err);
    } finally {
      setEnergyLoading1(false);
    }
  };
  const fetchEnergyData2 = async (startDate, endDate) => {
    setEnergyLoading2(true);
    setEnergyError2(null);

    const apiUrl2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/compressorauxon.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl2);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData2 = await response.json();
      console.log("Fetched Data:", fetchedData2); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData2({
        totalOnTime: fetchedData2.total_on_time,
        totalOffTime: fetchedData2.total_off_time,
        consumption: fetchedData2.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError2("Failed to fetch energy data.");
      console.error2("Error fetching energy data:", err);
    } finally {
      setEnergyLoading2(false);
    }
  };

  const fetchEnergyData3 = async (startDate, endDate) => {
    setEnergyLoading3(true);
    setEnergyError3(null);

    const apiUrl3 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ganzaircompressoron.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl3);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData3 = await response.json();
      console.log("Fetched Data:", fetchedData3); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData3({
        totalOnTime: fetchedData3.total_on_time,
        totalOffTime: fetchedData3.total_off_time,
        consumption: fetchedData3.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError3("Failed to fetch energy data.");
      console.error3("Error fetching energy data:", err);
    } finally {
      setEnergyLoading3(false);
    }
  };
  const fetchEnergyData4 = async (startDate, endDate) => {
    setEnergyLoading4(true);
    setEnergyError4(null);

    const apiUrl4 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/centacccompon.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl4);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData4 = await response.json();
      console.log("Fetched Data:", fetchedData4); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData4({
        totalOnTime: fetchedData4.total_on_time,
        totalOffTime: fetchedData4.total_off_time,
        consumption: fetchedData4.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError4("Failed to fetch energy data.");
      console.error4("Error fetching energy data:", err);
    } finally {
      setEnergyLoading4(false);
    }
  };
  const fetchEnergyData5 = async (startDate, endDate) => {
    setEnergyLoading5(true);
    setEnergyError5(null);

    const apiUrl5 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/commlpon.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl5);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData5 = await response.json();
      console.log("Fetched Data:", fetchedData5); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData5({
        totalOnTime: fetchedData5.total_on_time,
        totalOffTime: fetchedData5.total_off_time,
        consumption: fetchedData5.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError5("Failed to fetch energy data.");
      console.error5("Error fetching energy data:", err);
    } finally {
      setEnergyLoading5(false);
    }
  };
  const fetchEnergyData6 = async (startDate, endDate) => {
    setEnergyLoading6(true);
    setEnergyError6(null);

    const apiUrl6 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/centaccompon.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl6);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData6 = await response.json();
      console.log("Fetched Data:", fetchedData6); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData6({
        totalOnTime: fetchedData6.total_on_time,
        totalOffTime: fetchedData6.total_off_time,
        consumption: fetchedData6.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError6("Failed to fetch energy data.");
      console.error6("Error fetching energy data:", err);
    } finally {
      setEnergyLoading6(false);
    }
  };

  const fetchEnergyData7 = async (startDate, endDate) => {
    setEnergyLoading7(true);
    setEnergyError7(null);

    const apiUrl7 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/kaesercompressoron.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl7);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData7 = await response.json();
      console.log("Fetched Data:", fetchedData7); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData7({
        totalOnTime: fetchedData7.total_on_time,
        totalOffTime: fetchedData7.total_off_time,
        consumption: fetchedData7.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError7("Failed to fetch energy data.");
      console.error7("Error fetching energy data:", err);
    } finally {
      setEnergyLoading7(false);
    }
  };

  const fetchEnergyData8 = async (startDate, endDate) => {
    setEnergyLoading8(true);
    setEnergyError8(null);

    const apiUrl8 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/DSD281compressoron.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl8);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData8 = await response.json();
      console.log("Fetched Data:", fetchedData8); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData8({
        totalOnTime: fetchedData8.total_on_time,
        totalOffTime: fetchedData8.total_off_time,
        consumption: fetchedData8.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError8("Failed to fetch energy data.");
      console.error8("Error fetching energy data:", err);
    } finally {
      setEnergyLoading8(false);
    }
  };

  const fetchEnergyData9 = async (startDate, endDate) => {
    setEnergyLoading9(true);
    setEnergyError9(null);

    const apiUrl9 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Dryercompressoron.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl9);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData9 = await response.json();
      console.log("Fetched Data:", fetchedData9); // Debug to verify the response

      // Update state with total_on_time and total_off_time
      setEnergyData9({
        totalOnTime: fetchedData9.total_on_time,
        totalOffTime: fetchedData9.total_off_time,
        consumption: fetchedData9.energy_consumption_kWh,
      });
    } catch (err) {
      setEnergyError9("Failed to fetch energy data.");
      console.error9("Error fetching energy data:", err);
    } finally {
      setEnergyLoading9(false);
    }
  };
  // Fetch energy data on range change
  useEffect(() => {
    const fetchAllData = async () => {
      const fetchIfRangeValid = async (range, fetchFunction) => {
        if (range.from && range.to) {
          const startDate = format(range.from, "yyyy-MM-dd");
          const endDate = format(range.to, "yyyy-MM-dd");
          await fetchFunction(startDate, endDate);
        }
      };

      await Promise.all([
        fetchIfRangeValid(range, fetchEnergyData),
        fetchIfRangeValid(range1, fetchEnergyData1),
        fetchIfRangeValid(range2, fetchEnergyData2),
        fetchIfRangeValid(range3, fetchEnergyData3),
        fetchIfRangeValid(range4, fetchEnergyData4),
        fetchIfRangeValid(range5, fetchEnergyData5),
        fetchIfRangeValid(range6, fetchEnergyData6),
        fetchIfRangeValid(range7, fetchEnergyData7),
        fetchIfRangeValid(range8, fetchEnergyData8),
        fetchIfRangeValid(range9, fetchEnergyData9),
      ]);
    };

    // Perform an initial fetch
    fetchAllData();

    // Set up periodic updates
    const interval = setInterval(() => {
      fetchAllData();
    }, 10 * 60 * 1000); // 15 minutes

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [range, range1, range2, range3,range4,range5,range6,range7,range8,range9]);

  return (
    <main className="p-1">
      <div className="flex flex-wrap gap-3 h-[83vh] overflow-auto">
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Ozen Compressor
            </h2>
            <DateRangePicker1 range={range} setRange={setRange} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range.from
                ? `${format(range.from, "MMM dd, yyyy")} → ${
                    range.to
                      ? format(range.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError ? (
              <p className="text-red-500 text-center">{energyError}</p>
            ) : energyData ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold">
                  Consumption:{" "}
                  <span className="text-black">
                    {energyData.consumption} 00 kwh
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Atlas Copco</h2>
            <DateRangePicker1 range={range1} setRange={setRange1} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range1.from
                ? `${format(range1.from, "MMM dd, yyyy")} → ${
                    range1.to
                      ? format(range1.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading1 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError1 ? (
              <p className="text-red-500 text-center">{energyError1}</p>
            ) : energyData1 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData1.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData1.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold flex justify-center items-center">
                  Consumption:{" "}
                  <span className="text-black ml-1 flex items-baseline">
                    {energyData1.consumption}
                    <span className="ml-1">kwh</span>
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Compressor Aux
            </h2>
            <DateRangePicker1 range={range2} setRange={setRange2} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range2.from
                ? `${format(range2.from, "MMM dd, yyyy")} → ${
                    range2.to
                      ? format(range2.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading2 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError2 ? (
              <p className="text-red-500 text-center">{energyError2}</p>
            ) : energyData2 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData2.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData2.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold flex justify-center items-center">
                  Consumption:{" "}
                  <span className="text-black ml-1 whitespace-nowrap flex items-center">
                    {energyData2.consumption} <span className="ml-1">kwh</span>
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Ganzair Compressor
            </h2>
            <DateRangePicker1 range={range3} setRange={setRange3} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range3.from
                ? `${format(range3.from, "MMM dd, yyyy")} → ${
                    range3.to
                      ? format(range3.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading3 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError3 ? (
              <p className="text-red-500 text-center">{energyError3}</p>
            ) : energyData3 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData3.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData3.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold">
                  Consumption:{" "}
                  <span className="text-black">
                    {energyData3.consumption} kwh
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              New Centac Comp#2
            </h2>
            <DateRangePicker1 range={range4} setRange={setRange4} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range4.from
                ? `${format(range4.from, "MMM dd, yyyy")} → ${
                    range4.to
                      ? format(range4.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading4 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError4 ? (
              <p className="text-red-500 text-center">{energyError4}</p>
            ) : energyData4 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData4.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData4.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold">
                  Consumption:{" "}
                  <span className="text-black">
                    {energyData4.consumption} kwh
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Com ML-132</h2>
            <DateRangePicker1 range={range5} setRange={setRange5} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range5.from
                ? `${format(range5.from, "MMM dd, yyyy")} → ${
                    range5.to
                      ? format(range5.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading5 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError5 ? (
              <p className="text-red-500 text-center">{energyError5}</p>
            ) : energyData5 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData5.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData5.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold flex justify-center items-center">
                  Consumption:{" "}
                  <span className="text-black ml-1 flex items-baseline whitespace-nowrap">
                    {energyData5.consumption} <span className="ml-1">kwh</span>
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              New Centac Comp#1
            </h2>
            <DateRangePicker1 range={range6} setRange={setRange6} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range6.from
                ? `${format(range6.from, "MMM dd, yyyy")} → ${
                    range6.to
                      ? format(range6.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading6 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError6 ? (
              <p className="text-red-500 text-center">{energyError6}</p>
            ) : energyData6 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData6.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData6.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold flex justify-center items-center">
                  Consumption:{" "}
                  <span className="text-black ml-1 whitespace-nowrap flex items-center">
                    {energyData6.consumption} <span className="ml-1">kwh</span>
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Kaeser Compressor
            </h2>
            <DateRangePicker1 range={range7} setRange={setRange7} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range7.from
                ? `${format(range7.from, "MMM dd, yyyy")} → ${
                    range7.to
                      ? format(range7.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading7 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError7 ? (
              <p className="text-red-500 text-center">{energyError7}</p>
            ) : energyData7 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData7.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData7.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold">
                  Consumption:{" "}
                  <span className="text-black">
                    {energyData7.consumption} kwh
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[49%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
            DSD281(Kaeser)+ML-15
            </h2>
            <DateRangePicker1 range={range8} setRange={setRange8} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range8.from
                ? `${format(range8.from, "MMM dd, yyyy")} → ${
                    range8.to
                      ? format(range8.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading8 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError8 ? (
              <p className="text-red-500 text-center">{energyError8}</p>
            ) : energyData8 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData8.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData8.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold">
                  Consumption:{" "}
                  <span className="text-black">
                    {energyData8.consumption} kwh
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[49%] border-t-[5px] border-[#1f5897] bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
            Dryer
            </h2>
            <DateRangePicker1 range={range9} setRange={setRange9} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm mb-4">
            <span>
              {range9.from
                ? `${format(range9.from, "MMM dd, yyyy")} → ${
                    range9.to
                      ? format(range9.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* On and Off Hours Display */}
          <div className="bg-gray-100 rounded-md p-4">
            {energyLoading9 ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : energyError9 ? (
              <p className="text-red-500 text-center">{energyError9}</p>
            ) : energyData9 ? (
              <div className="text-center space-y-2">
                {/* On Hours */}
                <p className="text-[18px] text-green-600 font-bold">
                  On Hours:{" "}
                  <span className="text-black">{energyData9.totalOnTime}</span>
                </p>

                {/* Off Hours */}
                <p className="text-[18px] text-red-600 font-bold">
                  Off Hours:{" "}
                  <span className="text-black">{energyData9.totalOffTime}</span>
                </p>

                {/* Energy Consumption */}
                <p className="text-[18px] text-blue-600 font-bold">
                  Consumption:{" "}
                  <span className="text-black">
                    {energyData9.consumption} kwh
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No data available</p>
            )}
          </div>
        </div>

        {/* Add other divs from the first row here (not repeated for brevity)... */}

        {/* Second Row */}
      </div>
    </main>
  );
}

export default DashboardPage;
