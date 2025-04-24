"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import Preloader from "@/components/Preloader";

const ExamplePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeters, setSelectedMeters] = useState([]); // Array of selected meters
  const [rates, setRates] = useState(""); // State for rates input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission
  const [loading, setLoading] = useState(false);

  const meters = [
    { id: "F1_GWP", name: "GWP" },
    { id: "F2_Airjet", name: "Airjet" },
    // { id: "F3_MainLine", name: "Mainline" },
    { id: "F4_Sewing2", name: "Sewing2" },
    { id: "F5_Textile", name: "Textile" },
    { id: "F7_PG", name: "Sewing1" },
    { id: "F6_Sewing1", name: "PG" },
  ];
  // Mapping for meter-specific suffixes


  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleMeterSelect = (meterId) => {
    if (selectedMeters.includes(meterId)) {
      // Deselect if already selected
      setSelectedMeters(selectedMeters.filter((id) => id !== meterId));
    } else {
      // Add new selection
      setSelectedMeters([...selectedMeters, meterId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all meters
      setSelectedMeters(meters.map((meter) => meter.id));
    } else {
      // Clear selection
      setSelectedMeters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || selectedMeters.length === 0) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true); // Show the preloader immediately

    try {
      // Prepare query parameters
      const meterIds = encodeURIComponent(JSON.stringify(selectedMeters));
      const suffixes = encodeURIComponent(JSON.stringify(["TotalFlow"])); // Fixed suffix
      const apiUrl = `https://cblapi.jiotp.com/production_cost_report.php?meterIds=${meterIds}&suffixes=${suffixes}&start_date=${startDate}&end_date=${endDate}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data);

      // Validate the structure
      if (data?.flow_per_production) {
        setFetchedData(data.flow_per_production);
      } else if (data?.daily_consumption) {
        setFetchedData(data.daily_consumption);
      } else {
        alert("No valid data found in the API response.");
      }

      setIsSubmitted(true); // Transition to the report view
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false); // Ensure preloader is hidden
    }
  };





  if (loading) {
    return <Preloader />; // Always show the preloader while loading is true
  }
  const handleRatesChange = (e) => {
    setRates(parseFloat(e.target.value) || 0); // Convert input to number
  };
  const handleExport = () => {
    if (!fetchedData) {
      alert("No data available to export.");
      return;
    }
  
    const transformedData = [];
    const meterSubtotals = { GWP: 0, Airjet: 0, Sewing2: 0, Textile: 0, Sewing1: 0, PG: 0, Total: 0 };
    const allMeters = ["GWP", "Airjet", "Sewing2", "Textile", "Sewing1", "PG"];
    const nonZeroColumns = new Set();
  
    Object.keys(fetchedData).forEach((date) => {
      const dailyData = fetchedData[date];
      const row = { Date: date };
  
      let subtotal = 0;
      allMeters.forEach((meter) => {
        let value = (dailyData[`${meter}_total_flow`] || 0) * (rates || 1);
        value = parseFloat(value.toFixed(2)); // Round to 2 decimal places
        row[meter] = value;
        subtotal += value;
        if (value !== 0) nonZeroColumns.add(meter);
        meterSubtotals[meter] += value;
      });
  
      row.SubTotal = parseFloat(subtotal.toFixed(2)); // Round subtotal
      meterSubtotals.Total += subtotal;
      transformedData.push(row);
    });
  
    const totalRow = { Date: "Total Price (PKR)" };
    allMeters.forEach((meter) => {
      totalRow[meter] = parseFloat(meterSubtotals[meter].toFixed(2)); // Round total values
    });
    totalRow.SubTotal = parseFloat(meterSubtotals.Total.toFixed(2)); // Round total subtotal
    transformedData.push(totalRow);
  
    // Ensure "SubTotal" is the last column
    const filteredMeters = [...allMeters.filter((meter) => nonZeroColumns.has(meter)), "SubTotal"];
    const worksheet = XLSX.utils.json_to_sheet(transformedData, { header: ["Date", ...filteredMeters] });
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "Production_Report.xlsx");
  };
  
  
  

  if (isSubmitted && fetchedData) {
    console.log("Fetched Data:", fetchedData);
  
    // Initialize transformed data and meter subtotals
    const transformedData = [];
    const meterSubtotals = {
      GWP: 0,
      Airjet: 0,
      Sewing2: 0,
      Textile: 0,
      Sewing1: 0,
      PG: 0,
      Total: 0,
    };
  
    const allMeters = ["GWP", "Airjet", "Sewing2", "Textile", "Sewing1", "PG"];
    const nonZeroColumns = new Set(); // To store columns that have non-zero values
  
    // Process each date and add data to the transformedData array
    Object.keys(fetchedData).forEach((date) => {
      const dailyData = fetchedData[date];
      const row = { date, SubTotal: 0 };
  
      allMeters.forEach((meter) => {
        const value = (dailyData[`${meter}_total_flow`] || 0) * (rates || 1);
        row[meter] = value;
        row.SubTotal += value;
  
        if (value !== 0) {
          nonZeroColumns.add(meter); // Add non-zero meter columns
        }
  
        meterSubtotals[meter] += value;
      });
  
      meterSubtotals.Total += row.SubTotal;
      transformedData.push(row);
    });
  
    // Add total row at the end of transformed data
    const totalRow = { date: "Total Price (PKR)", SubTotal: meterSubtotals.Total };
    allMeters.forEach((meter) => {
      totalRow[meter] = meterSubtotals[meter];
    });
    transformedData.push(totalRow);
  
    // Filter out meters that only have 0 values
    const filteredMeters = [...allMeters.filter((meter) => nonZeroColumns.has(meter)), "SubTotal"];
  

    return (
      <div
        className="shadow-lg rounded-[8px] p-6 w-full h-[85vh] overflow-auto bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
        style={{ minHeight: "85vh" }}
      >
        {/* Header and other UI elements */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-700">
            Compressed Air Production Cost Report
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr></hr>
  
        {/* Invoice and Billing Details */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Invoice To:</h2>
              <p className="text-gray-600">Crescent Bahuman Limited</p>
              <p className="text-gray-600">
                Sargodha Rd, Pindi Bhattian, Hafizabad, Punjab
              </p>
              <p className="text-gray-600">Phone: (0547) 531021</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-gray-700">
                Jahaann Technologies
              </h2>
              <p className="text-gray-600">
                22-C Block, G.E.C.H.S, Phase 3 Peco Road, Lahore, Pakistan
              </p>
              <p className="text-gray-600">Phone: +924235949261</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-green-500 to-red-500 my-4"></div>
        <br></br>
  
        {/* Export Button and Date Range */}
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Export
            </button>
  
            <div className="text-right">
              <h2 className="text-lg font-bold text-blue-700">Billing Report</h2>
              <div className="text-gray-600 mt-2">
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-center text-sm font-semibold text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                {filteredMeters.map((meter) => (
                  <th
                    key={meter}
                    className={`border border-gray-300 px-4 py-2 ${
                      meter === "SubTotal" ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {meter === "SubTotal" ? "Total Price (PKR)" : meter}
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody>
              {transformedData.map((row, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                  {filteredMeters.map((meter) => (
                    <td
                      key={meter}
                      className={`border border-gray-300 px-4 py-2 ${
                        meter === "SubTotal"
                          ? "bg-[#3989c6] text-white font-semibold"
                          : ""
                      }`}
                    >
                      {row[meter] ? row[meter].toFixed(2) : "0.00"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Footer */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="border-l-4 border-[#3a8ac5] mb-2">
            Thank you very much for doing business with us. We look forward to
            working with you again.
          </p>
          <div className="flex justify-between mt-4 border-t pt-4 bg-[#e6e4e4] p-4">
            <p>
              Generated on: {new Date().toLocaleTimeString()}, Date:{" "}
              {new Date().toISOString().split("T")[0]}
            </p>
            <p>Generated By: Jahaann Technologies </p>
            <p> Email: info@jahaann.com</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="Production-cost-report"
      className="shadow-lg rounded-[8px] p-6 w-full h-full bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
      style={{ minHeight: "85vh" }}
    >
      <h1 className="text-lg font-bold text-gray-700 mb-4">
        Compressed Air Production Cost Report
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[13px] font-bold text-[#626469] ">
            Title
          </label>
          <input
            type="text"
            // placeholder="Compressed Air Production Cost Report"
            value="Compressed Air Production Cost Report"
            // onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
            style={{
              boxShadow: "rgba(98, 100, 105, 0.2) 0px 1px 3px 0px inset", // Box shadow
            }}
          />
        </div>
        {/* Sources Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469] mb-2">
            Sources
          </label>
          <button
            type="button"
            onClick={toggleModal}
            className="w-full p-2 border rounded-md text-gray-700"
            style={{
              background: "linear-gradient(#bdc6cd,#bababa)",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset",
              borderColor: "#9fa0a4",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(#bababa, #bababa)")
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(#bdc6cd, #bababa)")
            }
          >
            {selectedMeters.length > 0
              ? `Selected: ${selectedMeters.length} Meters`
              : "Select Sources"}
          </button>

          {/* Conditionally show the input field below */}
          {selectedMeters.length > 0 && (
            <div className="mt-2">
              <label className="block text-[13px] font-bold text-[#626469]">
                Selected Sources
              </label>
              <input
                type="text"
                value={selectedMeters
                  .map((id) => meters.find((meter) => meter.id === id)?.name)
                  .join(", ")}
                readOnly
                className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
              />
            </div>
          )}
        </div>

        {/* Rates Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469]">
            Rates
          </label>
          <input
            type="number"
            step="0.01"
            value={rates}
            onChange={handleRatesChange} // Updated handler
            className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
            placeholder="0.0"
            required
          />
        </div>

        {/* Start Date Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469]">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={(e) => e.target.showPicker()} // Open calendar on focus
            className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
            max={endDate} // Restrict start date to be before or equal to the end date
          />
        </div>

        {/* End Date Input */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469]">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={(e) => e.target.showPicker()} // Open calendar on focus
            className="w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
            min={startDate} // Restrict end date to be after or equal to the start date
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-[240px] h-[35px] block font-sans text-[16px] font-bold text-white no-underline uppercase text-center  
             pt-[4px] mt-[10px] ml-[5px] relative cursor-pointer border-none rounded-[5px] 
             bg-[#1784d9] bg-gradient-to-b from-[#1784d9] to-[#389de9] 
             shadow-[inset_0px_1px_0px_#2ab7ec,_0px_5px_0px_#497a78,_0px_10px_5px_#999]"
          >
            {loading ? "Loading..." : "GENERATE REPORT"}
          </button>
        </div>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
            <div className="bg-blue-200 p-2 rounded-t-lg">
              <h2 className="text-sm font-bold text-gray-700">
                Select Sources
              </h2>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
              {/* Select All Checkbox */}
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedMeters.length === meters.length}
                    onChange={handleSelectAll}
                    className="form-checkbox rounded"
                  />
                  <span className="ml-2">Select All</span>
                </label>
              </div>
              {/* Individual Meter Checkboxes */}
              {meters.map((meter) => (
                <div key={meter.id} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMeters.includes(meter.id)}
                      onChange={() => handleMeterSelect(meter.id)}
                      className="form-checkbox rounded"
                    />
                    <span className="ml-2">{meter.name}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end p-2 space-x-4">
              {/* OK Button */}
              <button
                onClick={() => {
                  // Add your logic for the OK button
                  toggleModal(); // Optionally close the modal
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>

              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamplePage;
