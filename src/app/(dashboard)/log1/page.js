"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allowedTypes = ["volts", "power", "energy"];
  const [type, setType] = useState(() => {
    const queryType = searchParams.get("type") || "volts";
    return allowedTypes.includes(queryType) ? queryType : "volts";
  });

  // Retrieve meter and id from URL or sessionStorage
  const meterFromStorage = sessionStorage.getItem("meter");
  const idFromStorage = sessionStorage.getItem("id");

  const meter = searchParams.get("meter") || meterFromStorage || "Unknown";
  const id = searchParams.get("id") || idFromStorage || "Unknown";

  // Store meter and id in sessionStorage
  useEffect(() => {
    if (meter !== "Unknown") {
      sessionStorage.setItem("meter", meter);
    }
    if (id !== "Unknown") {
      sessionStorage.setItem("id", id);
    }
  }, [meter, id]);

  // Allowed meters
  const allowedMeters = {
    U_3_EM3: "Ozen 350",
    U_4_EM4: "Atlas Copco",
    U_5_EM5: "Compressor Aux",
    U_6_EM6: "Ganzair Compressor",
    U_8_EM8: "ML-132",
    U_10_EM10: "Kaeser Compressor",
  };

  const isValidMeter = allowedMeters.hasOwnProperty(meter);

  const getImageSrc = () => {
    switch (type) {
      case "volts":
        return "Log.png";
      case "power":
        return "harmonics.png";
      case "energy":
        return "Log_2.png";
      default:
        return "";
    }
  };

  const getMapAreas = () => {
    switch (type) {
      case "volts":
        return [
          { coords: "690,280,790,200", href: `/log_detail1?meter=${meter}&val=volt&type=volts` },
          { coords: "690,330,790,410", href: `/log_detail1?meter=${meter}&val=current&type=current` },
          { coords: "690,550,790,470", href: `/log_detail1?meter=${meter}&val=power_factor&type=power_factor` },
          { coords: "1000,100,1250,35", href: `/sld_meters?id=${id}&meter=${meter}` },
        ];
      case "power":
        return [
          { coords: "690,220,810,150", href: `/log_detail1?meter=${meter}&val=active_power&type=active_power` },
          { coords: "690,240,790,310", href: `/log_detail1?meter=${meter}&val=reactive_power&type=reactive_power` },
          { coords: "690,440,790,370", href: `/log_detail1?meter=${meter}&val=apparent_power&type=apparent_power` },
          { coords: "690,600,790,460", href: `/log_detail1?meter=${meter}&val=harmonics&type=harmonics` },
          { coords: "1000,100,1250,35", href: `/sld_meters?id=${id}&meter=${meter}` },
        ];
      case "energy":
        return [
          { coords: "690,280,790,200", href: `/log_detail1?meter=${meter}&val=active_energy&type=active_energy` },
          { coords: "690,420,790,350", href: `/log_detail1?meter=${meter}&val=reactive_energy&type=reactive_energy` },
          { coords: "690,580,790,480", href: `/log_detail1?meter=${meter}&val=apparent_energy&type=apparent_energy` },
          { coords: "1000,100,1250,35", href: `/sld_meters?id=${id}&meter=${meter}` },
        ];
      default:
        return [];
    }
  };

  if (!isValidMeter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Invalid Meter: {meter}</h1>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] relative">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-4">Logs</h1>

      <div
        className="relative overflow-x-auto overflow-y-hidden rounded"
        style={{ maxWidth: "1350px", maxHeight: "700px" }}
      >
        <img
          src={getImageSrc()}
          alt={`${type} Diagram`}
          useMap="#workmap"
          className="min-w-[1300px] h-[640px]" // Ensure the width is larger than the container for scrolling
        />

        <map name="workmap">
          {getMapAreas().map((area, index) => (
            <area
              key={index}
              shape="rect"
              coords={area.coords}
              href={area.href}
              onClick={(e) => {
                e.preventDefault();
                const newType = area.href.split("type=")[1];
                if (allowedTypes.includes(newType)) {
                  setType(newType);
                }
                router.push(area.href);
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </map>
      </div>
    </div>
  );
};


const LogsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeterDataComponent />
    </Suspense>
  );
};


export default LogsPage;