"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import Preloader from "@/components/Preloader";

const ExamplePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeters, setSelectedMeters] = useState([]); // Array of selected meters
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([
    { name: "Shift 1", startTime: "00:00", endTime: "01:00" },
  ]);
  // Handle adding a new shift
  const addShift = () => {
    setShifts([
      ...shifts,
      { name: `Shift ${shifts.length + 1}`, startTime: "", endTime: "" },
    ]);
  };

  // Handle removing a shift
  const removeShift = (index) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  // Handle updating shift name
  const handleShiftNameChange = (index, name) => {
    const updatedShifts = [...shifts];
    updatedShifts[index].name = name;
    setShifts(updatedShifts);
  };

  // Handle updating shift time
  const handleShiftTimeChange = (index, field, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][field] = value;
    setShifts(updatedShifts);
  };

  const meters = [
    { id: "U11_SM11", name: "Solar 1" },
    { id: "U12_SM12", name: "Solar 2" },
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

    // Validation: Ensure required fields are filled out
    if (!startDate || !endDate || selectedMeters.length === 0) {
      alert("Please fill out all fields");
      return;
    }

    const suffix = "PowerYield_EXP_Total_kWh"; // Fixed suffix
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/energyshiftsolar.php`;

    setLoading(true); // Show preloader while data is being fetched

    try {
      // Prepare the API request payload
      const payload = {
        start_date: startDate,
        end_date: endDate,
        meterIds: selectedMeters,
        suffixes: suffix,
        shifts: shifts, // Include shifts in the request body
      };

      console.log("Sending API Request with Payload:", payload);

      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the payload as JSON
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorText = await response.text(); // Capture backend error if any
        console.error("Backend Error:", errorText);
        throw new Error("Failed to fetch data from the API");
      }

      // Parse the API response
      const data = await response.json();
      console.log("Raw Data from API:", data);

      // Transform the fetched data
      const transformedData = transformFetchedData(data, selectedMeters);
      console.log("Transformed Data:", transformedData);

      // Update state with the transformed data
      if (transformedData.length > 0) {
        setFetchedData(transformedData);
        setIsSubmitted(true); // Mark as submitted to transition to the report view
      } else {
        alert("No data available for the selected filters.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false); // Always hide the preloader
    }
  };

  // Function to transform fetched data into a structure suitable for rendering
  const transformFetchedData = (data) => {
    // Verify and log raw data
    console.log("Raw Data from API:", data);

    // Ensure the data has the expected structure
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("No data available or data format is invalid.");
      return [];
    }

    // Process the data (if any additional processing is needed)
    const processedData = data.map((item) => {
      const { date, ...meters } = item;

      // Validate required keys
      if (!date || Object.keys(meters).length === 0) {
        console.warn("Invalid data item:", item);
        return null;
      }

      return {
        date,
        ...meters, // Preserve all meter and shift data as-is
      };
    });

    // Filter out null entries (invalid data items)
    const validData = processedData.filter((item) => item !== null);

    // Log the processed data
    console.log("Processed Data:", validData);

    return validData;
  };

  // Show the preloader if loading
  if (loading) {
    return <Preloader />;
  }

  const exportToExcel = () => {
    if (!fetchedData || fetchedData.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    const tableData = [];
  
    // Prepare the header row
    const header = ["Date", "Source", ...shifts.map((shift) => shift.name + " (kWh)"), "Total (kWh)"];
    tableData.push(header);
  
    // Prepare the data rows
    fetchedData.forEach((dateGroup) => {
      const { date, ...metersData } = dateGroup; // Extract date and meter data
  
      Object.keys(metersData).forEach((meterId) => {
        const meterName =
          Array.isArray(meters) && meters.find((meter) => meter.id === meterId)?.name ||
          "Unknown";
  
        const rowData = [date, meterName];
  
        // Add shift values
        const shiftValues = shifts.map((shift) =>
          metersData[meterId]?.[shift.name]?.toFixed(2) || "0.00"
        );
        rowData.push(...shiftValues);
  
        // Add total for the meter
        const total = shifts.reduce(
          (sum, shift) => sum + (metersData[meterId]?.[shift.name] || 0),
          0
        );
        rowData.push(total.toFixed(2));
  
        tableData.push(rowData);
      });
    });
  
    // Prepare the total row
    const totalRow = ["", "Total"];
    shifts.forEach((shift) => {
      const shiftTotal = fetchedData.reduce(
        (dateSum, dateGroup) =>
          dateSum +
          Object.keys(dateGroup)
            .filter((key) => key !== "date")
            .reduce((sum, meterId) => sum + (dateGroup[meterId]?.[shift.name] || 0), 0),
        0
      );
      totalRow.push(shiftTotal.toFixed(2));
    });
  
    const grandTotal = fetchedData.reduce(
      (grandSum, dateGroup) =>
        grandSum +
        Object.keys(dateGroup)
          .filter((key) => key !== "date")
          .reduce(
            (dateSum, meterId) =>
              dateSum +
              shifts.reduce((sum, shift) => sum + (dateGroup[meterId]?.[shift.name] || 0), 0),
            0
          ),
      0
    );
    totalRow.push(grandTotal.toFixed(2));
  
    tableData.push(totalRow);
  
    // Convert data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
  
    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Energy Data");
  
    // Export the workbook to a file
    XLSX.writeFile(workbook, "Solar Energy Usage By Shift.xlsx");
  };
  function formatTime(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  
  

  if (isSubmitted && fetchedData) {
    return (
      <div
        className="shadow-lg rounded-[8px] p-6 w-full h-[85vh] overflow-auto bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
        style={{ minHeight: "85vh" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-700">
           Solar Energy Usage By Shift
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
              onClick={exportToExcel} // Attach the export function here
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
          {fetchedData.map((dateGroup, groupIndex) => (
            <div
              key={groupIndex}
              className="mb-8 border border-gray-300 rounded-lg overflow-hidden"
            >
              {/* Date Header */}
              <div className="bg-[#3b8bc8] text-white font-bold text-lg px-4 py-2">
                {dateGroup.date}
              </div>

              {/* Table for Each Date */}
              <table className="w-full border-collapse">
              <thead>
                  <tr className="bg-[#b4d5f8] text-center font-semibold">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Source
                    </th>
                    {shifts.map((shift) => (
                      <th
                        key={shift.name}
                        className="border border-gray-300 px-4 py-2"
                        title={`Start Time: ${shift.startTime}, End Time: ${shift.endTime}`} // Tooltip with shift times
                      >
                        {shift.name} <br />
                        <span className="text-sm ">
                          ({formatTime(shift.startTime)} - {formatTime(shift.endTime)})
                        </span>
                      </th>
                    ))}
                    <th className="border border-gray-300 px-4 py-2">
                      Total (kWh)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows for Each Source */}
                  {selectedMeters.map((meterId, meterIndex) => {
                    const meterName =
                      meters.find((meter) => meter.id === meterId)?.name ||
                      "Unknown";
                    const total = shifts.reduce(
                      (sum, shift) =>
                        sum + (dateGroup[meterId]?.[shift.name] || 0),
                      0
                    );
                    // console.log("Complete dateGroup object:", dateGroup);

                    return (
                      <tr
                        key={meterIndex}
                        className={`text-center ${
                          meterIndex % 2 === 0 ? "bg-white" : "bg-green-50"
                        }`}
                      >
                        {/* Source Name */}
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {meterName}
                        </td>

                        {/* Shift Data */}
                        {shifts.map((shift) => (
                          <td
                            key={shift.name}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {dateGroup[meterId]?.[shift.name]?.toFixed(2) ||
                              "0.00"}
                          </td>
                        ))}

                        {/* Total for Source */}
                        <td className="border border-gray-300 px-4 py-2 font-bold">
                          {total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total Row for All Sources */}
                  <tr className="bg-[#b4d5f8] text-center font-bold">
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      Total
                    </td>
                    {shifts.map((shift) => {
                      const shiftTotal = selectedMeters.reduce(
                        (sum, meterId) =>
                          sum + (dateGroup[meterId]?.[shift.name] || 0),
                        0
                      );
                      return (
                        <td
                          key={shift.name}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {shiftTotal.toFixed(2)}
                        </td>
                      );
                    })}
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      {selectedMeters
                        .reduce(
                          (grandTotal, meterId) =>
                            grandTotal +
                            shifts.reduce(
                              (sum, shift) =>
                                sum + (dateGroup[meterId]?.[shift.name] || 0),
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
          ))}
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
       Solar Energy Usage By Shift
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[13px] font-bold text-[#626469] ">
            Title
          </label>
          <input
            type="text"
            value="Solar Energy Usage By Shift"
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
        {/* Shifts Section */}
        <div>
          <label className="block text-[13px] font-bold text-[#626469] mb-2">
            Shifts
          </label>
          {shifts.map((shift, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={shift.name}
                onChange={(e) => handleShiftNameChange(index, e.target.value)}
                placeholder={`Shift ${index + 1}`}
                className="w-1/3 p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              />
              <input
                type="time"
                value={shift.startTime}
                onChange={(e) =>
                  handleShiftTimeChange(index, "startTime", e.target.value)
                }
                className="w-1/3 p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              />
              <input
                type="time"
                value={shift.endTime}
                onChange={(e) =>
                  handleShiftTimeChange(index, "endTime", e.target.value)
                }
                className="w-1/3 p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              />
              <button
                type="button"
                onClick={() => removeShift(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addShift}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Shift
          </button>
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
