"use client";

import React, { useState, useEffect } from "react";
import { format, startOfToday } from "date-fns";
import "react-day-picker/dist/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import DateRangePicker from "@/components/daterange";
import Preloader from "@/components/Preloader";

export default function EnergyUsage() {
  const [isLoading, setIsLoading] = useState(true);
  const [range2, setRange2] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });

  const [unit2, setUnit2] = useState("m³");
  useEffect(() => {
    const formattedStart2 = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd2 = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData2(formattedStart2, formattedEnd2);
  }, [unit2]);

//   

  useEffect(() => {
    if (range2.from && range2.to) {
      const formattedStart2 = format(range2.from, "yyyy-MM-dd");
      const formattedEnd2 = format(range2.to, "yyyy-MM-dd");
      fetchChartData2(formattedStart2, formattedEnd2);
    }
  }, [range2]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  const fetchChartData2 = async (startDate, endDate) => {
    const apiUrl2 = `https://cblapi.jahaann.com/compressed_consumption.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;

    try {
      const response = await fetch(apiUrl2);
      let data = await response.json();
       // Filter out data points with value 0
        data = data.filter(item => item.value !== 0);

      if (unit2 === "m³") {
        data = data.map((item) => ({
          ...item,
          value: parseFloat(((item.value / 35.31) * 1000).toFixed(2)),
        }));
      }
        // Round all values to 2 decimal places
        data = data.map((item) => ({
          ...item,
          value: parseFloat(item.value.toFixed(2)), // Ensure rounding
      }));

      renderChart2(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const renderChart2 = (data) => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.logo.disabled = true;
    chart.data = data;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-ddTHH:mm:SS.SSS+zz:zz";

    // Date Axis
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.strokeOpacity = 0.5;
    dateAxis.renderer.grid.template.stroke = am4core.color("#D0D0D0");
    dateAxis.renderer.minGridDistance = 50; // Adjust this to control the spacin
    dateAxis.renderer.labels.template.fontSize = 12;
    dateAxis.renderer.labels.template.fill = am4core.color("#666666");
    dateAxis.baseInterval = {
      timeUnit: "minute",
      count: 15,
    };

    // Primary Value Axis
    // Create primary value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.5;
    valueAxis.renderer.grid.template.stroke = am4core.color("#D0D0D0");
    valueAxis.renderer.grid.template.fill = am4core.color("#FFA500");
    dateAxis.renderer.grid.template.fillOpacity = 1;
    // console.log("Date Axis Grid Fill:", dateAxis.renderer.grid.template.fill);
    valueAxis.renderer.minGridDistance = 30;
    // valueAxis.renderer.opposite = true;
    // Adding ticks to the Y-axis
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.length = 8; // Length of ticks, adjust as needed
    // Adjust the appearance of labels
    valueAxis.renderer.labels.template.fill = am4core.color("#666666"); // Dark grey color for text
    valueAxis.renderer.labels.template.fontSize = 12; // Font size for the labels
    valueAxis.renderer.labels.template.fontWeight = "bold"; // Make labels bold
    valueAxis.title.text = unit2 === "m³" ? "m³/ kWh" : "SCF/ kWh";
    valueAxis.title.fill = am4core.color("#666666");
    // Create series primary
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Production Per Unit"; // Name for the legend
    series.tooltipText = `Production Per Unit: [b]{valueY}[/] ${unit2 === "m³" ? "m³/ kWh" : "SCF/ kWh"}`;

    // series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#0077b6"); // Set series color to a specific blue
    series.strokeWidth = 3; // Set the stroke width
    // Drop-shaped tooltips
    series.tooltip.background.stroke = am4core.color("#FFF"); // Optionally change the border color
    series.tooltip.background.fill = am4core.color("#0077b6"); // Change color here
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.cornerRadius = 5;
    series.tooltip.background.strokeWidth = 2;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 150;
    series.tooltip.label.minHeight = 20;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    series.tooltip.autoTextColor = false;
    series.showOnInit = true;

    // Chart Legend
    chart.legend = new am4charts.Legend();
    chart.legend.markers.template.width = 15;
    chart.legend.markers.template.height = 15;
    chart.legend.scrollable = true;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.disabled = true;
    chart.cursor.lineX.disabled = false;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineY.opacity = 1; // Ensure the line is visible
    // chart.cursor.snapToSeries = [series, intervalSeries];
    // Styling plot area border
    chart.plotContainer.background.fill = am4core.color("#ffffff");
    chart.plotContainer.background.strokeWidth = 2;
    chart.plotContainer.background.stroke = am4core.color("#bdc6cd");
    dateAxis.keepSelection = true;
    calculateMinMax();
    // Calculate and display min/max
    function calculateMinMax() {
      var data = chart.data;
      var minValue = Infinity;
      var maxValue = -Infinity;

      for (var i = 0; i < data.length; i++) {
        var value = Number(data[i]["value"]);
        if (value > maxValue) maxValue = value;
        if (value < minValue) minValue = value;
      }

      if (maxValue !== -Infinity && minValue !== Infinity) {
        var maxRange = valueAxis.axisRanges.create();
        maxRange.value = maxValue;
        maxRange.grid.stroke = am4core.color("#24a7ff");
        maxRange.grid.strokeWidth = 1;
        maxRange.grid.strokeOpacity = 1;

        maxRange.label.text = `Max: ${maxValue.toFixed(2)} ${unit2 === "m³" ? "m³" : "SCF"}`;
        maxRange.label.fill = am4core.color("#FFFFFF");
        maxRange.label.inside = true;
        maxRange.label.fill = maxRange.grid.stroke;
        maxRange.label.verticalCenter = "top";
        maxRange.label.fontSize = 14; // Bigger font size
        maxRange.label.fontWeight = "bold"; // Bold text
        maxRange.label.valign = "top"; // Aligns the label to the top of the axis
      }
    }
    function updateAxisBackgrounds(chart) {
      // Assuming 'chart' is your AMCharts chart instance and 'valueAxis' is your value axis

      // Clear any existing axis range backgrounds
      chart.yAxes.each((axis) => {
        axis.axisRanges.clear();
      });

      // Calculate visible range
      let startValue = chart.yAxes.getIndex(0).min;
      let endValue = chart.yAxes.getIndex(0).max;
      let rangeWidth = (endValue - startValue) * 0.05; // 5% of the visible range

      // Create a range at the start of the axis
      var startRange = chart.yAxes.getIndex(0).axisRanges.create();
      startRange.value = startValue;
      startRange.endValue = startValue + rangeWidth;
      startRange.axisFill.fill = am4core.color("#fbbda4"); // Example color
      startRange.axisFill.fillOpacity = 0.5;

      // Create a range at the end of the axis
      var endRange = chart.yAxes.getIndex(0).axisRanges.create();
      endRange.value = endValue - rangeWidth;
      endRange.endValue = endValue;
      endRange.axisFill.fill = am4core.color("#fbbda4"); // Example color
      endRange.axisFill.fillOpacity = 0.5;
    }
    // After setting up your chart and series
    chart.events.on("datavalidated", function () {
      updateAxisBackgrounds(chart);
    });

    // Call it immediately after the chart is setup
    updateAxisBackgrounds(chart);
    chart.events.on("datarangechanged", function () {
      updateAxisBackgrounds(chart);
    });
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
          <Preloader />
        </div>
      )}
      <div className={`space-y-6 h-[85vh] ${isLoading ? "hidden" : ""}`}>
       

        <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h2 className="text-lg font-bold text-gray-500">
              Compressed Air- Production Per Unit
            </h2>
            <div className="flex items-center gap-3">
              <DateRangePicker range={range2} setRange={setRange2} />
              <select
                value={unit2}
                onChange={(e) => setUnit2(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="SCF">SCF</option>
                <option value="m³">m³</option>
              </select>
              <button className="p-1 rounded hover:bg-gray-200" title="Maximize">
                <FontAwesomeIcon icon={faMaximize} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex-grow p-4">
            <div
              id="chartdiv2"
              className="w-full h-[350px] border rounded bg-gray-50"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
