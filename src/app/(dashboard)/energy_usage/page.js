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

  const meters = [
    { id: "U_3_EM3", name: "Ozen 350" },
    { id: "U_4_EM4", name: "Atlas Copco" },
    { id: "U_5_EM5", name: "Compressor Aux" },
    { id: "U_6_EM6", name: "Ganzair Compressor" },
    { id: "U_7_EM7", name: "New Centac Comp#2" },
    { id: "U_8_EM8", name: "ML-132" },
    { id: "U_9_EM9", name: "New Centac Comp#1" },
    { id: "U_10_EM10", name: "Kaeser Compressor" },
    { id: "U_15", name: "Dryer" },
    { id: "U_22", name: "Solar Hostels" },
  ];
  // Mapping for meter-specific suffixes
  const meterSuffixMapping = {
    U_7_EM7: "ActiveEnergyDelivered_Wh",
    U_9_EM9: "ActiveEnergyDelivered_Wh",
    U_15: "ActiveEnergy_Delivered_kWh",
    U_22: "ActiveEnergy_Delivered_kWh",
  };
  // const handleReportTypeChange = (e) => {
  //   setReportType(e.target.value);
  // };
  const defaultSuffix = "TotalActiveEnergy_kWh";

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

   // Prepare API payload
   const payload = selectedMeters.map((meterId) => {
    const suffix = meterSuffixMapping[meterId] || defaultSuffix; // Use custom or default suffix
    return {
      meterId,
      suffix,
    };
  });
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/energyusage.php`;

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
          suffixes: payload.map((item) => item.suffix).join(","),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data);

      // Transform the data to group by date
      const transformedData = transformFetchedData(data, selectedMeters);

      setFetchedData(transformedData); // Update the fetched data
      setIsSubmitted(true);
      setTimeout(() => {
        setLoading(false); // Ensure preloader hides only after processing and rendering
      }, 0);
      // Transition to the report view
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false); // Ensure preloader is hidden
    }
  };

  // Function to transform fetched data into a structure suitable for the table
  const transformFetchedData = (data, selectedMeters) => {
    const groupedData = {};

    data.forEach((item) => {
      const { date, meterId, consumption } = item;
      if (!groupedData[date]) {
        groupedData[date] = { date };
      }
      groupedData[date][meterId] = consumption;
    });

    // Convert grouped data to array
    return Object.values(groupedData).sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
  };

  if (loading) {
    return <Preloader />; // Always show the preloader while loading is true
  }

  const handleExport = () => {
    // Prepare headers
    const headers = [
      "Date",
      ...selectedMeters.map(
        (id) => meters.find((meter) => meter.id === id)?.name
      ),
      "Sub Total (KWH)",
    ];

    // Prepare rows
    const rows = fetchedData.map((row) => {
      const subTotal = selectedMeters.reduce(
        (sum, id) => sum + (row[id] || 0),
        0
      );

      return [
        row.date,
        ...selectedMeters.map((id) =>
          row[id] !== undefined ? row[id].toFixed(2) : "0"
        ),
        subTotal.toFixed(2), // Add the subtotal for the row
      ];
    });

    // Add total row at the bottom
    const totalRow = [
      "Total (KWH)",
      ...selectedMeters.map((id) => {
        const total = fetchedData.reduce((sum, row) => sum + (row[id] || 0), 0);
        return total.toFixed(2);
      }),
      fetchedData // Add grand total for subtotals
        .reduce(
          (grandTotal, row) =>
            grandTotal +
            selectedMeters.reduce((sum, id) => sum + (row[id] || 0), 0),
          0
        )
        .toFixed(2),
    ];
    rows.push(totalRow);

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Electricity Energy Usage Report"
    );

    // Export to Excel file
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
            Electricity Energy Usage Report
          </h1>
          <div className="flex space-x-4">
            {/* Back Button with Icon */}
            <button
              onClick={() => setIsSubmitted(false)} // Logic to go back
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
              <h2 className="text-lg font-semibold text-gray-700">
                Invoice To:
              </h2>
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

        <div className="mb-4">
          <div className="flex justify-between items-start">
            {/* Export Button */}
            <button
              onClick={handleExport} // Attach the export function here
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Export
            </button>

            {/* Start Date and End Date */}
            <div className="text-right">
              <h2 className="text-lg font-bold text-blue-700">
                Consumption Report
              </h2>
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
                <th
                  className="border border-gray-300 px-4 py-2"
                  style={{ minWidth: "130px" }}
                >
                  Date
                </th>
                {/* Dynamically render selected meters as column headers */}
                {selectedMeters.map((meterId) => {
                  const meterName = meters.find(
                    (meter) => meter.id === meterId
                  )?.name;
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
                <th
                  className="border border-gray-300 px-4 py-2"
                  style={{ minWidth: "150px" }}
                >
                  Sub Total (KWH)
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render KWH rows dynamically */}
              {fetchedData?.map((row, rowIndex) => {
                const subTotal = selectedMeters.reduce(
                  (sum, meterId) => sum + (row[meterId] || 0),
                  0
                );
                return (
                  <tr
                    key={rowIndex}
                    className={`text-center ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {/* Date Column */}
                    <td className="border border-gray-300 px-4 py-2  bg-[#3989c6] text-white font-semibold">
                      {row.date}
                    </td>

                    {/* Meter Data Columns */}
                    {selectedMeters.map((meterId) => (
                      <td
                        key={meterId}
                        className="border border-gray-300 px-4 py-2 font-medium text-gray-700"
                      >
                        {row[meterId] !== undefined
                          ? row[meterId].toFixed(2)
                          : "0"}
                      </td>
                    ))}

                    {/* Sub Total Column */}
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      {subTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}

              {/* Total Row */}
              <tr className="text-center font-bold border border-gray-300 px-4 py-2  text-gray-700">
                {/* Total Label */}
                <td className="border border-gray-300 px-4 py-2  bg-[#3989c6] text-white font-semibold">
                  Total (KWH)
                </td>

                {/* Total for Each Meter */}
                {selectedMeters.map((meterId) => {
                  const total = fetchedData.reduce(
                    (sum, row) => sum + (row[meterId] || 0),
                    0
                  );
                  return (
                    <td
                      key={meterId}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {total.toFixed(2)}
                    </td>
                  );
                })}

                {/* Grand Total for Sub Total Column */}
                <td className="border border-gray-300 px-4 py-2 bg-blue-500 text-white">
                  {fetchedData
                    .reduce(
                      (grandTotal, row) =>
                        grandTotal +
                        selectedMeters.reduce(
                          (sum, meterId) => sum + (row[meterId] || 0),
                          0
                        ),
                      0
                    )
                    .toFixed(2)}
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
        Electricity Energy Usage Report
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[13px] font-bold text-[#626469] ">
            Title
          </label>
          <input
            type="text"
            value="Electricity Energy Usage Report"
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

        {/* Start Date Input */}
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
