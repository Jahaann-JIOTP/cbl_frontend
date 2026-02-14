"use client";
import React, { useEffect, useState,Suspense } from "react";
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
    return `/log2?type=${activeTab}&&id=${id}&&meter=${meter}`;
  };

  useEffect(() => {
    const meterTitles = {
    
      U_7_EM7: "New Centac Com#1",
     
      U_9_EM9: "New Centac Com#2",
    //   U_15: "Dryer",
    //   U_21: "Janitza",
     
    //   U_22: "Solar Hostels",
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
     setLink(`https://cblapi.jahaann.com/volts_data1.php?meter=${meter}`);
   }, [meter]);

   const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    if (tab === "volts") {
      setLink(`https://cblapi.jahaann.com/volts_data1.php?meter=${meter}`);
    } else if (tab === "power") {
      setLink(`https://cblapi.jahaann.com/power_data1.php?meter=${meter}`);
    } else if (tab === "energy") {
      setLink(`https://cblapi.jahaann.com/energy_data1.php?meter=${meter}`);
    } else {
      setLink(""); // Handle other cases if needed
    }
  };

  const renderTagsWithPosition = () => {
    if (!meterData) return null;

    const tagPositions =
      activeTab === "volts"
        ? {
            VoltageAN_V: {  left: "522pt", top: "316pt", unit: "V AN" },
            VoltageBN_V: { left: "622pt", top: "316pt", unit: "V BN"  },
            VoltageCN_V: {left: "724pt", top: "316pt", unit: "V CN" },
            // CurrentB_A: { left: "390pt", top: "370pt", unit: "A c" },
            CurrentC_A: { left: "270pt", top: "70pt", unit: "A c" },
            CurrentB_A: { left: "270pt", top: "153pt", unit: "A b" },
            CurrentA_A: { left: "270pt", top: "230pt", unit: "A a" },
            CurrentAvg_A: { left: "270pt", top: "330pt", unit: "A " },
            ActivePowerC_kW: { left: "400pt", top: "70pt", unit: "kW c" },
            ActivePowerB_kW: { left: "400pt", top: "153pt", unit: "kW b" },
            ActivePowerA_kW: { left: "400pt", top: "230pt", unit: "kW a" },
            ActivePowerTotal_kW: { left: "398pt", top: "280pt", unit: "kW" },
            ReactivePowerTotal_kVAR: { left: "400pt", top: "330pt", unit: "kVAR" },
            ApparentPowerTotal_kVA: { left: "400pt", top: "372pt", unit: "kVA" },
            VoltageAB_V: { left: "170pt", top: "188pt", unit: "V ab"  },
            VoltageCA_V: {  left: "62pt", top: "157pt", unit: "V ca" },
            VoltageBC_V: { left: "168pt", top: "118pt", unit: "V bc" },
            VoltageLL_V: { left: "165pt", top: "372pt", unit: "V"  },
            Frequency_Hz: { left: "835pt", top: "125pt", unit: "Hz" },
            PowerFactorTotal: { left: "830pt", top: "170pt", unit: "" },  
            PowerFactorA: { left: "830pt", top: "213pt", unit: "" },
            PowerFactorB: { left: "830pt", top: "255pt", unit: "" },
            PowerFactorC: { left: "830pt", top: "298pt", unit: "" },
            // ApparentPowerTotal_kVA: { left: "830pt", top: "295pt", unit: "" },
           VoltageLN_V: { left: "838pt", top: "341pt", unit: "V" },
          }
        : activeTab === "power"
        ? {
          HarmonicsTHDIA: { left: "90pt", top: "195pt" },
          HarmonicsTHDIB: { left: "90pt", top: "255pt" },
          HarmonicsTHDIC: { left: "90pt", top: "315pt" },
          HarmonicsTHDIN: { left: "190pt", top: "195pt" },
          HarmonicsTHDIG:{left: "190pt", top: "255pt"},
          HarmonicsTHDVAB:{left: "320pt", top: "195pt"},
          "HarmonicsTHDVCA":{left: "320pt", top: "255pt"},
          "HarmonicsTHDVBN":{left: "320pt", top: "312pt"},
          "HarmonicsTHDVLL":{left: "320pt", top: "379pt"},
          "HarmonicsTHDVBC":{left: "438pt", top: "195pt"},
          "HarmonicsTHDVAN":{left: "438pt", top: "255pt"},
          "HarmonicsTHDVCN":{left: "438pt", top: "312pt"},
          "HarmonicsTHDVLN":{left: "438pt", top: "379pt"},
          ActivePowerA_kW:{left: "630pt", top: "197pt"},
          ActivePowerB_kW:{left: "630pt", top: "258pt"},
          ActivePowerC_kW:{left: "630pt", top: "316pt"},
          ActivePowerTotal_kW:{left: "630pt", top: "377pt"},
          ReactivePowerA_kVAR:{left: "740pt", top: "197pt"},
          ReactivePowerB_kVAR:{left: "740pt", top: "258pt"},
          ReactivePowerC_kVAR:{left: "740pt", top: "316pt"},
          ReactivePowerTotal_kVAR:{left: "740pt", top: "377pt"},
          ApparentPowerA_kVA:{left: "860pt", top: "197pt"},
          ApparentPowerB_kVA:{left: "860pt", top: "257pt"},
          ApparentPowerC_kVA:{left: "860pt", top: "317pt"},
          ApparentPowerTotal_kVA:{left: "860pt", top: "378pt"}
          }
        : {
          // Energy tags for activeTab === "energy"
          ActiveEnergyDelivered_Wh: { left: "290pt", top: "142pt"},
          ActiveEnergyReceived_Wh: { left: "290pt", top: "205pt"},
          ActiveEnergy_DelmRec_Wh: { left: "290pt", top: "270pt"},
          ActiveEnergy_DelpRec_Wh: { left: "290pt", top: "330pt"},
          ReactiveEnergyDelivered_VARh: {
            left: "460pt",
            top: "142pt",
           
          },
          ReactiveEnergyReceived_VARh: {
            left: "460pt",
            top: "205pt",
           
          },
          ReactiveEnergy_DelmRec_VARh: {
            left: "460pt",
            top: "270pt",
         
          },
          ReactiveEnergy_DelpRec_VARh: {
            left: "460pt",
            top: "330pt",
            
          },
          ApparentEnergyDelivered_VAh: {
            left: "630pt",
            top: "142pt",
           
          },
          ApparentEnergyReceived_VAh: {
            left: "630pt",
            top: "205pt",
            
          },
          ApparentEnergy_DelmRec_VAh: { left: "630pt", top: "270pt" },
          ApparentEnergy_DelpRec_VAh: { left: "630pt", top: "330pt" },
          // TotalApparentEnergy_kVAh: { left: "360pt", top: "295pt"},
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
              ? "power.png"
              : "Energy_log1.png"
          }
          alt={activeTab}
          useMap="#workmap"
        />
       <Link href="/sld"><img src="back.jpg" className="absolute top-[41px] left-[1056px]" /></Link>
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
