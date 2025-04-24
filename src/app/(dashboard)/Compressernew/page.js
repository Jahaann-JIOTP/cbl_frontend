"use client";
import React, { useState, useEffect } from "react";

function Page() {
  const [meterData, setMeterData] = useState(null); // Store data from the API
  const [isError, setIsError] = useState(false); // Error state
  const [unit, setUnit] = useState("m³"); // Default unit is SCF

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cblapi.jiotp.com/diagram_data1.php"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMeterData(data);
      setIsError(false); // Reset error state if fetch succeeds
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set interval for fetching data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const renderMeterData = (meterName, prefix, position, lightPosition) => {
    if (!prefix || !meterData) return null; // Return null if data is unavailable

    const flowrateKey = `${prefix}_Flowrate`;
    const totalFlowKey = `${prefix}_TotalFlow`;

    // Convert values based on selected unit
    const flowRate =
      unit === "m³"
        ? (meterData[flowrateKey] * 0.03531)
        : meterData[flowrateKey];
    const totalFlow =
      unit === "m³"
        ? (meterData[totalFlowKey] * 1000) / 35.31
        : meterData[totalFlowKey];

    // Determine image based on condition (flow rate > 0)
    const isActive = flowRate && flowRate > 0;
    const imageSrc = isActive ? "green.gif" : "red.gif"; // Path to green or red image
    const lightSize = isActive
      ? { height: "20px", width: "20px" } // Size for green.gif
      : { height: "15px", width: "15px" }; // Size for red.gif

    return (
      <div
        key={meterName}
        style={{
          position: "absolute",
          ...position,
          color: "darkblue",
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          //   backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "5px 10px",
          borderRadius: "8px",
          boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* Conditional Light Image */}
        <img
          src={imageSrc}
          alt={isActive ? "Active" : "Inactive"}
          style={{
            position: "absolute",
            ...lightPosition, // Use the individual light position
            ...lightSize, // Apply size dynamically based on isActive
          }}
        />
        {/* Meter Data */}
        <p>
          {flowRate?.toFixed(2) || "N/A"} {unit === "m³" ? "m³/min" : "SCFM"}
        </p>
        <p>
          {totalFlow?.toFixed(2) || "N/A"} {unit}
        </p>
      </div>
    );
  };

  // Example positions for each data point
  const meterMapping = {
    MainLine: {
      prefix: "F3_MainLine",
      position: { left: "51%", top: "28%" },
      lightPosition: { top: "-10%", left: "-43%" }, // Customize for each meter
    },
    Sewing2: {
      prefix: "F4_Sewing2",
      position: { left: "85%", top: "64%" },
      lightPosition: { bottom: "399%", right: "69%" }, // Use percentages
    },
    Airjet: {
      prefix: "F2_Airjet",
      position: { left: "72%", top: "64%" },
      lightPosition: { bottom: "403%", right: "68%" }, // Use percentages
    },
    Sewing1: {
      prefix: "F7_PG",
      position: { left: "65.1%", top: "41%" },
      lightPosition: { bottom: "80%", right: "125%" }, // Use percentages
    },

    PG: {
      prefix: "F6_Sewing1",
      position: { left: "51.3%", top: "41%" },
      lightPosition: { top: "-10px", left: "-43%" },
    },
    GWP: {
      prefix: "F1_GWP",
      position: { left: "23.3%", top: "40%" },
      lightPosition: { top: "-03px", left: "-39%" },
    },
    Textile: {
      prefix: "F5_Textile",
      position: { left: "6.6%", top: "40%" },
      lightPosition: { top: "-1px", left: "-54px" },
    },
  };

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] opacity-75">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-gray-700 mb-4">
          Air Compresser Diagram
        </h1>

        {/* Unit Selector */}
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="unit" className="font-semibold">
            Select Unit:
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md"
          >
            <option value="SCF">SCF</option>
            <option value="m³">m³</option>
          </select>
        </div>
      </div>
      {/* Scrollable Image Section */}
      <div
        className="relative bg-white"
        style={{
          position: "relative",
          width: "100%",
          height: "75vh",
          overflowX: "auto", // Horizontal scrolling only
          overflowY: "hidden", // Disable vertical scrolling
        }}
      >
        <div className="relative w-[1350px] h-[800px]">
          <img
            src="compressednew.png"
            alt="Oneline Diagram"
            useMap="#workmap2" // Reference the map by its name
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
          />

          {/* Debug rectangles for clickable areas */}
          {/* <div
            style={{
              position: "absolute",
              left: "1200px",
              top: "645px",
              width: "100px",
              height: "45px",
              backgroundColor: "rgba(255, 0, 0, 0.3)",
              border: "1px solid black",
            }}
          >
            <a
              href="/solar_detail?val=S_1"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
              title="Solar Detail S_1"
            />
          </div> */}

          {/* Map and clickable areas */}
          {/* <map name="workmap2">
            <area
              shape="rect"
              coords="1200,750,1300,690"
              href="/Air_Compresser"
              alt="Solar Detail S_1"
              style={{ cursor: "pointer" }}
            />
          </map> */}

          {/* Render meter data */}
          {meterData &&
            Object.entries(meterMapping).map(
              ([meterName, { prefix, position, lightPosition }]) =>
                renderMeterData(meterName, prefix, position, lightPosition)
            )}
        </div>
      </div>
    </div>
  );
}

export default Page;
