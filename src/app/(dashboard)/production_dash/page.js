"use client";

import React, { useState, useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated.default);

const Production = () => {
  const chartRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 15);
    const formattedStartDate = startDate.toISOString().split("T")[0];

    setStartDate(formattedStartDate);
    setEndDate(endDate);
  }, []);
  // Fetch table data
  const fetchTableData = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(
        `https://www.cblapi.jiotp.com/cbl_backend/add_pro_backend.php?start_date=${startDate}&end_date=${endDate}`
      );
      const data = await response.json();

      const dateRange = [];
      const currentDate = new Date(startDate);
      const end = new Date(endDate);

      while (currentDate <= end) {
        dateRange.push(new Date(currentDate).toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Process data and include "---" for missing dates
      const processedTableData = dateRange.map((date) => {
        const values = data.flow_per_production[date];
        if (values) {
          return {
            date,
            GWP: values.GWP_total_flow,
            Airjet: values.Airjet_total_flow,
            Sewing2: values.Sewing2_total_flow,
            Textile: values.Textile_total_flow,
            Sewing1: values.Sewing1_total_flow,
            PG: values.PG_total_flow,
          };
        }
        return {
          date,
          GWP: "---",
          Airjet: "---",
          Sewing2: "---",
          Textile: "---",
          Sewing1: "---",
          PG: "---",
        };
      });

      setTableData(processedTableData);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };


  // Fetch chart data
  const fetchAndRenderChartData = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(
        `https://www.cblapi.jiotp.com/cbl_backend/add_pro_backend.php?start_date=${startDate}&end_date=${endDate}`
      );
      const data = await response.json();

      const processedData = Object.entries(data.flow_per_production).map(
        ([date, values]) => ({
          date: new Date(date), // Convert date string to Date object
          GWP: values.GWP_total_flow,
          Airjet: values.Airjet_total_flow,
          Sewing2: values.Sewing2_total_flow,
          Textile: values.Textile_total_flow,
          Sewing1: values.Sewing1_total_flow,
          PG: values.PG_total_flow,
        })
      );

      if (chartRef.current) {
        chartRef.current.data = processedData; // Update chart data
        chartRef.current.invalidateData(); // Refresh chart
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  // Initialize and update chart
  useEffect(() => {
    // Initialize the chart
    const chart = am4core.create("chartdiv", am4charts.XYChart);
    chartRef.current = chart;
    chart.logo.disabled = true; // Disable amCharts logo

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.title.text = "Date";

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Compressed Air per Production";

    // Add series dynamically
    const addSeries = (field, name, color, tooltipSuffix) => {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.strokeWidth = 2;
      series.tensionX = 0.8;
      series.stroke = am4core.color(color);
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color(color); // Match tooltip color with line
      series.tooltipText = `${name}: [bold]{valueY} ${tooltipSuffix}[/]`;

      // Add bullets to data points
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#fff"); // White center
      bullet.circle.strokeWidth = 2;
      bullet.circle.stroke = am4core.color(color); // Border matches line color
    };

    // Define colors, series, and tooltip suffixes
    const seriesData = [
      { field: "GWP", name: "GWP", color: "#FF5733", tooltipSuffix: "m³ / garment" },
      { field: "Airjet", name: "Airjet", color: "#33FF57", tooltipSuffix: "m³ / meter" },
      { field: "Sewing2", name: "Sewing2", color: "#5733FF", tooltipSuffix: "m³ / garment" },
      { field: "Textile", name: "Textile", color: "#FFC300", tooltipSuffix: "m³ / meter" },
      { field: "Sewing1", name: "Sewing1", color: "#C70039", tooltipSuffix: "m³ / garment" },
      { field: "PG", name: "PG", color: "#F72D93", tooltipSuffix: "m³ / kWh" },
    ];

    seriesData.forEach(({ field, name, color, tooltipSuffix }) => {
      addSeries(field, name, color, tooltipSuffix);
    });

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineY.strokeWidth = 0;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";

    return () => {
      chart.dispose(); // Cleanup on component unmount
    };
  }, []);



  useEffect(() => {
    fetchTableData();
    fetchAndRenderChartData();
  }, [startDate, endDate]);

  return (
    <div
      className="shadow-lg rounded-[8px] w-full h-[85vh] overflow-auto bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
      style={{ minHeight: "85vh" }}
    >
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="flex-none w-1.5/4 h-[95%] bg-white border-r border-gray-300 p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Compressed Air per Production</h2>
          <table className="table-auto w-full h-auto border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-400">
                <th className="border border-gray-300 px-2 py-1"></th> {/* Empty cell for the Date column */}
                <th className="border border-gray-300 px-2 py-1 text-center" colSpan="3">m³ / garment</th>
                <th className="border border-gray-300 px-2 py-1 text-center" colSpan="2">m³ / meter</th>
                <th className="border border-gray-300 px-2 py-1 text-center">m³ / kWh</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-2 py-1">Date</th>
                <th className="border border-gray-300 px-2 py-1">GWP</th>
                <th className="border border-gray-300 px-2 py-1">Sewing1</th>
                <th className="border border-gray-300 px-2 py-1">Sewing2</th>
                <th className="border border-gray-300 px-2 py-1">Airjet</th>
                <th className="border border-gray-300 px-2 py-1">Textile</th>
                <th className="border border-gray-300 px-2 py-1">PG</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 py-1">{row.date}</td>
                    <td
                      className="border border-gray-300 px-2 py-1"
                      title={row.GWP === "---" ? "No Production is Added" : ""}
                    >
                      {row.GWP === "---" ? (
                        <span className="text-red-500">{row.GWP}</span>
                      ) : (
                        row.GWP.toFixed(2)
                      )}
                    </td>
                    <td
                      className="border border-gray-300 px-2 py-1"
                      title={row.Sewing1 === "---" ? "No Production is Added" : ""}
                    >
                      {row.Sewing1 === "---" ? (
                        <span className="text-red-500">{row.Sewing1}</span>
                      ) : (
                        row.Sewing1.toFixed(2)
                      )}
                    </td>
                    <td
                      className="border border-gray-300 px-2 py-1"
                      title={row.Sewing2 === "---" ? "No Production is Added" : ""}
                    >
                      {row.Sewing2 === "---" ? (
                        <span className="text-red-500">{row.Sewing2}</span>
                      ) : (
                        row.Sewing2.toFixed(2)
                      )}
                    </td>
                    <td
                      className="border border-gray-300 px-2 py-1"
                      title={row.Airjet === "---" ? "No Production is Added" : ""}
                    >
                      {row.Airjet === "---" ? (
                        <span className="text-red-500">{row.Airjet}</span>
                      ) : (
                        row.Airjet.toFixed(2)
                      )}
                    </td>
                    <td
                      className="border border-gray-300 px-2 py-1"
                      title={row.Textile === "---" ? "No Production is Added" : ""}
                    >
                      {row.Textile === "---" ? (
                        <span className="text-red-500">{row.Textile}</span>
                      ) : (
                        row.Textile.toFixed(2)
                      )}
                    </td>
                    <td
                      className="border border-gray-300 px-2 py-1"
                      title={row.PG === "---" ? "No Production is Added" : ""}
                    >
                      {row.PG === "---" ? (
                        <span className="text-red-500">{row.PG}</span>
                      ) : (
                        row.PG.toFixed(2)
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border border-gray-300 px-2 py-1 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>


          </table>
        </div>

        {/* Right Panel */}
        <div className="flex-grow h-full bg-white relative p-4">
          <h2 className="text-lg font-semibold mb-4">Trend</h2>
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="border border-gray-300 rounded-md p-1 w-40"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                className="border border-gray-300 rounded-md p-1 w-40"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Chart Div */}
          <div id="chartdiv" className="w-full h-[600px] mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Production;
