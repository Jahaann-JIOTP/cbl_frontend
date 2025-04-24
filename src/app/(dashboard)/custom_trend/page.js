"use client";
import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import "@amcharts/amcharts4/themes/animated";

function CustomTrend() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeter, setSelectedMeter] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState("");
  const [chartData, setChartData] = useState([]);

  const [showMeters, setShowMeters] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  // Standard meter mapping
  const meterMapping = {
    "Ozen 350": "U_3_EM3",
    "Atlas Copco": "U_4_EM4",
    "Compressor Aux": "U_5_EM5",
    "Ganzair Compressor": "U_6_EM6",
    "New Centac Comp#2": "U_9_EM9",
    "ML-132": "U_8_EM8",
    "New Centac Comp#1": "U_7_EM7",
    "Kaeser Compressor": "U_10_EM10",
    Dryer: "U_15",
    "DSD281(Kaeser)+ML-15": "U_21",
    "Solar Hostels": "U_22",
  };

  // Standard parameter mapping
  const parameterMapping = {
    "Active Energy Delv": "TotalActiveEnergy_kWh",
    "Active Energy Total": "TotalActiveEnergy_kWh",
    "Active Power A": "Activepower_PH1_W",
    "Active Power B": "Activepower_PH2_W",
    "Active Power C": "Activepower_PH3_W",
    "Active Power Total": "Activepower_Total_W",
    "Current A": "CurrentPh1_A",
    "Current B": "CurrentPh2_A",
    "Current C": "CurrentPh3_A",
    "Current Total": "CurrentAvg_A",
    Frequency: "Freq_Hz",
    "Power Factor A": "PF_PH1",
    "Power Factor B": "PF_PH2",
    "Power Factor C": "PF_PH3",
    "Power Factor Total": "PF_Avg",
    "Reactive Power A": "ReAPower_PH1_VAR",
    "Reactive Power B": "ReAPower_PH2_VAR",
    "Reactive Power Total": "ReAPower_Total_VAR",
    "Voltage A": "Voltage_pH1ToN_V",
    "Voltage B": "Voltage_pH2ToN_V",
    "Voltage C": "Voltage_pH3ToN_V",
    "Voltage LN": "VoltageLN_V",
    "Voltage AB": "Voltage_Ph1ToPh2_V",
    "Voltage BC": "Voltage_Ph2ToPh3_V",
    "Voltage CA": "Voltage_Ph3ToPh1_V",
    "Voltage LL": "AvgVoltageLL_V",
  };

  // Custom tag mapping for specific meters
  const customMeterMapping = {
    "New Centac Comp#2": {
      "Active Energy Delv": "ActiveEnergyDelivered_Wh",
      "Active Energy Total": "ActiveEnergy_DelpRec_Wh",
      "Active Power A": "ActivePowerA_kW",
      "Active Power B": "ActivePowerB_kW",
      "Active Power C": "ActivePowerC_kW",
      "Active Power Total": "ActivePowerTotal_kW",
      "Current A": "CurrentA_A",
      "Current B": "CurrentB_A",
      "Current C": "CurrentC_A",
      "Current Total": "CurrentAvg_A",
      Frequency: "Frequency_Hz",
      "Power Factor A": "PowerFactorA",
      "Power Factor B": "PowerFactorB",
      "Power Factor C": "PowerFactorC",
      "Power Factor Total": "PowerFactorTotal",
      "Reactive Power A": "ReactivePowerA_kVAR",
      "Reactive Power B": "ReactivePowerB_kVAR",
      "Reactive Power Total": "ReactivePowerTotal_kVAR",
      "Voltage A": "VoltageAN_V",
      "Voltage B": "VoltageBN_V",
      "Voltage C": "VoltageCN_V",
      "Voltage LN": "VoltageLN_V",
      "Voltage AB": "VoltageAB_V",
      "Voltage BC": "VoltageBC_V",
      "Voltage CA": "VoltageCA_V",
      "Voltage LL": "VoltageLL_V",
    },
    "New Centac Comp#1": {
      "Active Energy Delv": "ActiveEnergyDelivered_Wh",
      "Active Energy Total": "ActiveEnergy_DelpRec_Wh",
      "Active Power A": "ActivePowerA_kW",
      "Active Power B": "ActivePowerB_kW",
      "Active Power C": "ActivePowerC_kW",
      "Active Power Total": "ActivePowerTotal_kW",
      "Current A": "CurrentA_A",
      "Current B": "CurrentB_A",
      "Current C": "CurrentC_A",
      "Current Total": "CurrentAvg_A",
      Frequency: "Frequency_Hz",
      "Power Factor A": "PowerFactorA",
      "Power Factor B": "PowerFactorB",
      "Power Factor C": "PowerFactorC",
      "Power Factor Total": "PowerFactorTotal",
      "Reactive Power A": "ReactivePowerA_kVAR",
      "Reactive Power B": "ReactivePowerB_kVAR",
      "Reactive Power Total": "ReactivePowerTotal_kVAR",
      "Voltage A": "VoltageAN_V",
      "Voltage B": "VoltageBN_V",
      "Voltage C": "VoltageCN_V",
      "Voltage LN": "VoltageLN_V",
      "Voltage AB": "VoltageAB_V",
      "Voltage BC": "VoltageBC_V",
      "Voltage CA": "VoltageCA_V",
      "Voltage LL": "VoltageLL_V",
    },

    Dryer: {
      "Active Energy Delv": "ActiveEnergy_Delivered_kWh",
      "Active Energy Total": "ActiveEnergy_Total_kWh",
      "Active Power A": "ActivePower_A_kW",
      "Active Power B": "ActivePower_B_kW",
      "Active Power C": "ActivePower_C_kW",
      "Active Power Total": "ActivePower_Total_kW",
      "Current A": "Current_AN_Amp",
      "Current B": "Current_BN_Amp",
      "Current C": "Current_CN_Amp",
      "Current Total": "Current_Total_Amp",
      Frequency: "Frequency_Hz",
      // "Power Factor A": "PF_PH1",
      // "Power Factor B": "PF_PH2",
      // "Power Factor C": "PF_PH3",
      "Power Factor Total": "PowerFactor_Total",
      "Reactive Power A": "ReactivePower_A_kVAR",
      "Reactive Power B": "ReactivePower_B_kVAR",
      "Reactive Power C": "ReactivePower_C_kVAR",
      "Reactive Power Total": "ReactivePower_Total_kVAR",
      "Voltage A": "Voltage_AN_V",
      "Voltage B": "Voltage_BN_V",
      "Voltage C": "Voltage_CN_V",
      "Voltage LN": "Voltage_LN_V",
      "Voltage AB": "Voltage_AB_V",
      "Voltage BC": "Voltage_BC_V",
      "Voltage CA": "Voltage_CA_V",
      "Voltage LL": "Voltage_LL_V",
    },
    "DSD281(Kaeser)+ML-15": {
      "Active Energy Delv": "ActiveEnergy_Delivered_kWh",
      "Active Energy Total": "ActiveEnergy_Total_kWh",
      "Active Power A": "ActivePower_A_kW",
      "Active Power B": "ActivePower_B_kW",
      "Active Power C": "ActivePower_C_kW",
      "Active Power Total": "ActivePower_Total_kW",
      "Current A": "Current_AN_Amp",
      "Current B": "Current_BN_Amp",
      "Current C": "Current_CN_Amp",
      "Current Total": "Current_Total_Amp",
      Frequency: "Frequency_Hz",
      // "Power Factor A": "PF_PH1",
      // "Power Factor B": "PF_PH2",
      // "Power Factor C": "PF_PH3",
      "Power Factor Total": "PowerFactor_Total",
      "Reactive Power A": "ReactivePower_A_kVAR",
      "Reactive Power B": "ReactivePower_B_kVAR",
      "Reactive Power C": "ReactivePower_C_kVAR",
      "Reactive Power Total": "ReactivePower_Total_kVAR",
      "Voltage A": "Voltage_AN_V",
      "Voltage B": "Voltage_BN_V",
      "Voltage C": "Voltage_CN_V",
      "Voltage LN": "Voltage_LN_V",
      "Voltage AB": "Voltage_AB_V",
      "Voltage BC": "Voltage_BC_V",
      "Voltage CA": "Voltage_CA_V",
      "Voltage LL": "Voltage_LL_V",
    },
    "Solar Hostels": {
      "Active Energy Delv": "ActiveEnergy_Delivered_kWh",
      "Active Energy Total": "ActiveEnergy_Total_kWh",
      "Active Power A": "ActivePower_A_kW",
      "Active Power B": "ActivePower_B_kW",
      "Active Power C": "ActivePower_C_kW",
      "Active Power Total": "ActivePower_Total_kW",
      "Current A": "Current_AN_Amp",
      "Current B": "Current_BN_Amp",
      "Current C": "Current_CN_Amp",
      "Current Total": "Current_Total_Amp",
      Frequency: "Frequency_Hz",
      // "Power Factor A": "PF_PH1",
      // "Power Factor B": "PF_PH2",
      // "Power Factor C": "PF_PH3",
      "Power Factor Total": "PowerFactor_Total",
      "Reactive Power A": "ReactivePower_A_kVAR",
      "Reactive Power B": "ReactivePower_B_kVAR",
      "Reactive Power C": "ReactivePower_C_kVAR",
      "Reactive Power Total": "ReactivePower_Total_kVAR",
      "Voltage A": "Voltage_AN_V",
      "Voltage B": "Voltage_BN_V",
      "Voltage C": "Voltage_CN_V",
      "Voltage LN": "Voltage_LN_V",
      "Voltage AB": "Voltage_AB_V",
      "Voltage BC": "Voltage_BC_V",
      "Voltage CA": "Voltage_CA_V",
      "Voltage LL": "Voltage_LL_V",
    },
  };

  const generateSuffix = (meter, parameter) => {
    if (customMeterMapping[meter] && customMeterMapping[meter][parameter]) {
      return customMeterMapping[meter][parameter];
    }
    return parameterMapping[parameter] || null;
  };

  const meters = Object.keys(meterMapping);
  const parameters = Object.keys(parameterMapping);

  useEffect(() => {
    if (startDate && endDate && selectedMeter.length > 0 && selectedParameter) {
      const suffixes = selectedMeter
        .map((meter) => generateSuffix(meter, selectedParameter))
        .filter((suffix) => suffix)
        .join(",");

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/custom_trend.php?start_date=${startDate}&end_date=${endDate}&meterId=${selectedMeter
        .map((meter) => meterMapping[meter])
        .join(",")}&suffixes=${suffixes}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((apiData) => {
          const formattedData = apiData.map((item) => {
            const dataPoint = { timestamp: new Date(item.timestamp) };
            selectedMeter.forEach((meter) => {
              const meterKey = meterMapping[meter]; // e.g., U_7_EM7
              const suffix = generateSuffix(meter, selectedParameter); // e.g., ActiveEnergyDelivered_Wh
              const key = `${meterKey}_${suffix}`; // Construct exact key

              // Extract and format the value from the API response
              dataPoint[meter] =
                item.data?.[key] !== undefined && item.data?.[key] !== null
                  ? parseFloat(item.data[key]).toFixed(2)
                  : null;
            });
            return dataPoint;
          });
          setChartData(formattedData);
        });
    }
  }, [startDate, endDate, selectedMeter, selectedParameter]);

  useEffect(() => {
    if (chartData.length > 0) {
      const chartInstance = am4core.create("chartDiv", am4charts.XYChart);
      chartInstance.logo.disabled = true;
      chartInstance.dateFormatter.inputDateFormat = "yyyy-MM-ddTHH:mm:ss.sssZ";

      var dateAxis = chartInstance.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.labels.template.fontSize = 14;
      dateAxis.dateFormats.setKey("hour", "hha");

      chartInstance.language.locale["AM"] = "am";
      chartInstance.language.locale["PM"] = "pm";
      dateAxis.baseInterval = {
        timeUnit: "minute",
        count: 15,
      };
      const valueAxis = chartInstance.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = selectedParameter;
      valueAxis.title.fontSize = 14;
      valueAxis.renderer.labels.template.fontSize = 14;

      // Find max and min values from the data
      let allValues = [];
      chartData.forEach((data) => {
        selectedMeter.forEach((meter) => {
          if (data[meter] !== null) {
            allValues.push(data[meter]);
          }
        });
      });

      const max = Math.max(...allValues);
      const min = Math.min(...allValues);

      //target line for max and min

      var range = valueAxis.axisRanges.create();
      range.value = max;
      range.grid.stroke = am4core.color("#fda50f");
      range.grid.strokeWidth = 2;
      range.grid.strokeOpacity = 1;
      range.label.inside = true;
      range.label.text = "Max Peak at " + max;
      range.label.fill = range.grid.stroke;
      //range.label.align = "right";
      range.label.verticalCenter = "top"; // Align at the top of the max line
      range.label.dy = -10; // Add padding above the label
      // console.log(Object.keys(yAxis));
      //minimum range
      var range1 = valueAxis.axisRanges.create();
      range1.value = min;
      range1.grid.stroke = am4core.color("#02b169");
      range1.grid.strokeWidth = 2;
      range1.grid.strokeOpacity = 1;
      range1.label.inside = true;
      range1.label.text = "Min Peak at " + min;
      range1.label.fill = range1.grid.stroke;
      //range1.label.align = "right";
      range1.label.verticalCenter = "bottom";

      const colorSet = new am4core.ColorSet();
      colorSet.list = [
        am4core.color("#1a5c99"), // Darker Blue
        am4core.color("#cc660c"), // Darker Orange
        am4core.color("#239023"), // Darker Green
        am4core.color("#b22222"), // Darker Red
        am4core.color("#7a4a9e"), // Darker Purple
        am4core.color("#734d42"), // Darker Brown
        am4core.color("#c062a3"), // Darker Pink
        am4core.color("#666666"), // Darker Gray
        am4core.color("#999c19"), // Darker Olive
        am4core.color("#1495a6"), // Darker Teal
        am4core.color("#00ffff"), // Cyan
      ];
      selectedMeter.forEach((meter, index) => {
        const series = chartInstance.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = meter;
        series.dataFields.dateX = "timestamp";
        series.name = meter;
        series.tooltipText = "{name}\n{dateX}: [b]{valueY}[/";
        series.strokeWidth = 3;
        series.minBulletDistance = 15;
        series.stroke = colorSet.list[index % colorSet.list.length];
        series.fill = series.stroke;
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
      });

      chartInstance.cursor = new am4charts.XYCursor();
      chartInstance.data = chartData;
      chartInstance.scrollbarX = new am4charts.XYChartScrollbar();
      chartInstance.scrollbarX.minHeight = 15;
      function customizeGrip(grip) {
        // Remove default grip image
        grip.icon.disabled = true;

        // Disable background
        grip.background.disabled = true;

        // Add rotated rectangle as bi-di arrow
        var img = grip.createChild(am4core.Rectangle);
        img.width = 6;
        img.height = 6;
        img.fill = am4core.color("#999");
        img.rotation = 45;
        img.align = "center";
        img.valign = "middle";

        // Add vertical bar
        var line = grip.createChild(am4core.Rectangle);
        line.height = 15;
        line.width = 2;
        line.fill = am4core.color("#999");
        line.align = "center";
        line.valign = "middle";
      }

      customizeGrip(chartInstance.scrollbarX.startGrip);
      customizeGrip(chartInstance.scrollbarX.endGrip);
      // // Bring back colors
      chartInstance.scrollbarX.scrollbarChart.plotContainer.filters.clear();
      chartInstance.legend = new am4charts.Legend();
      chartInstance.legend.position = "bottom";
      chartInstance.legend.marginTop = 0;
      chartInstance.legend.fontSize = 12;
      chartInstance.legend.itemContainers.template.width = 110;
      chartInstance.legend.itemContainers.template.height = 18;
      chartInstance.legend.markers.template.width = 10;
      chartInstance.legend.markers.template.height = 10;
      chartInstance.legend.labels.template.wrap = true;
      chartInstance.legend.labels.template.truncate = true;
      chartInstance.legend.labels.template.maxWidth = 140;
      chartInstance.exporting.menu = new am4core.ExportMenu();
      // Customize file name
      chartInstance.exporting.filePrefix = "Customized_Trends";
      chartInstance.exporting.menu.align = "right";
      chartInstance.exporting.menu.verticalAlign = "top";
      chartInstance.exporting.formatOptions.getKey("json").disabled = true;
      chartInstance.exporting.formatOptions.getKey("html").disabled = true;
      chartInstance.exporting.formatOptions.getKey("csv").disabled = true;
      chartInstance.exporting.formatOptions.getKey("pdf").disabled = true;
      chartInstance.exporting.menu.items[0].icon =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
      return () => chartInstance.dispose();
    }
  }, [chartData, selectedMeter, selectedParameter]);

  return (
    // <div className="flex-shrink-0 w-full bg-[#F2F2F2] text-black h-[85vh] mr-7 rounded-[7px] border-t-4 border-t-[#1F5897] relative border-2 border-[#808080] opacity-75">
    // <div
    //   className="absolute top-2 left-4">
    //   <p
    //     className="text-lg font-bold">
    //     Customaized Trend
    //   </p>
    // </div>
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] ">
      {/* <div className="bg-white shadow-lg rounded-lg p-6"> */}
      <h1 className="text-lg font-bold text-gray-700 mb-4">Customized Trend</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="relative" onMouseLeave={() => setShowMeters(false)}>
          <label className="block text-sm font-medium text-gray-600">
            Select Meters
          </label>
          <button
            onClick={() => setShowMeters(!showMeters)}
            className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
          >
            {selectedMeter.length > 0
              ? `${selectedMeter[0]}${selectedMeter.length > 1 ? ", ..." : ""}`
              : "Select Meters"}
            <span>{showMeters ? "▲" : "▼"}</span>
          </button>
          {showMeters && (
            <div
              className="absolute bg-white border shadow-lg z-10 w-full max-h-48 overflow-y-auto"
              onMouseEnter={() => setShowMeters(true)} // Ensure dropdown stays open while hovering
              onMouseLeave={() => setShowMeters(false)} // Close dropdown when cursor leaves
            >
              {meters.map((meter) => (
                <label key={meter} className="block p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    value={meter}
                    checked={selectedMeter.includes(meter)}
                    onChange={() => {
                      setSelectedMeter((prev) =>
                        prev.includes(meter)
                          ? prev.filter((m) => m !== meter)
                          : [...prev, meter]
                      );
                    }}
                    className="mr-2"
                  />
                  {meter}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600">
            Select Parameter
          </label>
          <button
            onClick={() => setShowParameters(!showParameters)}
            className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
          >
            {selectedParameter || "Select Parameter"}
            <span>{showParameters ? "▲" : "▼"}</span>
          </button>
          {showParameters && (
            <div className="absolute bg-white border mt-1 shadow-lg z-10 w-full max-h-48 overflow-y-auto">
              {parameters.map((param) => (
                <label key={param} className="block p-2 hover:bg-gray-100">
                  <input
                    type="radio"
                    name="parameter"
                    value={param}
                    checked={selectedParameter === param}
                    onChange={(e) => {
                      setSelectedParameter(e.target.value); // Set the selected parameter
                      setShowParameters(false); // Close the dropdown
                    }}
                    className="mr-2"
                  />
                  {param}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div id="chartDiv" className="h-[80%]"></div>
    </div>
    // </div>
  );
}

export default CustomTrend;
