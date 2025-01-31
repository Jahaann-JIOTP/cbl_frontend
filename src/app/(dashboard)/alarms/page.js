"use client";
// import { useState } from "react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/alarms_page.module.css";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [selectedMeter, setSelectedMeter] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isMeterDropdownVisible, setMeterDropdownVisible] = useState(false);
  const [isOptionDropdownVisible, setOptionDropdownVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toggle dropdown for meter selection
  const toggleDropdown = () => {
    setMeterDropdownVisible(!isMeterDropdownVisible);
  };

  // Show selected meter value
  const showMeterValue = (meter) => {
    setSelectedMeter(meter);
    setOptionDropdownVisible(true); // Show option dropdown when a meter is selected
    setMeterDropdownVisible(false); // Close meter dropdown
  };

  // Toggle dropdown for option selection
  const toggleOptionDropdown = () => {
    setOptionDropdownVisible(!isOptionDropdownVisible);
  };

  // Show selected option value
  const showOptionValue = (option) => {
    setSelectedOption(option);
    setInputValue(""); // Clear input value on new option selection
    setOptionDropdownVisible(false); // Close option dropdown
  };

  // Function to fetch data from the server (GET request)
  const fetchData = async () => {
    try {
      const response = await fetch("http://15.206.128.214/Test_Api/fetch.php"); // Your PHP endpoint
      const result = await response.json();
      setData(result); // Save the fetched data into the state
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const submitData = async () => {
    const data = {
      meter: selectedMeter,
      option_selected: selectedOption,
      value: inputValue,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://15.206.128.214/Test_Api/logo.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.text();
      console.log("Response received:", responseBody);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result;
      try {
        result = JSON.parse(responseBody);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        throw new Error("Invalid JSON response.");
      }

      if (result && result.success) {
        alert(result.message);
        fetchData();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the data.");
    }
  };

  if (loading) {
    return <Preloader />; // Show preloader component instead of loading text
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex-shrink-0 w-full h-[85vh] shadow-lg rounded-lg border-t-4 border-t-[#1F5897] overflow-hidden border-2 border-[#808080]">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <p className="text-lg font-bold text-gray-700">Set Alarms Threshold</p>
      </div>

      {/* Dropdown for Meter selection */}
      <div className="mt-8 px-8">
        <button
          className=" text-gray-700 font-medium py-3 px-6 rounded-lg shadow-md hover:from-[#14456A] hover:to-[#1F5897] transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={toggleDropdown}
          style={{
            background: "linear-gradient(#bdc6cd,#bababa)",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset",
            borderColor: "#9fa0a4",
            transition: "background 0.3s ease",
          }}
        >
          Select Meter &#9662;
        </button>
        {isMeterDropdownVisible && (
          <div className="bg-white text-gray-700 shadow-2xl mt-3 py-4 px-4 rounded-lg overflow-y-auto h-64 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-[#F7FAFC]">
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Solar 1")}
            >
              Solar 1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Solar 2")}
            >
              Solar 2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Tranformer 1")}
            >
              Tranformer 1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Tranformer 2")}
            >
              Tranformer 2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Air Compressors-1")}
            >
              Air Compressors-1
            </a>

            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Air Compressors-1")}
            >
              Air Compressors-1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Ball Mills-1")}
            >
              Ball Mills-1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Ball Mills-2")}
            >
              Ball Mills-2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Ball Mills-4")}
            >
              Ball Mills-4
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Belt 200 Feeding")}
            >
              Belt 200 Feeding
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Belt 300 Feeding")}
            >
              Belt 300 Feeding
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Colony D.B")}
            >
              Colony D.B
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("DPM-2")}
            >
              DPM-2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Glaze Line-1")}
            >
              Glaze Line-1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Glaze Line-2")}
            >
              Glaze Line-2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Glaze Ball Mill")}
            >
              Glaze Ball Mill
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Kiln Blower Fan - (R.V.E)")}
            >
              Kiln Blower Fan - (R.V.E)
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Kiln Loading Machine")}
            >
              Kiln Loading Machine
            </a>

            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Laboratory")}
            >
              Laboratory
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Light D.B # 01")}
            >
              Light D.B # 01
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Light D.B # 02")}
            >
              Light D.B # 02
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Lighting (Plant)")}
            >
              Lighting (Plant)
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Masjid")}
            >
              Masjid
            </a>

            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Prekiln")}
            >
              Prekiln
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Press PH4300")}
            >
              Press PH4300
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Layer Dryer")}
            >
              Layer Dryer
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line 5")}
            >
              Polishing Line 5
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line 6")}
            >
              Polishing Line 6
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Glaze Ball Mill 13500L-2")}
            >
              Glaze Ball Mill 13500L-2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line 7")}
            >
              Polishing Line 7
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Air Compressor-2")}
            >
              Air Compressor-2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Glaze Ball Mill 9500L-3")}
            >
              Glaze Ball Mill 9500L-3
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("G1_U8")}
            >
              G1_U8
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" G1_U10")}
            >
              G1_U10
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("5 Layer Dryer")}
            >
              5 Layer Dryer
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" 5 Layer Dryer Unloading Machine")}
            >
              5 Layer Dryer Unloading Machine
            </a>

            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Rental Genset")}
            >
              Rental Genset
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Water Treatment Area")}
            >
              Water Treatment Area
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("G1_U15")}
            >
              G1_U15
            </a>

            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("G1_U16")}
            >
              G1_U16
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Press PH 4300/1750-1")}
            >
              Press PH 4300/1750-1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Ball Mills -3")}
            >
              Ball Mills -3
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Hard Materials")}
            >
              Hard Materials
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line-1")}
            >
              Polishing Line-1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line-2")}
            >
              Polishing Line-2
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Fan for Spray Dryer")}
            >
              Fan for Spray Dryer
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() =>
                showMeterValue("Slip Piston Pumps & Transfer Tank")
              }
            >
              Slip Piston Pumps & Transfer Tank
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Glaze Tank-1")}
            >
              Glaze Tank-1
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Coal Stove & Coal Conveyer")}
            >
              Coal Stove & Coal Conveyer
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("ST Motor & Iron Remove")}
            >
              ST Motor & Iron Remove
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line -3")}
            >
              Polishing Line -3
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Polishing Line -4")}
            >
              Polishing Line -4
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Belt 100 Feeding to BM500")}
            >
              Belt 100 Feeding to BM500
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("No Combustion System")}
            >
              No Combustion System
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Digital Printing Machine")}
            >
              Digital Printing Machine
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" G2_U5")}
            >
              G2_U5
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue("Air Compressor 3")}
            >
              Air Compressor 3
            </a>
            <a
              href="#"
              className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
              onClick={() => showMeterValue(" Air Compressor 4")}
            >
              Air Compressor 4
            </a>
          </div>
        )}
      </div>

      {/* Selected Meter Display */}
      <div className="mt-8 px-8 text-xl font-semibold text-[#626469]">
        {`Selected Meter: ${selectedMeter || "None"}`}
      </div>

      {/* Dropdown for Option selection */}
      {selectedMeter && (
        <div className="mt-8 px-8">
          <button
            className=" text-gray-700 font-medium py-3 px-6 rounded-lg shadow-md hover:from-[#14456A] hover:to-[#1F5897] transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={toggleOptionDropdown}
            style={{
              background: "linear-gradient(#bdc6cd,#bababa)",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset",
              borderColor: "#9fa0a4",
              transition: "background 0.3s ease",
            }}
          >
            Select an Option &#9662;
          </button>
          {isOptionDropdownVisible && (
            <div className="bg-white text-gray-700 shadow-md mt-3 py-2 rounded-lg">
              <a
                href="#"
                className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
                onClick={() => showOptionValue("High Current")}
              >
                High Current
              </a>
              <a
                href="#"
                className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
                onClick={() => showOptionValue("Low Voltage")}
              >
                Low Voltage
              </a>
              <a
                href="#"
                className="block py-3 px-4 hover:bg-[#E2E8F0] rounded-md transition-all duration-200"
                onClick={() => showOptionValue("High Voltage")}
              >
                High Voltage
              </a>
            </div>
          )}
        </div>
      )}

      {/* Input field for entering the value */}
      {selectedOption && (
        <div className="mt-8 px-8">
          <label
            htmlFor="inputValue"
            className="block  text-[#626469] font-semibold text-lg mb-3"
          >
            {`Enter value for ${selectedOption}:`}
          </label>
          <input
            type="number"
            id="inputValue"
            className="block w-full p-2 border border-[#9f9fa3] rounded-md  text-gray-700"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value"
          />
        </div>
      )}

      {/* Submit button */}
      {selectedOption && (
        <div className="mt-8 px-8 flex items-center justify-center">
          <button
            className="w-[240px] h-[35px] block font-sans text-[16px] font-bold text-white no-underline uppercase text-center  
            pt-[4px] mt-[10px] ml-[5px] relative cursor-pointer border-none rounded-[5px] 
            bg-[#1784d9] bg-gradient-to-b from-[#1784d9] to-[#389de9] 
            shadow-[inset_0px_1px_0px_#2ab7ec,_0px_5px_0px_#497a78,_0px_10px_5px_#999]"
            onClick={submitData}
          >
            Submit
          </button>
        </div>
      )}
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          View - SetPoints
        </h1>
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#1F5897] text-white">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Source</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Value</th>
                <th className="px-4 py-2 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{item.id}</td>
                    <td className="px-4 py-2 border text-center">
                      {item.meter}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.option_selected}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.value}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.created_at}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-2 border">
                    Please Set Alarms Threshold
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
