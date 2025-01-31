"use client";
import React, { useState, useEffect } from "react";

function Page() {
  const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state
  const [meterData, setMeterData] = useState({}); // Fetched data

  const meterMapping = {
    "New Centac Comp#2": {
      prefix: "U_7_EM7",
      position: { left: "95px", top: "490px" },
      lightPosition: { top: "478px", left: "50px" },
    },
    "Compressor Aux": {
      prefix: "U_5_EM5",
      position: { left: "247px", top: "490px" },
      lightPosition: { top: "478px", left: "200px" },
    },
    "Janitza": {
      prefix: "U_21",
      position: { left: "400px", top: "490px" },
      lightPosition: { top: "478px", left: "355px" },
    },
    "Kaeser Compressor": { prefix: "U_10_EM10", position: { left: "556px", top: "490px", color: "blue", fontWeight: "bold" },  lightPosition: { top: "478px", left: "505px" } },
    "Dryer": { prefix: "U_15", position: { left: "706px", top: "490px", color: "blue", fontWeight: "bold" }, lightPosition: { top: "478px", left: "660px" } },
    "Ozen 350": { prefix: "U_3_EM3", position: { left: "860px", top: "490px", color: "blue", fontWeight: "bold" }, lightPosition: { top: "478px", left: "820px" } },
    "Atlas Copco": { prefix: "U_4_EM4", position: { left: "1010px", top: "490px", color: "blue", fontWeight: "bold" },  lightPosition: { top: "478px", left: "970px" } },
    "Ganzair Compressor": { prefix: "U_6_EM6", position: { left: "1164px", top: "490px", color: "blue", fontWeight: "bold" }, lightPosition: { top: "478px", left: "1120px" } },
    "Solar Hostels": { prefix: "U_22", position: { left: "1320px", top: "495px", color: "blue", fontWeight: "bold" }, lightPosition: { top: "478px", left: "1230px" } },
    "new cantac compressor#1": { prefix: "U_9_EM9", position: { left: "1330px", top: "400px", color: "blue", fontWeight: "bold" }, lightPosition: { top: "435px", left: "1300px" } },
    "ML-132": { prefix: "U_8_EM8", position: { left: "1465px", top: "490px", color: "blue", fontWeight: "bold", width: "100px" }, lightPosition: { top: "478px", left: "1430px" } },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.cblapi.jiotp.com/cbl_backend/diagram_data.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.authorized) {
          setIsAuthorized(true);
          setMeterData(data); // Store fetched data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data once on mount
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const renderMeterData = (meterName, prefix, position, lightPosition) => {
    if (!prefix || Object.keys(meterData).length === 0) return null;

    // Keys for meter data
    const avgVoltageKey = `${prefix}_AvgVoltageLL_V`;
    const alternateVoltageKey = `${prefix}_VoltageLL_V`;
    const currentAvgKey = `${prefix}_CurrentAvg_A`;
    const activePowerKey = `${prefix}_Activepower_Total_W`;
    const alternatePowerKey = `${prefix}_ActivePowerTotal_kW`;
    const voltageKey = `${prefix}_Voltage_LL_V`;
    const currentKey = `${prefix}_Current_Total_Amp`;
    const powerFactorKey = `${prefix}_ActivePower_Total_kW`;

    // Determine light color
    const isActive =
      (meterData[avgVoltageKey] ||
        meterData[alternateVoltageKey] ||
        meterData[currentKey] ||
        meterData[powerFactorKey]) != 0;
    const imageSrc = isActive ? "green.gif" : "red.gif";

    // Set different sizes for red and green lights
    const lightSize = isActive
      ? { height: "20px", width: "20px" } // Size for green.gif
      : { height: "15px", width: "15px" }; // Size for red.gif

    // Prepare rows of data
    const rows = [];
    if (
      meterData[avgVoltageKey] !== undefined ||
      meterData[alternateVoltageKey] !== undefined
    ) {
      rows.push(
        <p>
          {meterData[avgVoltageKey]?.toFixed(2) ||
            meterData[alternateVoltageKey]?.toFixed(2)}{" "}
          V
        </p>
      );
    }
    if (meterData[currentAvgKey] !== undefined)
      rows.push(<p>{meterData[currentAvgKey]?.toFixed(2)} A</p>);
    if (
      meterData[activePowerKey] !== undefined ||
      meterData[alternatePowerKey] !== undefined
    ) {
      rows.push(
        <p>
          {meterData[activePowerKey]?.toFixed(2) ||
            meterData[alternatePowerKey]?.toFixed(2)}{" "}
          kW
        </p>
      );
    }
    if (meterData[voltageKey] !== undefined)
      rows.push(<p>{meterData[voltageKey]?.toFixed(2)} V</p>);
    if (meterData[currentKey] !== undefined)
      rows.push(<p>{meterData[currentKey]?.toFixed(2)} A</p>);
    if (meterData[powerFactorKey] !== undefined)
      rows.push(<p>{meterData[powerFactorKey]?.toFixed(2)} KW</p>);

    // Render light and data
    return (
      <div key={prefix}>
        {/* Light Indicator */}
        <img
          src={imageSrc}
          alt={isActive ? "Active" : "Inactive"}
          style={{
            position: "absolute",
            ...lightPosition,
            ...lightSize, // Apply size dynamically based on isActive
          }}
        />
        {/* Meter Data */}
        <div
          style={{
            position: "absolute",
            ...position,
            color: "blue",
            fontSize: "12px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          {rows.length > 0 ? rows : <p>N/A</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999]">
      <h1 className="text-lg font-bold text-gray-700 mb-4">Oneline Diagram</h1>

      <div className="w-full h-[75vh] bg-white rounded-b-md overflow-auto relative">
        {isAuthorized ? (
          <div className="relative w-[1500px] h-[698px]">
            <img
             src="CBL SLD(1).png"
              alt="Oneline Diagram"
              useMap="#workmap3"
              className="max-w-full max-h-full object-contain"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />

            {/* Render Meter Data and Lights */}
            {Object.entries(meterMapping).map(
              ([meterName, { prefix, position, lightPosition }]) =>
                renderMeterData(meterName, prefix, position, lightPosition)
            )}

            {/* Map for Clickable Areas */}
            <map name="workmap3">
              <area shape="rect" coords="50,500,100,570" href="/sld_meters1?id=T_1&&meter=U_7_EM7" alt="Compressor 1" />
              <area shape="rect" coords="200,495,250,570" href="/sld_meters?id=T_1&&meter=U_5_EM5" alt="Compressor 2" />
              <area shape="rect" coords="350,495,400,570" href="/sld_meters2?id=T_1&&meter=U_21" alt="Compressor 3" />
              <area shape="circle" coords="510,495,40" href="/sld_meters?id=T_1&&meter=U_10_EM10" alt="Compressor 4" />
              <area shape="rect" coords="700,495,650,570" href="/sld_meters2?id=T_1&&meter=U_15" alt="Compressor 5" />
              <area shape="rect" coords="860,495,750,570" href="/sld_meters?id=T_1&&meter=U_3_EM3" alt="Compressor 6" />
              <area shape="circle" coords="980,495,40" href="/sld_meters?id=T_1&&meter=U_4_EM4" alt="Compressor 7" />
              <area shape="rect" coords="1100,495,1150,570" href="/sld_meters?id=T_1&&meter=U_6_EM6" alt="Compressor 8" />
              <area shape="rect" coords="1350,360,1275,530" href="/sld_meters1?id=T_1&&meter=U_9_EM9" alt="Compressor 10" />
              <area shape="circle" coords="1250,510,40" href="/sld_meters2?id=T_1&&meter=U_22" alt="Compressor 9" />
              <area shape="circle" coords="1430,495,40" href="/sld_meters?id=T_1&&meter=U_8_EM8" alt="Compressor 11" />
            </map>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Page;
