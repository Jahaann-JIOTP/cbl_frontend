"use client";

import React, { useState, useEffect } from "react";
import DateRangePicker1 from "@/components/newcalendar";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function DashboardPage() {
  const today = new Date();
  const [range4, setRange4] = useState({ from: today, to: today });
  const [unit, setUnit] = useState("m³"); // Default unit is SCF
  const [tableData, setTableData] = useState([]); // State for table data

  useEffect(() => {
    const startDate = range4.from ? format(range4.from, "yyyy-MM-dd") : null;
    const endDate = range4.to ? format(range4.to, "yyyy-MM-dd") : null;

    if (startDate && endDate) {
      // const apiUrl4 = `https://cblapi.jiotp.com/backend.php?start_date=${startDate}&end_date=${endDate}&Label=Custom Range`;
      const apiUrl4 = `https://cblapi.jiotp.com/backend.php?start_date=${startDate}&end_date=${endDate}&Label=Custom Range`;
      // Fetch data from API
      fetch(apiUrl4)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Convert values to m³ if the selected unit is m³
          if (unit === "m³") {
            data = data.map((item) => ({
              ...item,
              value: Math.round(((item.value * 1000) / 35.31) * 100) / 100,
            }));
          }

          setTableData(data); // Set table data
          initializeChart(data); // Initialize chart
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [range4, unit]); // Re-fetch data when range or unit changes

  const initializeChart = (data) => {
    am4core.useTheme(am4themes_animated);

    // Check if a chart instance already exists
    const existingChart = am4core.registry.baseSprites.find(
      (sprite) => sprite.container && sprite.container.id === "chartdiv"
    );

    if (existingChart) {
      existingChart.dispose();
    }

    const chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.hiddenState.properties.opacity = 0;

    chart.data = data;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";
    chart.padding(0, 200, 10, 0);

    chart.titles.template.fontSize = 20;
    chart.links.template.colorMode = "gradient";
    chart.links.template.tooltipText = `{fromName} → {toName}: [bold]{value}[/] ${
      unit === "m³" ? "m³" : "SCF"
    }\n{fromName} contributes [bold]{value3}%[/] to {toName} sales:\n{toName} contributes [bold]{value2}%[/] to {fromName} sales`;

    const hoverState1 = chart.links.template.states.create("hover");
    hoverState1.properties.fillOpacity = 1;
    chart.nodes.template.nameLabel.label.truncate = false;
    chart.nodes.template.nameLabel.label.wrap = true;

    const nodeTemplate = chart.nodes.template;
    nodeTemplate.nameLabel.label.text = `{toName}\n{value} ${unit}`;
    nodeTemplate.nameLabel.label.truncate = true;
    nodeTemplate.nameLabel.label.maxWidth = 200;
    nodeTemplate.nameLabel.label.fontSize = 12;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = "Drag me!";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.stroke = am4core.color("#fff");
    nodeTemplate.strokeWidth = 2;

    nodeTemplate.adapter.add("fill", function (fill, target) {
      return target.dataItem.dataContext.nodeColor
        ? am4core.color(target.dataItem.dataContext.nodeColor)
        : fill;
    });

    const linkTemplate = chart.links.template;
    linkTemplate.colorMode = "gradient";
    linkTemplate.fillOpacity = 0.35;

    const gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("#FF0000"));
    gradient.addColor(am4core.color("#00FF00"));
    linkTemplate.fill = gradient;

    const tooltipText = `{fromName} → {toName}\n [bold]{value} ${unit}`;
    linkTemplate.tooltipText = tooltipText;

    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  };

  return (
    <main className="p-1">
      <div className="flex flex-wrap gap-3">
        <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-white border-2 border-[grey] border-t-[4px] border-t-[#1d5999]">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="text-md font-bold text-gray-500">
               Compressed Air Distribution
            </h3>
            <div className="mt-2 sm:mt-0">
              <DateRangePicker1 range={range4} setRange={setRange4} />
            </div>
          </div>

          {/* Unit Selector */}
          <div className="flex items-center gap-4 mt-4">
            <label htmlFor="unit">Select Unit:</label>
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

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm text-left mt-2">
            <span>
              {range4.from
                ? `${format(range4.from, "MMM dd, yyyy")} → ${
                    range4.to
                      ? format(range4.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* Horizontal Table Section */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {tableData.map((item, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 border text-center whitespace-nowrap bg-[#3989c6] text-white"
                    >
                      {item.to}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {tableData.map((item, index) => (
                    <td
                      key={index}
                      className="px-4 py-2 border text-center whitespace-nowrap"
                    >
                      {item.value.toFixed(2)} {unit}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Content */}
          <div id="chartdiv" className="h-[70%] mt-6"></div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
