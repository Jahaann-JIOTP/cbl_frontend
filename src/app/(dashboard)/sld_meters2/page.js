"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const [currentTitle, setCurrentTitle] = useState("");
  const [meterData, setMeterData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("volts");
  const [link, setLink] = useState("");

  const meter = searchParams.get("meter") || "Unknown";
  const id = searchParams.get("id") || "Default_ID";
  const getHrefForAction = () => {
    // Dynamically generate the href based on the current tab
    return `/log3?type=${activeTab}&&id=${id}&&meter=${meter}`;
  };

  useEffect(() => {
    const meterTitles = {
      U_15: "Dryer",
      U_21: "DSD281(Kaeser)+ML-15",
      U_22: "Solar Hostels",
    };

    setCurrentTitle(meterTitles[meter] || "Unknown Meter");
  }, [meter]);

  useEffect(() => {
    if (!link) return;

    const fetchData = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.authorized && data.meter) {
          setMeterData(data.meter);
          setError(null);
        } else {
          setMeterData(null);
          setError("No data available for this meter.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMeterData(null);
        setError("Failed to fetch meter data.");
      }
    };

    // Call fetchData initially and set interval for refreshing every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [link]);
  useEffect(() => {
    // Set the initial link for the default tab
    setLink(
      `https://www.cblapi.jiotp.com/cbl_backend/volts_data2.php?meter=${meter}`
    );
  }, [meter]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    if (tab === "volts") {
      setLink(
        `https://www.cblapi.jiotp.com/cbl_backend/volts_data2.php?meter=${meter}`
      );
    } else if (tab === "power") {
      setLink(
        `https://www.cblapi.jiotp.com/cbl_backend/power_data2.php?meter=${meter}`
      );
    } else if (tab === "energy") {
      setLink(
        `https://www.cblapi.jiotp.com/cbl_backend/energy_data2.php?meter=${meter}`
      );
    } else {
      setLink(""); // Handle other cases if needed
    }
  };

  const renderTagsWithPosition = () => {
    if (!meterData) return null;

    const tagPositions =
      activeTab === "volts"
        ? {
            Voltage_AN_V: { left: "527pt", top: "315pt", unit: "V an" },
            Voltage_BN_V: { left: "626pt", top: "315pt", unit: "V bn" },
            Voltage_CN_V: { left: "725pt", top: "315pt", unit: "V cn" },

            ApparentPower_Total_kVA: {
              left: "390pt",
              top: "370pt",
              unit: "KVA a",
            },

            Current_CN_Amp: { left: "270pt", top: "70pt", unit: "A c" },
            Current_BN_Amp: { left: "270pt", top: "153pt", unit: "A b" },
            Current_AN_Amp: { left: "270pt", top: "230pt", unit: "A a" },
            Current_Total_Amp: { left: "270pt", top: "330pt", unit: "A " },

            ActivePower_C_kW: { left: "400pt", top: "70pt", unit: "kW c" },
            ActivePower_B_kW: { left: "400pt", top: "153pt", unit: "kW b" },
            ActivePower_A_kW: { left: "400pt", top: "230pt", unit: "kW a" },
            ActivePower_Total_kW: { left: "398pt", top: "280pt", unit: "kW" },
            ReactivePower_Total_kVAR: {
              left: "396pt",
              top: "330pt",
              unit: "kVAR",
            },
            ApparentPower_Total_kVA: {
              left: "398pt",
              top: "372pt",
              unit: "kVAR",
            },
            Voltage_AB_V: { left: "170pt", top: "188pt", unit: "V a" },
            Voltage_CA_V: { left: "60pt", top: "157pt", unit: "V c" },
            Voltage_BC_V: { left: "170pt", top: "117pt", unit: "V b" },
            Voltage_LL_V: { left: "165pt", top: "372pt", unit: "V" },
            Frequency_Hz: { left: "840pt", top: "125pt", unit: "Hz" },
            PowerFactor_Total: { left: "840pt", top: "170pt", unit: "" },
            NA: { left: "840pt", top: "210pt", unit: "NA" },
            NA1: { left: "840pt", top: "255pt", unit: "NA" },
            NA2: { left: "840pt", top: "300pt", unit: "NA" },
            // ApparentPower_Total_kVA: { left: "830pt", top: "295pt", unit: "" },
            Voltage_LN_V: { left: "840pt", top: "340pt", unit: "V" },
          }
        : activeTab === "power"
        ? {
            CurrentTHD_PH1: { left: "130pt", top: "195pt" },
            CurrentTHD_PH2: { left: "130pt", top: "255pt" },
            CurrentTHD_PH3: { left: "130pt", top: "314pt" },
            VoltageTHD_PH1: { left: "390pt", top: "195pt" },
            VoltageTHD_PH2: { left: "390pt", top: "255pt" },
            VoltageTHD_PH3: { left: "390pt", top: "310pt" },
            ActivePower_A_kW: { left: "630pt", top: "197pt" },
            ActivePower_B_kW: { left: "630pt", top: "257pt" },
            ActivePower_C_kW: { left: "630pt", top: "317pt" },
            ActivePower_Total_kW: { left: "630pt", top: "377pt" },
            ReactivePower_A_kVAR: { left: "740pt", top: "197pt" },
            ReactivePower_B_kVAR: { left: "740pt", top: "257pt" },
            ReactivePower_C_kVAR: { left: "740pt", top: "317pt" },
            ReactivePower_Total_kVAR: { left: "740pt", top: "377pt" },
            ApparentPower_A_kVA: { left: "860pt", top: "197pt" },
            ApparentPower_B_kVA: { left: "860pt", top: "257pt" },
            ApparentPower_C_kVA: { left: "860pt", top: "317pt" },
            ApparentPower_Total_kVA: { left: "860pt", top: "377pt" },
          }
        : {
            // Energy tags for activeTab === "energy"
            FWD_ActiveEnergy_Wh: { left: "200pt", top: "175pt" },
            Rev_ActiveEnergy_Wh: { left: "200pt", top: "237pt" },
            ...(meter == "U_21"
              ? {
                  ActiveEnergy_Total_kWh: { left: "205pt", top: "295pt" },
                }
              : {
                  ActiveEnergy_Delivered_kWh: { left: "205pt", top: "295pt" },
                }),
            FWD_ReAInductiveEnergy_VARh: {
              left: "737pt",
              top: "175pt",
            },
            FWD_ReACapacitiveEnergy_VARh: {
              left: "547pt",
              top: "175pt",
            },
            Rev_ReAInductiveEnergy_VARh: {
              left: "735pt",
              top: "240pt",
            },
            Rev_ReACapacitiveEnergy_VARh: {
              left: "550pt",
              top: "235pt",
            },
            ReactiveEnergy_Total_kVARh: {
              left: "550pt",
              top: "295pt",
            },
            TotalReactiveEnergy_Inductive_kVARh: {
              left: "735pt",
              top: "295pt",
            },
            FWD_AppEnergy_VAh: { left: "373pt", top: "175pt" },
            Rev_AppEnergy_VAh: { left: "373pt", top: "236pt" },
            ApparentEnergy_Total_kVAh: { left: "378pt", top: "295pt" },
          };

    return Object.entries(tagPositions).map(([tag, position]) => {
      const value = meterData[tag] ?? "";
      const unit = position.unit;

      return (
        <div
          key={tag}
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            fontWeight: "bold",
            color: "#000",
            fontSize: "12px",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          <p>
            {value} <b>{unit}</b>
          </p>
        </div>
      );
    });
  };

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] relative">
      <h1 className="text-2xl font-bold mb-4">{currentTitle}</h1>

      <div className="relative w-[1500px] h-[600px]">
        <img
          src={
            activeTab === "volts"
              ? "01_volts.png"
              : activeTab === "power"
              ? "Power_1.png"
              : "energy_11.png"
          }
          alt={activeTab}
          useMap="#workmap"
          className={`max-w-full max-h-full ${
            activeTab === "power" ? "ml-[-8px]" : ""
          }`}
        />
        <Link href="/sld">
          <img src="back.jpg" className="absolute top-[41px] left-[1056px]" />
        </Link>
        {/* Unified Map */}
        <map name="workmap">
          {/* Tab Switching Areas */}
          <area
            shape="rect"
            coords="3,2,227,70"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabSwitch("volts")}
          />
          <area
            shape="rect"
            coords="228,2,450,70"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabSwitch("power")}
          />
          <area
            shape="rect"
            coords="451,2,700,59"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabSwitch("energy")}
          />

          {/* Action Area for Current Tab */}
          <area
            shape="rect"
            coords="180,400,30,639"
            href={getHrefForAction()} // Dynamically set URL based on activeTab
            style={{ cursor: "pointer" }}
          />
        </map>
        {renderTagsWithPosition()}
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </div>
    </div>
  );
};
const MainPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeterDataComponent />
    </Suspense>
  );
};
export default MainPage;
