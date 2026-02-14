"use client";

import React, { useState, useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated.default);
// Mapping of tags to meter names
const meterNames = {
  "U_3_EM3_Activepower_Total_W": "Ozen Compressor",
  "U_4_EM4_Activepower_Total_W": "Atlas Copco",
  // "U_5_EM5_Activepower_Total_W": "Compressor Aux",
   // "U_10_EM10_Activepower_Total_W": "Kaeser Compressor",
  "U_6_EM6_Activepower_Total_W": "Ganzair Compressor",
  "U_9_EM9_ActivePowerTotal_kW": "New Centac Compressor#2",
  "U_8_EM8_Activepower_Total_W": "ComML_132",
  "U_7_EM7_ActivePowerTotal_kW": "New Centac Compressor#1",
  "U_21_ActivePower_Total_kW": "DSD281(Kaeser)+ML-15",
  // "U_15_ActivePower_Total_kW": "Dryer",
};


  const Production = () => {
   
      const [data, setData] = useState(null); // Initialize data as null
     
      const [dateRange, setDateRange] = useState([]); // Define dateRange in state
        const chartRef = useRef(null);
        // used for display data in table
        const [tableData, setTableData] = useState([]);
        const [startDate, setStartDate] = useState(""); // Store start date
        const [endDate, setEndDate] = useState(""); // Store end date
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        const [allTableData, setAllTableData] = useState([]); // Stores all data


        
    
      
    

     
   
        const fetchTableData = async () => {
          setLoading(true);
          setError(null);
      
          try {
            const response = await fetch(
              `https://cblapi.jahaann.com/add_pro1.php?start=${startDate || ""}&end=${endDate || ""}`
            );
            const data = await response.json();
      
            console.log("API Response:", data); // Debugging
      
            if (!data || data.length === 0) {
              setAllTableData([]);
              setTableData([]);
              setLoading(false);
              return;
            }
      
            // ✅ Extract date & map `airFlow` correctly
            const formattedData = data.map((entry) => ({
              date: entry.date || "---",
              CentacComp1: {
                m3: entry.tags.find((tag) => tag.tag === "U_7_EM7_ActivePowerTotal_kW")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_7_EM7_ActivePowerTotal_kW")?.efficiency || "---",
              },
              CentacComp2: {
                m3: entry.tags.find((tag) => tag.tag === "U_9_EM9_ActivePowerTotal_kW")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_9_EM9_ActivePowerTotal_kW")?.efficiency || "---",
              },
              AtlasCopco: {
                m3: entry.tags.find((tag) => tag.tag === "U_4_EM4_Activepower_Total_W")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_4_EM4_Activepower_Total_W")?.efficiency || "---",
              },
              Ozen_350: {
                m3: entry.tags.find((tag) => tag.tag === "U_3_EM3_Activepower_Total_W")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_3_EM3_Activepower_Total_W")?.efficiency || "---",
              },
              Ganzair: {
                m3: entry.tags.find((tag) => tag.tag === "U_6_EM6_Activepower_Total_W")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_6_EM6_Activepower_Total_W")?.efficiency || "---",
              },
              DSD_281: {
                m3: entry.tags.find((tag) => tag.tag === "U_21_ActivePower_Total_kW")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_21_ActivePower_Total_kW")?.efficiency || "---",
              },
              ComML_132: {
                m3: entry.tags.find((tag) => tag.tag === "U_8_EM8_Activepower_Total_W")?.airFlow || "---",
                efficiency: entry.tags.find((tag) => tag.tag === "U_8_EM8_Activepower_Total_W")?.efficiency || "---",
              },

              // KaeserCompressor: {
              //   m3: entry.tags.find((tag) => tag.tag === "U_10_EM10_Activepower_Total_W")?.airFlow || "---",
              //   efficiency: entry.tags.find((tag) => tag.tag === "U_10_EM10_Activepower_Total_W")?.efficiency || "---",
              // },
              // CompressorAux: {
              //   m3: entry.tags.find((tag) => tag.tag === "U_5_EM5_Activepower_Total_W")?.airFlow || "---",
              //   efficiency: entry.tags.find((tag) => tag.tag === "U_5_EM5_Activepower_Total_W")?.efficiency || "---",
              // },

            }));
      
            setAllTableData(formattedData);
            setTableData(formattedData);
          } catch (error) {
            setError("Error fetching data: " + error.message);
          } finally {
            setLoading(false);
          }
        };
      
        // ✅ Apply Filters on Table Data
        useEffect(() => {
          if (!startDate || !endDate) {
            setTableData(allTableData); // Show all data if no date is selected
          } else {
            const start = new Date(startDate);
            const end = new Date(endDate);
      
            const filteredData = allTableData.filter((row) => {
              const rowDate = new Date(row.date);
              return rowDate >= start && rowDate <= end;
            });
      
            setTableData(filteredData);
          }
        }, [startDate, endDate, allTableData]);
      
        // ✅ Fetch data when component mounts
        useEffect(() => {
          fetchTableData();
        }, []);
      
        // ✅ Fetch Chart Data
        const fetchAndRenderChartData = async () => {
          // ✅ Ensure default dates are used if startDate and endDate are empty
          const today = new Date().toISOString().split("T")[0]; 
          const apiStartDate = startDate || today;
          const apiEndDate = endDate || today;
        
          try {
            const response = await fetch(
              `https://cblapi.jahaann.com/add_pro1.php?start_date=${apiStartDate}&end_date=${apiEndDate}`
            );
            const data = await response.json();
        
            console.log("API Response:", data); // Debugging API response
        
            // ✅ Extract only efficiency data
            const processedData = data.map((entry) => ({
              date: new Date(entry.date),
              CentacComp1: parseFloat(entry.tags.find((tag) => tag.tag === "U_7_EM7_ActivePowerTotal_kW")?.efficiency) || 0,
                CentacComp2: parseFloat(entry.tags.find((tag) => tag.tag === "U_9_EM9_ActivePowerTotal_kW")?.efficiency) || 0,
                AtlasCopco: parseFloat(entry.tags.find((tag) => tag.tag === "U_4_EM4_Activepower_Total_W")?.efficiency) || 0,
                Ozen_350: parseFloat(entry.tags.find((tag) => tag.tag === "U_3_EM3_Activepower_Total_W")?.efficiency) || 0,
                Ganzair: parseFloat(entry.tags.find((tag) => tag.tag === "U_6_EM6_Activepower_Total_W")?.efficiency) || 0,
                DSD_281: parseFloat(entry.tags.find((tag) => tag.tag === "U_21_ActivePower_Total_kW")?.efficiency) || 0,
                ComML_132: parseFloat(entry.tags.find((tag) => tag.tag === "U_8_EM8_Activepower_Total_W")?.efficiency) || 0,
                // KaeserCompressor: parseFloat(entry.tags.find((tag) => tag.tag === "U_10_EM10_Activepower_Total_W")?.efficiency) || 0,
                // CompressorAux: parseFloat(entry.tags.find((tag) => tag.tag === "U_5_EM5_Activepower_Total_W")?.efficiency) || 0,
              }));
            
        
            if (chartRef.current) {
              chartRef.current.data = processedData; // ✅ Update chart data
              chartRef.current.invalidateData(); // Refresh chart
            }
          } catch (error) {
            console.error("Error fetching or processing data:", error);
          }
        };
        

  // Initialize and update chart
  useEffect(() => {
    const chart = am4core.create("chartdiv", am4charts.XYChart);
    chartRef.current = chart;
    chart.logo.disabled = true;
  
    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.title.text = "Date";
// dateAxis.title.fontSize = 16;  // Font size
// // dateAxis.title.fontWeight = "bold"; // Bold text
// dateAxis.title.fill = am4core.color("#000"); // Black color
// dateAxis.title.fontFamily = "Arial"; // Font family

  
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Efficiency(%)"; // ✅ Update Y-axis title
//     dateAxis.title.fontSize = 24;  // Font size
// // dateAxis.title.fontWeight = "bold"; // Bold text
// dateAxis.title.fill = am4core.color("#000"); // Black color
// dateAxis.title.fontFamily = "Arial"; // Font family
  
    // ✅ Define colors for efficiency lines
    const addSeries = (field, name, color) => {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.strokeWidth = 2;
      series.tensionX = 0.8;
      series.stroke = am4core.color(color);
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color(color);
      series.tooltipText = `${name}: [bold]{valueY}%[/]`; // ✅ Show percentage
  
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#fff");
      bullet.circle.strokeWidth = 2;
      bullet.circle.stroke = am4core.color(color);
    };
  
    // ✅ Define efficiency series
    const efficiencyData = [
      { field: "CentacComp1", name: "Centac Comp #1", color: "#FF5733" },
      { field: "CentacComp2", name: "Centac Comp #2", color: "#33FF57" },
      { field: "AtlasCopco", name: "Atlas Copco", color: "#5733FF" },
      { field: "Ozen_350", name: "Ozen 350", color: "#FFC300" },
      { field: "Ganzair", name: "Ganzair", color: "#C70039" },
      { field: "DSD_281", name: "DSD 281", color: "#F72D93" },
      // { field: "Compressor Aux", name: "Compressor Aux", color: "#F72D93" },
      // { field: "Kaeser Compressor", name: "Kaeser Compressor", color: "#e76f51" },
      { field: "ComML_132", name: "ComML_132", color: "#2a9d8f" },
    ];
  
    efficiencyData.forEach(({ field, name, color }) => {
      addSeries(field, name, color);
    });
  
    chart.cursor = new am4charts.XYCursor();
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
  
    return () => {
      chart.dispose();
    };
  }, []);
  

  useEffect(() => {
    fetchTableData();
    fetchAndRenderChartData();
}, [startDate, endDate]); // ✅ Runs when the date selection changes

  return (
    <div
      className="shadow-lg rounded-[8px] w-full h-[85vh] overflow-auto bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
      style={{ minHeight: "85vh" }}
    >
      
      <div className="flex-grow h-100 bg-white relative p-4">
          <h2 className="text-2xl font-semibold mb-4">Trend</h2>
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <div>
              <label htmlFor="start-date" className="block text-lg font-medium">
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
              <label htmlFor="end-date" className="block text-lg font-medium">
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

      {/* Error Message */}
      {error && (
        <div className="w-fulltext-center text-red-600 font-medium mt-4">
          {error}
        </div>
      )}
      <div className="flex h-full">
  <div className="flex-none w-1.5/4 h-[75vh] bg-white border-r border-gray-300 p-4 overflow-auto mt-[60px]">
    <h2 className="text-2xl font-semibold mb-4">Compressed Air Efficiency</h2>

  
     
      <div className="overflow-auto max-h-[850px]"> 
      <table className="table-auto w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-white">
          {/* ✅ Main Header Row - Sticks at the Top */}
          <tr className="bg-gray-500 text-white sticky top-0 z-20">
            <th className="border border-gray-300 px-3 py-2 text-lg bg-gray-500">Date</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Centac Comp #1</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Centac Comp #2</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Atlas Copco</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Ozen_350</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Ganzair</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">DSD 281</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">ComML_132</th>
            {/* <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Kaeser Compressor</th>
            <th colSpan="2" className="border border-gray-300 px-3 py-2 text-center bg-gray-500">Compressor Aux</th> */}
          </tr>
    
          {/* ✅ Subheader Row - Sticks Below the Main Header */}
          <tr className="bg-gray-100 text-gray-700 text-sm sticky top-[40px] z-10">
            <th className="border border-gray-300 px-3 py-1 bg-gray-100"></th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency(%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency(%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency(%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency(%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency(%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency(%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow (m³)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency (%)</th>
            {/* <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency (%)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">AirFlow(m³/min)</th>
            <th className="border border-gray-300 px-3 py-1 bg-gray-100">Efficiency (%)</th> */}
          </tr>
        </thead>
        <tbody>
  {loading ? (
    // ✅ Show "Loading data..." inside the table while loading
    <tr>
      <td colSpan="15" className="text-center py-3 text-gray-500">Loading data...</td>




    </tr>
  ) : tableData.length > 0 ? (
    tableData.map((row, index) => (
      <tr key={index} className="hover:bg-gray-50 transition">
        <td className="border border-gray-300 px-3 py-2 font-medium">{row.date || "---"}</td>
        {Object.values(row)
          .slice(1)
          .map((col, idx) => (
            <React.Fragment key={idx}>
              <td className="border border-gray-300 px-3 py-2 text-center">{col.m3 || "---"}</td>
              <td className="border border-gray-300 px-3 py-2 text-center">{col.efficiency || "---"}</td>
            </React.Fragment>
          ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="15" className="text-center py-4 text-gray-500">No data available</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
    
    
    
  </div>
</div>


    


        {/* Right Panel */}
       
      </div>
  
  );
};

export default Production;
