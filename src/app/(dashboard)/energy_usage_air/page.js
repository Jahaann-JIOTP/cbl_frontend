"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import Preloader from "@/components/Preloader";

const ExamplePage = () => {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeters, setSelectedMeters] = useState([]); // Array of selected meters
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("SCF"); // Default unit is SCF

  const meters = [
    { id: "F1_GWP", name: "GWP" },
    { id: "F2_Airjet", name: "Airjet" },
    { id: "F3_MainLine", name: "Mainline" },
    { id: "F4_Sewing2", name: "Sewing2" },
    { id: "F5_Textile", name: "Textile" },
    { id: "F7_PG", name: "Sewing1" },
    { id: "F6_Sewing1", name: "PG" },
  ];

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
      alert("Please fill out all fields");
      return;
    }
    // const data = rows.map((row) => [
    //   row.date,
    //   ...selectedMeters.map((id) => row[id] || ""),  // Ensure values exist
    //   row.subTotal,
    // ]);

    const suffix = "TotalFlow"; // Fixed suffix
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/energyusageair.php`;

    setLoading(true); // Show the preloader immediately

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          meterIds: selectedMeters,
          suffixes: suffix,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data);

      // Transform the data to group by date and apply unit conversion
      const transformedData = transformFetchedData(data, selectedMeters);

      setFetchedData(transformedData); // Update the fetched data
      setIsSubmitted(true);
      setTimeout(() => {
        setLoading(false); // Ensure preloader hides only after processing and rendering
      }, 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false); // Ensure preloader is hidden
    }
  };

  const transformFetchedData = (data, selectedMeters) => {
    const conversionFactor = unit === "m³" ? 1000 / 35.31 : 1; // Conversion factor for m³

    const groupedData = {};

    data.forEach((item) => {
      const { date, meterId, consumption } = item;
      if (!groupedData[date]) {
        groupedData[date] = { date };
      }
      groupedData[date][meterId] = consumption * conversionFactor;
    });

    // Convert grouped data to array
    return Object.values(groupedData).sort((a, b) => (a.date > b.date ? 1 : -1));
  };

  if (loading) {
    return <Preloader />; // Always show the preloader while loading is true
  }
  const handleExport = () => {
    if (!fetchedData || fetchedData.length === 0) {
        console.error("No data available for export.");
        return;
    }

    const headers = [
        "Date",
        ...selectedMeters.map((id) => meters.find((meter) => meter.id === id)?.name || ""),
        `Sub Total (${unit})`,
    ];

    // ✅ Define `rows` before using it
    let rows = [];  // Ensure `rows` is initialized

    // ✅ Populate `rows` with fetched data
    rows = fetchedData.map((row) => [
        row.date,
        ...selectedMeters.map((id) => row[id] || 0),
        selectedMeters.reduce((sum, id) => sum + (row[id] || 0), 0),
    ]);

    // ✅ Calculate Total Row and Push to `rows`
    const totalRow = [
        "Total",
        ...selectedMeters.map((id) =>
            fetchedData
                .reduce((grandTotal, row) => grandTotal + (row[id] || 0), 0)
                .toFixed(0)
        ),
        selectedMeters.reduce(
            (sum, id) =>
                fetchedData.reduce((grandTotal, row) => grandTotal + (row[id] || 0), 0),
            0
        ).toFixed(0),
    ];
    
    rows.push(totalRow); // ✅ Now `rows` is correctly initialized before pushing

    // ✅ Now Create Excel Sheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();

    // ✅ Shortened Sheet Name to fix error
    XLSX.utils.book_append_sheet(workbook, worksheet, "Energy Usage");

    // ✅ Export Excel File
    XLSX.writeFile(workbook, "Energy_Usage_Report.xlsx");
};


  if (isSubmitted && fetchedData) {
    return (
      <div
        className="shadow-lg rounded-[8px] p-6 w-full h-[85vh] overflow-auto bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
        style={{ minHeight: "85vh" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-700">
            Compressed Air Energy Usage Report
          </h1>
          <div className="flex space-x-4">
            {/* Back Button with Icon */}
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
        <hr />
    
        <div className="mb-8">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Invoice To:</h2>
              <p className="text-gray-600">Crescent Bahuman Limited</p>
              <p className="text-gray-600">Sargodha Rd, Pindi Bhattian, Hafizabad, Punjab</p>
              <p className="text-gray-600">Phone: (0547) 531021</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-gray-700">Jahaann Technologies</h2>
              <p className="text-gray-600">
                22-C Block, G.E.C.H.S, Phase 3 Peco Road, Lahore, Pakistan
              </p>
              <p className="text-gray-600">Phone: +924235949261</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-green-500 to-red-500 my-4"></div>
    
        <div className="mb-4">
          <div className="flex justify-between items-start">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Export
            </button>
    
            {/* Unit Selection */}
            <div className="flex items-center w-full mt-[55px]">
  <label htmlFor="unitSelection" className="text-gray-700 font-semibold ml-[-80px]">
    Unit:
  </label>
  <select
    id="unitSelection"
    value={unit}
    onChange={(e) => setUnit(e.target.value)}
    className="px-4 py-2 border rounded-md text-gray-700 ml-[10px]"
  >
    <option value="SCF">SCF</option>
    <option value="m3">m³</option>
  </select>
</div>

    
            {/* Start Date and End Date */}
            <div className="text-right">
  <h2 className="text-lg font-bold text-blue-700 whitespace-nowrap">Consumption Report</h2>
  <div className="text-gray-600 mt-2">
    <p>Start Date: {startDate}</p>
    <p>End Date: {endDate}</p>
  </div>
</div>
          </div>
        </div>
    
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-center text-sm font-semibold text-gray-700">
                <th className="border border-gray-300 px-4 py-2" style={{ minWidth: "130px" }}>
                  Date
                </th>
                {selectedMeters.map((meterId) => {
                  const meterName = meters.find((meter) => meter.id === meterId)?.name;
                  return (
                    <th
                      key={meterId}
                      className="border border-gray-300 px-4 py-2"
                      style={{ minWidth: "150px" }}
                    >
                      {meterName}
                    </th>
                  );
                })}
                <th className="border border-gray-300 px-4 py-2" style={{ minWidth: "150px" }}>
                  Sub Total {unit}
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchedData?.map((row, rowIndex) => {
                const subTotal = selectedMeters.reduce((sum, meterId) => sum + (row[meterId] || 0), 0);
                return (
                  <tr
                    key={rowIndex}
                    className={`text-center ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="border border-gray-300 px-4 py-2 bg-[#3989c6] text-white font-semibold">
                      {row.date}
                    </td>
                    {selectedMeters.map((meterId) => (
                      <td key={meterId} className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {row[meterId] !== undefined
                          ? (unit === "m3"
                              ? (row[meterId] * 1000 / 35.31).toFixed(0)
                              : row[meterId].toFixed(0))
                          : "0"}
                      </td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      {unit === "m3"
                        ? (subTotal * 1000 / 35.31).toFixed(0)
                        : subTotal.toFixed(0)}
                    </td>
                  </tr>
                );
              })}
              <tr className="text-center font-bold border border-gray-300 px-4 py-2 text-gray-700">
                <td className="border border-gray-300 px-4 py-2 bg-[#3989c6] text-white font-semibold">
                  Total {unit}
                </td>
                {selectedMeters.map((meterId) => {
                  const total = fetchedData.reduce((sum, row) => sum + (row[meterId] || 0), 0);
                  return (
                    <td key={meterId} className="border border-gray-300 px-4 py-2">
                      {unit === "m3"
                        ? (total * 1000 / 35.31).toFixed(0)
                        : total.toFixed(0)}
                    </td>
                  );
                })}
                <td className="border border-gray-300 px-4 py-2 bg-blue-500 text-white">
                  {unit === "m3"
                    ? (fetchedData.reduce(
                        (grandTotal, row) =>
                          grandTotal +
                          selectedMeters.reduce((sum, meterId) => sum + (row[meterId] || 0), 0),
                        0
                      ) *1000 / 35.31).toFixed(0)
                    : fetchedData
                        .reduce(
                          (grandTotal, row) =>
                            grandTotal +
                            selectedMeters.reduce((sum, meterId) => sum + (row[meterId] || 0), 0),
                          0
                        )
                        .toFixed(0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-sm text-gray-600">
          <div className="flex justify-between mt-4 border-t pt-4 bg-[#e6e4e4] p-4">
            <p>
              Generated on: {new Date().toLocaleTimeString()}, Date:{" "}
              {new Date().toISOString().split("T")[0]}
            </p>
            <p>Generated By: Jahaann Technologies </p>
            <p>Email: info@jahaann.com</p>
          </div>
        </div>
      </div>
    );
    }

    return (
      <div
        id="energy-cost-report"
        className="shadow-lg rounded-[8px] p-6 w-full h-full bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
        style={{ minHeight: "85vh" }}
      >
        <h1 className="text-lg font-bold text-gray-700 mb-4">
          Compressed Air Energy Usage Report
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[13px] font-bold text-[#626469] ">
              Title
            </label>
            <input
              type="text"
              value="Compressed Air Energy Usage Report"
              className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              style={{
                boxShadow: "rgba(98, 100, 105, 0.2) 0px 1px 3px 0px inset", // Box shadow
              }}
              readOnly
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
    
          {/* Unit Selection */}
          <div>
            <label className="block text-[13px] font-bold text-[#626469]">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
            >
              <option value="SCF">SCF</option>
              <option value="m3">m³</option>
            </select>
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
              {loading ? "Loading..." : "Generate Report"}
            </button>
          </div>
        </form>
    
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
              <div className="bg-blue-200 p-2 rounded-t-lg">
                <h2 className="text-sm font-bold text-gray-700">Select Sources</h2>
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
                  onClick={toggleModal}
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
