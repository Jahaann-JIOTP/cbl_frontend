"use client";
import React, { useState } from "react";
import useChartConfigs from "../hooks/useChartConfigs.js"
import Custom_div from "@/components/custom_div";
import ChartPopup from "@/components/chart_popup";
import ChartOptionsPopup from "@/components/chart_options_popup";

function CustomDash() {
  const [chartConfigs, setChartConfigs] = useChartConfigs("customDashConfigs"); // Unique storage key
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState("");

  const openChartPopup = (divIndex) => {
    setSelectedDiv(divIndex);
    setShowChartPopup(true);
  };

  const closeChartPopup = () => {
    setShowChartPopup(false);
  };

  const openOptionsPopup = (chartType) => {
    setSelectedChartType(chartType);
    setShowOptionsPopup(true);
    closeChartPopup();
  };

  const closeOptionsPopup = () => {
    setShowOptionsPopup(false);
  };

  const applyChartConfig = (divIndex, config) => {
    setChartConfigs((prevConfigs) => ({
      ...prevConfigs,
      [divIndex]: config,
    }));
    closeOptionsPopup();
  };

  const removeChart = (divIndex) => {
    setChartConfigs((prevConfigs) => {
      const newConfigs = { ...prevConfigs };
      delete newConfigs[divIndex];
      return newConfigs;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 relative">
      {[0, 1, 2, 3].map((divIndex) => (
        <Custom_div
          key={divIndex}
          openChartPopup={() => openChartPopup(divIndex)}
          divIndex={divIndex}
          chartConfig={chartConfigs[divIndex]}
          removeChart={() => removeChart(divIndex)}
        />
      ))}
      {showChartPopup && <ChartPopup closePopup={closeChartPopup} openOptionsPopup={openOptionsPopup} />}
      {showOptionsPopup && (
        <ChartOptionsPopup
          closePopup={closeOptionsPopup}
          selectedDiv={selectedDiv}
          applyChartConfig={(config) => applyChartConfig(selectedDiv, config)}
          chartType={selectedChartType}
        />
      )}
    </div>
  );
}

export default CustomDash;
