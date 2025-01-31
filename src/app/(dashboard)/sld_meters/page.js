"use client";
import React, { useEffect, useState, Suspense} from "react";
import { useSearchParams } from "next/navigation"; // Correctly import useSearchParams
import Link from "next/link";

const MeterDataComponent = () => {
  const searchParams = useSearchParams(); // Get search parameters
  const [currentTitle, setCurrentTitle] = useState("");
  const [meterData, setMeterData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("volts");
  const [link, setLink] = useState("");

  const meter = searchParams.get("meter") || "Unknown"; // Get 'meter' from URL
  const id = searchParams.get("id") || "Default_ID"; // Get 'id' from URL

  const getHrefForAction = () => {
    // Dynamically generate the href based on the current tab
    return `/log1?type=${activeTab}&&id=${id}&&meter=${meter}`;
  };

  useEffect(() => {
    const meterTitles = {
      U_3_EM3: "Ozen 350",
      U_4_EM4: "Atlas Copco",
      U_5_EM5: "Compressor Aux",
      U_6_EM6: "Ganzair Compressor",
      U_8_EM8: "ML-132",
      U_10_EM10: "Kaeser Compressor",
    };

    setCurrentTitle(meterTitles[meter] || "Unknown Meter");
  }, [meter]);

  useEffect(() => {
    const fetchData = async () => {
      if (!link) return;

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
    setLink(`https://www.cblapi.jiotp.com/cbl_backend/volts_data.php?meter=${meter}`);
  }, [meter]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    if (tab === "volts") {
      setLink(`https://www.cblapi.jiotp.com/cbl_backend/volts_data.php?meter=${meter}`);
    } else if (tab === "power") {
      setLink(`https://www.cblapi.jiotp.com/cbl_backend/power_data.php?meter=${meter}`);
    } else if (tab === "energy") {
      setLink(`https://www.cblapi.jiotp.com/cbl_backend/energy_data.php?meter=${meter}`);
    } else {
      setLink(""); // Handle other cases if needed
    }
  };

  const renderTagsWithPosition = () => {
    if (!meterData) return null;

    const tagPositions =
    activeTab === "volts"
      ? {
        Voltage_Ph3ToPh1_V: { left: "65pt", top: "157pt", unit: "V" },
        Voltage_Ph2ToPh3_V: { left: "164pt", top: "117pt", unit: "V" },
        Voltage_Ph1ToPh2_V: { left: "164pt", top: "189pt", unit: "V" },
        AvgVoltageLL_V: { left: "164pt", top: "371pt", unit: "V" },
        CurrentPh3_A: { left: "272pt", top: "70pt", unit: "A" },
        CurrentPh2_A: { left: "272pt", top: "153pt", unit: "A" },
        CurrentPh1_A: { left: "272pt", top: "230pt", unit: "A" },
        CurrentAvg_A: { left: "272pt", top: "330pt", unit: "A" },
        Activepower_PH3_W: { left: "400pt", top: "70pt", unit: "kW" },
        Activepower_PH2_W: { left: "400pt", top: "152.5pt", unit: "kW" },
        Activepower_PH1_W: { left: "400pt", top: "230pt", unit: "kW" },
        Activepower_Total_W: { left: "400pt", top: "280pt", unit: "kW" },
        ReAPower_Total_VAR: { left: "400pt", top: "330pt", unit: "kVAR" },
        AppPower_Total_VA: { left: "400pt", top: "370pt", unit: "kVA" },
        Voltage_pH1ToN_V: { left: "525pt", top: "315pt", unit: "V" },
        Voltage_pH2ToN_V: { left: "625pt", top: "315pt", unit: "V" },
        Voltage_pH3ToN_V: { left: "725pt", top: "315pt", unit: "V" },
        Freq_Hz: { left: "840pt", top: "125pt", unit: "Hz" },
        PF_Avg: { left: "840pt", top: "170pt", unit: "" }, // No unit for power factor
        PF_PH1: { left: "840pt", top: "212pt", unit: "" },
        PF_PH2: { left: "840pt", top: "254pt", unit: "" },
        PF_PH3: { left: "840pt", top: "298pt", unit: "" },
        VoltageLN_V: { left: "840pt", top: "342pt", unit: "V" },
        }
      : activeTab === "power"
      ? {
        CurrentTHD_PH1: { left: "128pt", top: "195pt" },
        CurrentTHD_PH2: { left: "128pt", top: "255pt" },
        CurrentTHD_PH3: { left: "128pt", top: "313pt" },
        VoltageTHD_PH1: { left: "383pt", top: "195pt" },
        VoltageTHD_PH2:{left: "383pt", top: "255pt"},
        VoltageTHD_PH3:{left: "383pt", top: "313pt"},
        Activepower_PH1_W:{left: "625pt", top: "197pt"},
        Activepower_PH2_W:{left: "625pt", top: "256pt"},
        Activepower_PH3_W:{left: "625pt", top: "315pt"},
        Activepower_Total_W:{left: "625pt", top: "379pt"},
        ReAPower_PH1_VAR:{left: "740pt", top: "197pt"},
        ReAPower_PH2_VAR:{left: "740pt", top: "256pt"},
        ReAPower_PH3_VAR:{left: "740pt", top: "315pt"},
        ReAPower_Total_VAR:{left: "740pt", top: "379pt"},
        AppPower_PH1_VA:{left: "855pt", top: "197pt"},
        AppPower_PH2_VA:{left: "855pt", top: "256pt"},
        AppPower_PH3_VA:{left: "855pt", top: "315pt"},
        AppPower_Total_VA:{left: "855pt", top: "379pt"}
        }
      : 
        {
          // Energy tags for activeTab === "energy"
          FWD_ActiveEnergy_Wh: { left: "210pt", top: "172pt" },
          Rev_ActiveEnergy_Wh: { left: "210pt", top: "235pt"},
          TotalActiveEnergy_kWh: { left: "210pt", top: "292pt"},
          FWD_ReAInductiveEnergy_VARh: {
            left: "738pt",
            top: "172pt",
           
          },
          FWD_ReACapacitiveEnergy_VARh: {
            left: "550pt",
            top: "172pt",
           
          },
          Rev_ReAInductiveEnergy_VARh: {
            left: "738pt",
            top: "235pt",
         
          },
          Rev_ReACapacitiveEnergy_VARh: {
            left: "550pt",
            top: "235pt",
            
          },
          TotalReactiveEnergy_Capacitive_kVARh: {
            left: "550pt",
            top: "292pt",
           
          },
          TotalReactiveEnergy_Inductive_kVARh: {
            left: "738pt",
            top: "292pt",
            
          },
          FWD_AppEnergy_VAh: { left: "378pt", top: "172pt" },
          Rev_AppEnergy_VAh: { left: "378pt", top: "235pt" },
          TotalApparentEnergy_kVAh: { left: "378pt", top: "292pt"},
        };
    return Object.entries(tagPositions).map(([tag, position]) => {
      const value = meterData[tag] ?? "N/A"; // Display "N/A" if the value is null
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
        {/* Dynamically switch image */}
        <img
          src={
            activeTab === "volts"
              ? "01_volts.png"
              : activeTab === "power"
              ? "Power_1.png"
              : "energy_11.png"
          }
          alt={activeTab}
          useMap="#main_map"
          className={`max-w-full max-h-full ${activeTab === "power"
          ? "ml-[-8px]": ""}`}
        />
<Link href="/sld"><img src="back.jpg" className="absolute top-[41px] left-[1056px]" /></Link>
        {/* Unified Map */}
        <map name="main_map">
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

