"use client";
import React, { useState, useEffect } from "react";

function Page() {
  const [diagramData, setDiagramData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://cblapi.jahaann.com/diagram_data2.php");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDiagramData(data); // Set the data
    } catch (error) {
      setError(error.message); // Handle errors
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const renderMeterData = (meterName, prefix, position) => {
    if (!diagramData || !prefix) return null; // Return null if data is unavailable

    const meterValue = diagramData[prefix] || 0; // Get meter value or fallback to "0"
    const formattedValue = meterValue.toFixed(2);
    const unit = meterMapping[meterName]?.unit || "";

    return (
      <div
        key={meterName}
        style={{
          position: "absolute", // Use absolute positioning relative to parent container
          left: position.left,
          top: position.top,
          fontWeight: "bold",
          color: "#001d3d",
          // textShadow: "3px 3px 5px #90e0ef, -3px -3px 5px #83c5be",
          fontFamily: "Verdana, sans-serif",
          fontSize: "10px",
          zIndex: 10, // Ensure it’s above other elements if necessary
        }}
      >
        <p>
          {formattedValue} {unit}
        </p>
      </div>
    );
  };

  const meterMapping = {
    // Solar 1 (U11)
    "U11_Daily_Yield": { 
      prefix: "U11_SM11_PowerYield_EXP_Daily_kWh", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "46%" },
      unit: 'kWh'
    },
    U11_Total_Yield: { 
      prefix: "U11_SM11_PowerYield_EXP_Total_kWh", 
      format: value => value.toFixed(2), 
      position: { left: "38%", top: "50%" },
      unit: 'kWh'
    },
    U11_Active_Power: { 
      prefix: "U11_SM11_ActivePower_EXP_Total_kW", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "54%" },
      unit: 'kW'
    },
    U11_Min_Active_Power_Range: { 
      prefix: "U11_SM11_Min_Adj_ActivePower_kW", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "57.5%" },
      unit: 'kW'
    },
    U11_Max_Active_Power_Range: { 
      prefix: "U11_SM11_Max_Adj_ActivePower_kW", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "61.5%" },
      unit: 'kW'
    },
    U11_ReActive_Power_Total: { 
      prefix: "U11_SM11_ReAPower_EXP_Total_var", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "65.5%" },
      unit: 'kVAR'
    },
    U11_Min_ReActive_Power: { 
      prefix: "U11_SM11_Min_Adj_ReAPower_kvar", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "69%" },
      unit: 'kVAR'
    },
    U11_Max_ReActive_Power: { 
      prefix: "U11_SM11_Max_Adj_ReAPower_kvar", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "73%" },
      unit: 'kVAR'
    },
    U11_Rated_Active_Power: { 
      prefix: "U11_SM11_Rated_ActivePower_kw", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "76.5%" },
      unit: 'kW'
    },
    U11_Rated_ReActive_Power: { 
      prefix: "U11_SM11_Rated_ReAPower_kvar", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "80%" },
      unit: 'kVAR'
    },
    U11_On_Devices: { 
      prefix: "U11_SM11_GridConnectedDevices", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "84%" },
      unit: ''
    },
    U11_Off_Devices: { 
      prefix: "U11_SM11_OFF_Grid_Devices", 
      format: value => value.toFixed(2), 
      position: { left: "38.5%", top: "87.5%" },
      unit: ''
    },
  
    // Solar 2 (U12)
    U12_Daily_Yield: { 
      prefix: "U12_SM12_PowerYield_EXP_Daily_kWh", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "46%" },
      unit: 'kWh'
    },
    U12_Total_Yield: { 
      prefix: "U12_SM12_PowerYield_EXP_Total_kWh", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "50%" },
      unit: 'kWh'
    },
    U12_Active_Power: { 
      prefix: "U12_SM12_ActivePower_EXP_Total_kW", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "54%" },
      unit: 'kW'
    },
    U12_Min_Active_Power_Range: { 
      prefix: "U12_SM12_Min_Adj_ActivePower_kW", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "57.5%" },
      unit: 'kW'
    },
    U12_Max_Active_Power_Range: { 
      prefix: "U12_SM12_Max_Adj_ActivePower_kW", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "61.5%" },
      unit: 'kW'
    },
    U12_ReActive_Power_Total: { 
      prefix: "U12_SM12_ReAPower_EXP_Total_var", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "65.5%" },
      unit: 'kVAR'
    },
    U12_Min_ReActive_Power: { 
      prefix: "U12_SM12_Min_Adj_ReAPower_kvar", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "69%" },
      unit: 'kVAR'
    },
    U12_Max_ReActive_Power: { 
      prefix: "U12_SM12_Max_Adj_ReAPower_kvar", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "73%" },
      unit: 'kVAR'
    },
    U12_Rated_Active_Power: { 
      prefix: "U12_SM12_Rated_ActivePower_kw", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "76.5%" },
      unit: 'kW'
    },
    U12_Rated_ReActive_Power: { 
      prefix: "U12_SM12_Rated_ReAPower_kvar", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "80%" },
      unit: 'kVAR'
    },
    U12_On_Devices: { 
      prefix: "U12_SM12_GridConnectedDevices", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "84%" },
      unit: ''
    },
    U12_Off_Devices: { 
      prefix: "U12_SM12_OFF_Grid_Devices", 
      format: value => value.toFixed(2), 
      position: { left: "69%", top: "87.5%" },
      unit: ''
    },
  };

  if (error) {
    return <div>Error: {error}</div>; // Show error message if API call fails
  }

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999]">
      <h1 className="text-lg font-bold text-gray-700 mb-4">Solar Diagram</h1>

      {/* Parent container for the image and data */}
      <div
        className="relative bg-white rounded-b-md"
        style={{
          position: "relative", // Ensure this is relative so children are positioned relative to it
          width: "1050px", // Fixed width for the container
          height: "700px", // Fixed height for the container
          margin: "0 auto", // Center the container horizontally
        }}
      >
        {diagramData ? (
          <>
            {/* Fixed image with usemap */}
            <img
              useMap="#workmap2" // Attach the map to the image
              style={{
                position: "absolute",
                width: "1050px", // Fixed width of the image
                height: "700px", // Fixed height of the image
                objectFit: "contain", // Ensure it fits within the container
              }}
              src={diagramData.imageUrl || "solar sld.png"} // Fallback to default image if no data is available
              alt="Oneline Diagram"
            />

            {/* Define the map and clickable areas */}
            <map name="workmap2">
              <area
                shape="rect"
                coords="120,500,300,870" 
                href="/Solar_log"
                alt="Solar Log"
                style={{ cursor: "pointer" }}
                
              />
              
            </map>

            {/* Render meter data */}
            {Object.keys(meterMapping).map((meterName) =>
              renderMeterData(
                meterName,
                meterMapping[meterName].prefix,
                meterMapping[meterName].position
              )
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Page;
