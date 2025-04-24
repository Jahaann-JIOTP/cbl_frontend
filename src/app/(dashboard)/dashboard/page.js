"use client";

import React, { useState, useEffect, useCallback } from "react";
// import Div from "@/components/Div";
import DateRangePicker1 from "@/components/newcalendar";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Chart.register(...registerables);

function DashboardPage() {
  const today = new Date();
  const [range, setRange] = useState({ from: today, to: today });
  const [range1, setRange1] = useState({ from: today, to: today });
  const [range2, setRange2] = useState({ from: today, to: today });
  const [range3, setRange3] = useState({ from: today, to: today });
  const [range4, setRange4] = useState({ from: today, to: today });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [error1, setError1] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [expandedCards, setExpandedCards] = useState({}); // Track expanded state for each card
  const [unit, setUnit] = useState("m3"); // Default unit is SCF
  const [unit1, setUnit1] = useState("m3"); // Unit for first div
  const [unit2, setUnit2] = useState("m³ / kWh"); // Unit for second divF
  const [unit3, setUnit3] = useState("m3"); // Default unit is SCF
  const [timePeriod, setTimePeriod] = useState("month"); // Default time period is "month"
  const [energyLoading4, setEnergyLoading4] = useState(false);
  const [energyError4, setEnergyError4] = useState(null);
  const [unit4, setUnit4] = useState("m3");
  const [timePeriod1, setTimePeriod1] = useState("month");

  // Toggle the expansion of a specific card
  // const toggleExpand = (cardKey) => {
  //   setExpandedCards((prevState) => ({
  //     ...prevState,
  //     [cardKey]: !prevState[cardKey],
  //   }));
  // };

  // Toggle the expansion of a specific card
  const toggleExpand = (cardKey) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [cardKey]: !prevState[cardKey],
    }));
  };

  // State for Energy Usage Data
  const [energyData, setEnergyData] = useState(null);
  const [energyLoading, setEnergyLoading] = useState(false);
  const [energyError, setEnergyError] = useState(null);
  const [energyData1, setEnergyData1] = useState(null);
  const [energyLoading1, setEnergyLoading1] = useState(false);
  const [energyError1, setEnergyError1] = useState(null);
  const [energyData2, setEnergyData2] = useState(null);
  const [energyLoading2, setEnergyLoading2] = useState(false);
  const [energyError2, setEnergyError2] = useState(null);
  const [energyData3, setEnergyData3] = useState(null);
  const [energyLoading3, setEnergyLoading3] = useState(false);
  const [energyError3, setEnergyError3] = useState(null);
  // Fetch Energy Usage Data
  const fetchEnergyData = async (startDate, endDate) => {
    setEnergyLoading(true);
    setEnergyError(null);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/total_energy_S1.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData = await response.json();
      setEnergyData(fetchedData);
    } catch (err) {
      setEnergyError("Failed to fetch energy data.");
      console.error("Error fetching energy data:", err);
    } finally {
      setEnergyLoading(false);
    }
  };

  const fetchEnergyData1 = async (startDate, endDate) => {
    setEnergyLoading1(true);
    setEnergyError1(null);

    const apiUrl1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/total_energy_com.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl1);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData1 = await response.json();
      setEnergyData1(fetchedData1);
    } catch (err) {
      setEnergyError1("Failed to fetch energy data.");
      console.error("Error fetching energy data:", err);
    } finally {
      setEnergyLoading1(false);
    }
  };
  const fetchEnergyData2 = async (startDate, endDate) => {
    setEnergyLoading2(true);
    setEnergyError2(null);

    const apiUrl2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/total_energy_comA.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl2);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData2 = await response.json();
      setEnergyData2(fetchedData2);
    } catch (err) {
      setEnergyError2("Failed to fetch energy data.");
      console.error("Error fetching energy data:", err);
    } finally {
      setEnergyLoading2(false);
    }
  };

  const fetchEnergyData3 = async (startDate, endDate) => {
    setEnergyLoading3(true);
    setEnergyError3(null);

    const apiUrl3 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/total_energy_KM.php?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl3);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData3 = await response.json();
      setEnergyData3(fetchedData3);
    } catch (err) {
      setEnergyError3("Failed to fetch energy data.");
      console.error("Error fetching energy data:", err);
    } finally {
      setEnergyLoading3(false);
    }
  };
  // Fetch energy data on range change
  useEffect(() => {
    const fetchAllData = async () => {
      const fetchIfRangeValid = async (range, fetchFunction) => {
        if (range.from && range.to) {
          const startDate = format(range.from, "yyyy-MM-dd");
          const endDate = format(range.to, "yyyy-MM-dd");
          await fetchFunction(startDate, endDate);
        }
      };

      await Promise.all([
        fetchIfRangeValid(range, fetchEnergyData),
        fetchIfRangeValid(range1, fetchEnergyData1),
        fetchIfRangeValid(range2, fetchEnergyData2),
        fetchIfRangeValid(range3, fetchEnergyData3),
      ]);
    };

    // Perform an initial fetch
    fetchAllData();

    // Set up periodic updates
    const interval = setInterval(() => {
      fetchAllData();
    }, 10 * 60 * 1000); // 15 minutes

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [range, range1, range2, range3]);
  useEffect(() => {
    const startDate = range4.from ? format(range4.from, "yyyy-MM-dd") : null;
    const endDate = range4.to ? format(range4.to, "yyyy-MM-dd") : null;

    if (startDate && endDate) {
      const apiUrl4 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exploding.php?start_date=${startDate}&end_date=${endDate}&Label=Custom Range`;

      // Fetch data from API
      fetch(apiUrl4)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Initialize chart
          initializeChart(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [range4, unit]);

  const initializeChart = (data) => {
    am4core.useTheme(am4themes_animated);
    // Destroy any existing chart instances to avoid duplication
    // am4core.disposeAllCharts();

    // var container = am4core.create("chartdiv", am4core.Container);
    // if (container) {
    //   container.dispose();
    // }

    var container = am4core.create("chartdiv", am4core.Container);
    container.logo.disabled = true;
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    // Main Pie Chart
    var chart = container.createChild(am4charts.PieChart);
    chart.data = data.map((item) => {
      if (item.country === "Compressed Air") {
        const convertedValue =
          unit === "m3" ? (item.litres * 1000) / 35.31 : item.litres;
        return { ...item, litres: convertedValue };
      }
      return item;
    });

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;
    pieSeries.labels.template.fontSize = 13; // Reduce label font size
    pieSeries.slices.template.propertyFields.fill = "color";

    pieSeries.labels.template.adapter.add("text", function (text, target) {
      var category = target.dataItem.dataContext.country; // Access the category (Compressed Air, Electricity, etc.)
      console.log(category);

      var value = target.dataItem.value; // Get the value (litres)
      var displayUnit = category === "Compressed Air" ? unit : "kWh";

      // Display category, value, and unit, or fallback if value is undefined
      if (value !== undefined && value !== null) {
        return category + ":" + value.toFixed(2) + " " + displayUnit;
      } else {
        return category + "\nNo Value"; // Fallback if no value is found
      }
    });

    pieSeries.slices.template.events.on("hit", function (event) {
      selectSlice(event.target.dataItem);
    });

    // Sub Pie Chart
    let chart2 = container.createChild(am4charts.PieChart);
    chart2.width = am4core.percent(40); // Increased width
    chart2.radius = am4core.percent(70);

    var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    pieSeries2.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;
    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = false;
    pieSeries2.events.on("positionchanged", updateLines);
    var interfaceColors = new am4core.InterfaceColorSet();

    var line1 = container.createChild(am4core.Line);
    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;

    var line2 = container.createChild(am4core.Line);
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground");
    line2.isMeasured = false;

    var selectedSlice;

    function selectSlice(dataItem) {
      if (!dataItem || !dataItem.slice) {
        console.error("No slice found for the selected dataItem:", dataItem);
        return;
      }

      selectedSlice = dataItem.slice;
      var fill = selectedSlice.fill;

      var count = dataItem.dataContext.subData.length;
      pieSeries2.colors.list = [];
      for (var i = 0; i < count; i++) {
        pieSeries2.colors.list.push(fill.brighten((i * 2) / count));
      }

      chart2.data = dataItem.dataContext.subData;
      pieSeries2.appear();

      var middleAngle = selectedSlice.middleAngle;
      var firstAngle = pieSeries.slices.getIndex(0).startAngle;
      var animation = pieSeries.animate(
        [
          {
            property: "startAngle",
            to: firstAngle - middleAngle,
          },
          {
            property: "endAngle",
            to: firstAngle - middleAngle + 360,
          },
        ],
        600,
        am4core.ease.sinOut
      );
      animation.events.on("animationprogress", updateLines);

      selectedSlice.events.on("transformed", updateLines);
    }

    function updateLines() {
      if (selectedSlice) {
        var p11 = {
          x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle),
          y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle),
        };
        var p12 = {
          x:
            selectedSlice.radius *
            am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc),
          y:
            selectedSlice.radius *
            am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc),
        };

        p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
        p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

        var p21 = {
          x: 0,
          y: -pieSeries2.pixelRadius,
        };
        var p22 = {
          x: 0,
          y: pieSeries2.pixelRadius,
        };

        p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
        p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

        line1.x1 = p11.x;
        line1.x2 = p21.x;
        line1.y1 = p11.y;
        line1.y2 = p21.y;

        line2.x1 = p12.x;
        line2.x2 = p22.x;
        line2.y1 = p12.y;
        line2.y2 = p22.y;
      }
    }

    chart.events.on("datavalidated", function () {
      setTimeout(function () {
        selectSlice(pieSeries.dataItems.getIndex(0));
      }, 1000);
    });
  };
  // useEffect(() => {
  //   fetchChartData("today"); // Fetch "Today over Yesterday" chart by default
  // }, []);
  useEffect(() => {
    let chart; // Local variable for the chart instance

    // Initialize AmCharts theme and create the chart
    am4core.useTheme(am4themes_animated);
    chart = am4core.create("chartdiv1", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;

    // Cleanup on component unmount
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []); // Only run on mount/unmount

  const fetchChartData = useCallback(async (value) => {
    setLoading(true);
    setError(null);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/database5.php?value=${value}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data for", value, ":", data);
      updateChart(data, value);
    } catch (err) {
      setError("Failed to fetch chart data.");
      console.error("Error fetching chart data:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchChartData("month");
  }, [fetchChartData]);

  const updateChart = (data, value) => {
    // Avoid using ref; rely on a scoped variable
    const chart = am4core.create("chartdiv1", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;
    chart.legend.labels.template.fontSize = "12px";
    if (!chart) return;

    // Define variables for dynamic axes and series
    // Define variables for dynamic axes and series
    let xaxis = "Time";
    let yaxis1 = "Yesterday";
    let yaxis2 = "Today";
    let w1 = "Yesterday (kWh)";
    let w2 = "Today (kWh)";

    if (value === "week") {
      w1 = "Last Week (kWh)";
      w2 = "This Week (kWh)";
      xaxis = "Days";
      yaxis1 = "Last Week (kWh)";
      yaxis2 = "This Week (kWh)";
    } else if (value === "month") {
      w1 = "Last Month (kWh)";
      w2 = "This Month (kWh)";
      xaxis = "Weeks";
      yaxis1 = "Last Month";
      yaxis2 = "This Month";
    } else if (value === "year") {
      w1 = "Previous Year (kWh)";
      w2 = "Current Year (kWh)";
      xaxis = "Month";
      yaxis1 = "Previous Year (kWh)";
      yaxis2 = "Current Year (kWh)";
    }

    // Update chart data
    chart.data = data;

    // Clear existing axes and series
    chart.xAxes.clear();
    chart.yAxes.clear();
    chart.series.clear();

    // Configure X-Axis
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = xaxis;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.line.strokeOpacity = 1;
    xAxis.renderer.minGridDistance = 50;
    // xAxis.renderer.labels.template.fontSize = 10;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.labels.template.fontSize = "12px";
    chart.colors.list = [am4core.color("#67B7DC"), am4core.color("#1F5897")];

    // Configure Y-Axis
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // yAxis.title.text = "kWh";
    // yAxis.title.fontSize = "14px";
    yAxis.min = 0;
    yAxis.renderer.labels.template.fontSize = "12px";

    // Add series for "Yesterday/Last Period" and "Today/Current Period"
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field; // E.g., "Last Month" or "This Month"
      series.dataFields.categoryX = xaxis; // E.g., "Weeks"
      series.name = name; // E.g., "Last Month (kWh)"
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
      series.columns.template.width = am4core.percent(50);
      // Adjust tooltip position
      series.tooltip.pointerOrientation = "vertical"; // Points directly up or down
      series.tooltip.dy = -10; // Adjust the vertical offset
      series.tooltip.label.textAlign = "middle"; // Center-align text
      series.tooltip.background.stroke = am4core.color("#000"); // Optional: Tooltip border color
      series.tooltip.background.strokeWidth = 2;
      return series;
    }

    createSeries(yaxis1, w1); // E.g., "Last Month", "Last Month (kWh)"
    createSeries(yaxis2, w2); // E.g., "This Month", "This Month (kWh)"

    // Add a cursor for interactivity
    chart.cursor = new am4charts.XYCursor();
  };
  // 2nd chart
  useEffect(() => {
    fetchChartData1("month"); // Fetch "Today over Yesterday" chart by default
  }, []);
  useEffect(() => {
    let chart; // Local variable for the chart instance

    // Initialize AmCharts theme and create the chart
    am4core.useTheme(am4themes_animated);
    chart = am4core.create("chartdiv2", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;

    // Cleanup on component unmount
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []); // Only run on mount/unmount

  const fetchChartData1 = async (value) => {
    setLoading1(true);
    setError1(null);

    const apiUrl1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/electricity_period.php?value=${value}`;

    try {
      const response = await fetch(apiUrl1);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data for", value, ":", data); // Debug log
      updateChart1(data, value); // Pass data to chart update function
    } catch (err) {
      setError1("Failed to fetch chart data.");
      console.error("Error fetching chart data:", err);
    } finally {
      setLoading1(false);
    }
  };

  const updateChart1 = (data, value) => {
    // Avoid using ref; rely on a scoped variable
    const chart = am4core.create("chartdiv2", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;
    chart.legend.labels.template.fontSize = "12px";
    if (!chart) return;

    // Define variables for dynamic axes and series
    // Define variables for dynamic axes and series
    let xaxis = "Time";
    let yaxis1 = "Yesterday";
    let yaxis2 = "Today";
    let w1 = "Yesterday (kWh)";
    let w2 = "Today (kWh)";

    if (value === "week") {
      w1 = "Last Week (kWh)";
      w2 = "This Week (kWh)";
      xaxis = "Days";
      yaxis1 = "Last Week (kWh)";
      yaxis2 = "This Week (kWh)";
    } else if (value === "month") {
      w1 = "Last Month (kWh)";
      w2 = "This Month (kWh)";
      xaxis = "Weeks";
      yaxis1 = "Last Month";
      yaxis2 = "This Month";
    } else if (value === "year") {
      w1 = "Previous Year (kWh)";
      w2 = "Current Year (kWh)";
      xaxis = "Month";
      yaxis1 = "Previous Year (kWh)";
      yaxis2 = "Current Year (kWh)";
    }

    // Update chart data
    chart.data = data;

    // Clear existing axes and series
    chart.xAxes.clear();
    chart.yAxes.clear();
    chart.series.clear();

    // Configure X-Axis
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = xaxis;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.line.strokeOpacity = 1;
    xAxis.renderer.minGridDistance = 50;
    // xAxis.renderer.labels.template.fontSize = 10;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.labels.template.fontSize = "12px";
    chart.colors.list = [am4core.color("#67B7DC"), am4core.color("#1F5897")];

    // Configure Y-Axis
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // yAxis.title.text = "kWh";
    // yAxis.title.fontSize = "14px";
    yAxis.min = 0;
    yAxis.renderer.labels.template.fontSize = "12px";

    // Add series for "Yesterday/Last Period" and "Today/Current Period"
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field; // E.g., "Last Month" or "This Month"
      series.dataFields.categoryX = xaxis; // E.g., "Weeks"
      series.name = name; // E.g., "Last Month (kWh)"
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
      series.columns.template.width = am4core.percent(50);
      // Adjust tooltip position
      series.tooltip.pointerOrientation = "vertical"; // Points directly up or down
      series.tooltip.dy = -10; // Adjust the vertical offset
      series.tooltip.label.textAlign = "middle"; // Center-align text
      series.tooltip.background.stroke = am4core.color("#000"); // Optional: Tooltip border color
      series.tooltip.background.strokeWidth = 2;
      return series;
    }

    createSeries(yaxis1, w1); // E.g., "Last Month", "Last Month (kWh)"
    createSeries(yaxis2, w2); // E.g., "This Month", "This Month (kWh)"

    // Add a cursor for interactivity
    chart.cursor = new am4charts.XYCursor();
  };
  //3RD CHART
  useEffect(() => {
    fetchChartData2(timePeriod); // Fetch data for the selected time period
  }, [unit3, timePeriod]); // Refetch data whenever unit3 or timePeriod changes

  useEffect(() => {
    let chart; // Local variable for the chart instance

    // Initialize AmCharts theme and create the chart
    am4core.useTheme(am4themes_animated);
    chart = am4core.create("chartdiv3", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;

    // Cleanup on component unmount
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []); // Only run on mount/unmount

  const fetchChartData2 = async (value) => {
    setLoading2(true);
    setError2(null);

    const apiUrl2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/compressed_period.php?value=${value}`;

    try {
      const response = await fetch(apiUrl2);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();

      // Convert values to m³ if selected
      if (unit3 === "m3") {
        data = data.map((item) => {
          const convertedItem = { ...item };
          Object.keys(convertedItem).forEach((key) => {
            if (key !== "Time" && typeof convertedItem[key] === "number") {
              convertedItem[key] = ((convertedItem[key] * 1000) / 35.31).toFixed(2);
            }
          });
          return convertedItem;
        });
      }

      console.log("Fetched Data for", value, ":", data); // Debug log
      updateChart2(data, value); // Pass data to chart update function
    } catch (err) {
      setError2("Failed to fetch chart data.");
      console.error("Error fetching chart data:", err);
    } finally {
      setLoading2(false);
    }
  };

  const updateChart2 = (data, value) => {
    // Avoid using ref; rely on a scoped variable
    const chart = am4core.create("chartdiv3", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;
    chart.legend.labels.template.fontSize = "12px";
    if (!chart) return;

    // Define variables for dynamic axes and series
    let xaxis = "Time";
    let yaxis1 = "Yesterday";
    let yaxis2 = "Today";
    let w1 = "Yesterday";
    let w2 = "Today";

    if (value === "week") {
      w1 = "Last Week";
      w2 = "This Week";
      xaxis = "Days";
      yaxis1 = "Last Week";
      yaxis2 = "This Week";
    } else if (value === "month") {
      w1 = "Last Month";
      w2 = "This Month";
      xaxis = "Weeks";
      yaxis1 = "Last Month";
      yaxis2 = "This Month";
    } else if (value === "year") {
      w1 = "Previous Year";
      w2 = "Current Year";
      xaxis = "Month";
      yaxis1 = "Previous Year";
      yaxis2 = "Current Year";
    }

    // Update chart data
    chart.data = data;

    // Clear existing axes and series
    chart.xAxes.clear();
    chart.yAxes.clear();
    chart.series.clear();

    // Configure X-Axis
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = xaxis;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.line.strokeOpacity = 1;
    xAxis.renderer.minGridDistance = 50;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.labels.template.fontSize = "12px";
    chart.colors.list = [am4core.color("#67B7DC"), am4core.color("#1F5897")];

    // Configure Y-Axis
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.renderer.labels.template.fontSize = "12px";

    // Add series for "Yesterday/Last Period" and "Today/Current Period"
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field; // E.g., "Last Month" or "This Month"
      series.dataFields.categoryX = xaxis; // E.g., "Weeks"
      series.name = name; // E.g., "Last Month (kWh)"
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
      series.columns.template.width = am4core.percent(50);
      series.tooltip.pointerOrientation = "vertical"; // Points directly up or down
      series.tooltip.dy = -10; // Adjust the vertical offset
      series.tooltip.label.textAlign = "middle"; // Center-align text
      series.tooltip.background.stroke = am4core.color("#000"); // Optional: Tooltip border color
      series.tooltip.background.strokeWidth = 2;
      return series;
    }

    createSeries(yaxis1, w1); // E.g., "Last Month", "Last Month (kWh)"
    createSeries(yaxis2, w2); // E.g., "This Month", "This Month (kWh)"

    // Add a cursor for interactivity
    chart.cursor = new am4charts.XYCursor();
  };
  const fetchEnergyData4 = async (value) => {
    setEnergyLoading4(true);
    setEnergyError4(null);

    const apiUrl5 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cousmption_per_unitflow.php?value=${value}`;

    try {
      const response = await fetch(apiUrl5);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();

      // Convert values to m³ if selected
      // Convert values to m³ if selected
      if (unit4 === "m3") {
        data = data.map((item) => {
          const convertedItem = { ...item };
          Object.keys(convertedItem).forEach((key) => {
            if (["Time", "Day", "Weeks", "Month", "year"].includes(key)) return;
            const numericValue = parseFloat(convertedItem[key]);
            if (!isNaN(numericValue)) {
              convertedItem[key] = Number(
                ((numericValue * 1000) / 35.31).toFixed(1)
              );
            }
          });
          return convertedItem;
        });
        console.log("Converted Data:", data);
      }

      console.log("Fetched Data for", value, ":", data); // Debug log
      updateChart4(data, value); // Pass data to chart update function
    } catch (err) {
      setEnergyError4("Failed to fetch chart data.");
      console.error("Error fetching chart data:", err);
    } finally {
      setEnergyLoading4(false);
    }
  };

  const updateChart4 = (data, value) => {
    // Create the chart instance in the container with id "chartdiv4"
    const chart = am4core.create("chartdiv4", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }

    // Set up legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    const markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.fontSize = "12px";

    // Dynamic mapping based on the value parameter:
    let xField, series1Field, series2Field, series1Name, series2Name;

    if (value === "today") {
      // Expected API output: { "Time": "00:00", "Yesterday_Flow": number, "Today_Flow": number }
      xField = "Time";
      series1Field = "Yesterday";
      series2Field = "Today";
      series1Name = "Yesterday";
      series2Name = "Today";
    } else if (value === "week") {
      // Expected API output: { "Days": "Mon", "Last Week Flow": number, "This Week Flow": number }
      xField = "Day";
      series1Field = "Last Week";
      series2Field = "This Week";
      series1Name = "Last Week";
      series2Name = "This Week";
    } else if (value === "month") {
      // Expected API output: { "Weeks": "Week1", "Last Month": number, "This Month": number }
      xField = "Weeks";
      series1Field = "Last Month";
      series2Field = "This Month";
      series1Name = "Last Month";
      series2Name = "This Month";
    } else if (value === "year") {
      // Expected API output: { "Month": "Jan", "Previous Year": number, "Current Year": number }
      xField = "Month";
      series1Field = "Previous Year";
      series2Field = "Current Year";
      series1Name = "Previous Year";
      series2Name = "Current Year";
    } else {
      // Fallback mapping (if needed)
      xField = "Time";
      series1Field = "Value1";
      series2Field = "Value2";
      series1Name = "Series 1";
      series2Name = "Series 2";
    }

    // Set the chart data (ensure your backend sends valid JSON)
    chart.data = data;

    // Clear any existing axes and series
    chart.xAxes.clear();
    chart.yAxes.clear();
    chart.series.clear();

    // Configure X-Axis (CategoryAxis)
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = xField;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.line.strokeOpacity = 1;
    xAxis.renderer.minGridDistance = 50;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.labels.template.fontSize = "12px";
    chart.colors.list = [am4core.color("#67B7DC"), am4core.color("#1F5897")];

    // Configure Y-Axis (ValueAxis)
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.renderer.labels.template.fontSize = "12px";

    // Helper function: Create a column series
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field; // E.g., "Today_Flow" or "This Month"
      series.dataFields.categoryX = xField; // E.g., "Time" or "Weeks"
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
      series.columns.template.width = am4core.percent(50);
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.dy = -10;
      series.tooltip.label.textAlign = "middle";
      series.tooltip.background.stroke = am4core.color("#000");
      series.tooltip.background.strokeWidth = 2;
      return series;
    }

    // Create series for both groups:
    createSeries(series1Field, series1Name);
    createSeries(series2Field, series2Name);

    // Add a cursor for interactivity
    chart.cursor = new am4charts.XYCursor();
  };

  //3RD CHART
  useEffect(() => {
    fetchEnergyData4(timePeriod1); // ✅ Now it calls the correct function
  }, [unit4, timePeriod1]);

  useEffect(() => {
    let chart; // Local variable for the chart instance

    // Initialize AmCharts theme and create the chart
    am4core.useTheme(am4themes_animated);
    chart = am4core.create("chartdiv4", am4charts.XYChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valign = "middle";
    chart.legend.maxWidth = 180;
    chart.legend.scrollable = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 9;
    markerTemplate.height = 9;
    chart.legend.paddingBottom = 5;

    // Cleanup on component unmount
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []); // Only run on mount/unmount

  return (
    <main className="p-1">
      <div className="flex flex-wrap gap-3">
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-md rounded-md p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold text-gray-500">
              Solar Generation
            </h2>
            <DateRangePicker1 range={range} setRange={setRange} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm text-left mt-2">
            <span>
              {range.from
                ? `${format(range.from, "MMM dd, yyyy")} → ${
                    range.to
                      ? format(range.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* Energy Value */}
          <div className="flex items-center justify-center mt-4 overflow-hidden text-ellipsis">
            {energyLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : energyError ? (
              <p className="text-red-500">{energyError}</p>
            ) : energyData ? (
              <p className="text-[20px] text-gray-700 font-bold truncate">
                {parseFloat(energyData).toFixed(1)} kWh
              </p>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-md rounded-md p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold text-gray-500">
              Wapda Consumption
            </h2>
            <DateRangePicker1 range={range1} setRange={setRange1} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm text-left mt-2">
            <span>
              {range1.from
                ? `${format(range1.from, "MMM dd, yyyy")} → ${
                    range1.to
                      ? format(range1.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* Energy Value */}
          <div className="flex items-center justify-center mt-4 overflow-hidden text-ellipsis">
            {energyLoading1 ? (
              <p className="text-gray-500">Loading...</p>
            ) : energyError1 ? (
              <p className="text-red-500">{energyError1}</p>
            ) : energyData1 ? (
              <p className="text-[20px] text-gray-700 font-bold truncate">
                {parseFloat(energyData1).toFixed(1)} kWh
              </p>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-md rounded-md p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold text-gray-500">Compressed Air</h2>
            {/* Dropdown for Unit Selection */}
            <div className="flex justify-end mt-2">
              <select
                value={unit1}
                onChange={(e) => setUnit1(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md text-gray-500 text-sm ml-[50px]"
              >
                <option value="SCF">SCF</option>
                <option value="m3">m³</option>
              </select>
            </div>
            <DateRangePicker1 range={range2} setRange={setRange2} />
          </div>

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm text-left mt-2">
            <span>
              {range2.from
                ? `${format(range2.from, "MMM dd, yyyy")} → ${
                    range2.to
                      ? format(range2.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* Energy Value */}
          <div className="flex items-center justify-center mt-4 overflow-hidden text-ellipsis">
            {energyLoading2 ? (
              <p className="text-gray-500">Loading...</p>
            ) : energyError2 ? (
              <p className="text-red-500">{energyError2}</p>
            ) : energyData2 ? (
              <p className="text-[20px] text-gray-700 font-bold truncate">
                {unit1 === "SCF"
                  ? parseFloat(energyData2).toFixed(1)
                  : ((parseFloat(energyData2) * 1000) / 35.31).toFixed(1)}{" "}
                {unit1}
              </p>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* Second Div */}
        <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] border-t-[5px] border-[#1f5897] bg-white shadow-md rounded-md p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h3 className="text-md font-bold text-gray-500">
              Consumption Per Unit Flow
            </h3>
            <div className="flex justify-end mt-2">
              <select
                value={unit2}
                onChange={(e) => setUnit2(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md text-gray-500 text-sm mr-[3px]"
              >
                <option value="SCF / kWh">SCF / kWh</option>
                <option value="m³ / kWh">m³ / kWh</option>
              </select>
            </div>
            <DateRangePicker1 range={range3} setRange={setRange3} />
          </div>

          {/* Dropdown for Unit Selection */}

          {/* Date Range Display */}
          <div className="text-gray-500 text-sm text-left mt-2">
            <span>
              {range3.from
                ? `${format(range3.from, "MMM dd, yyyy")} → ${
                    range3.to
                      ? format(range3.to, "MMM dd, yyyy")
                      : "Select End Date"
                  }`
                : "Pick Date Range"}
            </span>
          </div>

          {/* Energy Value */}
          <div className="flex items-center justify-center mt-4 overflow-hidden text-ellipsis">
            {energyLoading3 ? (
              <p className="text-gray-500">Loading...</p>
            ) : energyError3 ? (
              <p className="text-red-500">{energyError3}</p>
            ) : energyData3 ? (
              <p className="text-[20px] text-gray-700 font-bold truncate">
                {unit2 === "SCF / kWh"
                  ? parseFloat(energyData3).toFixed(1)
                  : ((parseFloat(energyData3) * 1000) / 35.31).toFixed(1)}{" "}
                {unit2}
              </p>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* Add other divs from the first row here (not repeated for brevity)... */}

        {/* Second Row */}
        <div className="w-full flex flex-wrap gap-2 mt-2">
          <div className="w-full lg:w-[31.6%] xl:w-[31.8%] border-t-[5px] border-[#1f5897] bg-white shadow-md rounded-md p-3 h-[35vh]">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-gray-500">Weather</h3>
            </div>

            {/* Content */}

            <iframe
              width="100%"
              height="89%"
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=7&overlay=wind&product=ecmwf&level=surface&lat=31.920&lon=73.273&detailLat=31.890&detailLon=73.275&detail=true"
              frameborder="0"
            ></iframe>
          </div>

          <div className="w-full sm:w-[48%] md:w-[32%] lg:w-[66%] border-t-[5px] border-[#1f5897] bg-white shadow-md rounded-md p-4">
            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center">
              <h3 className="text-md font-bold text-gray-500">
                Utilities Consumption Breakdown
              </h3>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="ml-2 px-2 py-1 border border-gray-300 rounded-md ml-[410px]"
              >
                <option value="SCF">SCF</option>
                <option value="m3">m³</option>
              </select>
              <div className="mt-2 sm:mt-0">
                <DateRangePicker1 range={range4} setRange={setRange4} />
              </div>
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

            {/* Content */}
            <div
              id="chartdiv"
              className="w-full h-[40vh] sm:h-[30vh] md:h-[25vh] lg:h-[20vh] mt-4"
            >
              {/* The chart will render here */}
            </div>
          </div>

          {/* Card 1 */}
          <div
            className={`${
              expandedCards["solarGeneration"]
                ? "absolute top-0 left-0 w-full h-screen z-[999] bg-white opacity-100 p-6"
                : "relative w-full sm:w-[42%] md:w-[28%] lg:w-[26%] xl:w-[24%] h-[30vh] bg-white opacity-100"
            } border-t-[5px] border-[#1f5897] shadow-md rounded-md transition-all duration-300`}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-gray-500 truncate">
                Total Solar Energy Usage
              </h3>
              <div className="flex items-center gap-2">
                <select
                  className="w-[149px] text-gray-600 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => fetchChartData(e.target.value)}
                >
                  <option value="month">This Month over Last Month</option>
                  <option value="week">This Week over Last Week</option>
                  <option value="today">Today over Yesterday</option>
                  <option value="year">This Year over Last Year</option>
                </select>
                <button
                  onClick={() => toggleExpand("solarGeneration")} // Toggle expansion for this card
                  className="p-2 font-bold text-[20px]"
                  title={
                    expandedCards["solarGeneration"] ? "Minimize" : "Maximize"
                  }
                >
                  {expandedCards["solarGeneration"] ? "⛶" : "⛶"}
                </button>
              </div>
            </div>

            {/* Content */}

            <div className="relative w-full h-[83%] ">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                  <p className="text-gray-500 text-lg mt-[-80px]">Loading...</p>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                  <p className="text-red-500 text-lg font-semibold">{error}</p>
                </div>
              )}
              <div id="chartdiv1" className="w-full h-full"></div>
            </div>

            {/* Close Button for Expanded View
  {expandedCards && (
    <button
      onClick={toggleExpand}
      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-md focus:outline-none"
      title="Close"
    >
      ✖
    </button>
  )} */}
          </div>

          {/* Card 2 */}
          <div
            className={`${
              expandedCards["energyConsumption"]
                ? "absolute top-0 left-0 w-full h-screen z-[999] bg-white opacity-100 p-6"
                : "relative w-full sm:w-[42%] md:w-[28%] lg:w-[26%] xl:w-[24%] h-[30vh] bg-white opacity-100"
            } border-t-[5px] border-[#1f5897] shadow-md rounded-md transition-all duration-300`}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-gray-500 truncate">
                Total Electricity Energy Usage
              </h3>
              <div className="flex items-center gap-2">
                <select
                  className="w-[149px] text-gray-600 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => fetchChartData1(e.target.value)}
                >
                  <option value="month">This Month over Last Month</option>
                  <option value="week">This Week over Last Week</option>
                  <option value="today">Today over Yesterday</option>
                  <option value="year">This Year over Last Year</option>
                </select>
                <button
                  onClick={() => toggleExpand("energyConsumption")} // Toggle expansion for this card
                  className="p-2 font-bold text-[20px]"
                  title={
                    expandedCards["energyConsumption"] ? "Minimize" : "Maximize"
                  }
                >
                  {expandedCards["energyConsumption"] ? "⛶" : "⛶"}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative w-full h-[83%]">
              {loading1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                  <p className="text-gray-500  mt-[-80px]">Loading...</p>
                </div>
              )}
              <div id="chartdiv2" className="w-full h-full"></div>
            </div>

            {/* Close Button for Expanded View
  {expandedCards && (
    <button
      onClick={toggleExpand}
      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-md focus:outline-none"
      title="Close"
    >
      ✖
    </button>
  )} */}
          </div>

          {/* Card 3 */}
          <div
            className={`${
              expandedCards["airConsumption"]
                ? "absolute top-0 left-0 w-full h-screen z-[999] bg-white opacity-100 p-6"
                : "relative w-full sm:w-[42%] md:w-[28%] lg:w-[26%] xl:w-[24%] h-[30vh] bg-white opacity-100"
            } border-t-[5px] border-[#1f5897] shadow-md rounded-md transition-all duration-300`}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-gray-500 truncate">
                Total Compressed Air Usage
              </h3>
              {/* Unit Selection */}
              <select
                id="unit3"
                value={unit3}
                onChange={(e) => setUnit3(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm flex-shrink-0"
              >
                <option value="SCF">SCF</option>
                <option value="m3">m³</option>
              </select>

              <div className="flex items-center gap-2">
                <select
                  id="timePeriod"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="w-[150px] text-gray-600 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 flex-shrink-0"
                >
                  <option value="month">This Month over Last Month</option>
                  <option value="week">This Week over Last Week</option>
                  <option value="today">Today over Yesterday</option>
                  <option value="year">This Year over Last Year</option>
                </select>
                <button
                  onClick={() => toggleExpand("airConsumption")} // Toggle expansion for this card
                  className="p-2 font-bold text-[20px]"
                  title={
                    expandedCards["airConsumption"] ? "Minimize" : "Maximize"
                  }
                >
                  {expandedCards["airConsumption"] ? "⛶" : "⛶"}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative w-full h-[83%]">
              {/* Loading Indicator */}
              {loading2 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                  <p className="text-gray-500 mt-[-80px]">Loading...</p>
                </div>
              )}

              {/* Chart Container */}
              <div id="chartdiv3" className="w-full h-full"></div>
            </div>
          </div>
          <div
            className={`${
              expandedCards["airConsumption1"]
                ? "absolute top-0 left-0 w-full h-screen z-[999] bg-white opacity-100 p-6"
                : "relative w-full sm:w-[44%] md:w-[29%] lg:w-[27%] xl:w-[25%] h-[30vh] bg-white opacity-100"
            } border-t-[5px] border-[#1f5897] shadow-md rounded-md transition-all duration-300`}
          >
            {/* Header with Expand Icon in One Line */}
            <div className="flex justify-between items-center px-2 py-1">
              <h3 className="text-md font-bold text-gray-500 truncate">
                Total Consumption per Unit Flow
              </h3>

              <div className="flex items-center space-x-2">
                {/* Unit Selection */}
                <select
                  id="unit4"
                  value={unit4}
                  onChange={(e) => setUnit4(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                >
                  <option value="SCF">SCF</option>
                  <option value="m3">m³</option>
                </select>

                {/* Time Period Selection */}
                <select
                  id="timePeriod"
                  value={timePeriod1}
                  onChange={(e) => setTimePeriod1(e.target.value)}
                  className="w-[160px] text-gray-600 text-sm bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="month">This Month over Last Month</option>
                  <option value="week">This Week over Last Week</option>
                  <option value="today">Today over Yesterday</option>
                  <option value="year">This Year over Last Year</option>
                </select>

                {/* Expand Icon */}
                <button
                  onClick={() => toggleExpand("airConsumption1")}
                  className="p-[-3] font-bold text-[20px]"
                  title={
                    expandedCards["airConsumption1"] ? "Minimize" : "Maximize"
                  }
                >
                  {expandedCards["airConsumption1"] ? "⛶" : "⛶"}
                </button>
              </div>
            </div>

            {/* Loading/Error Messages */}
            <div className="relative w-full h-[90%]">
              {/* Loading/Error Overlay */}
              {(energyLoading4 || energyError4) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                  {energyLoading4 && (
                    <p className="text-gray-500 text-lg mt-[-80px]">
                      Loading...
                    </p>
                  )}
                  {energyError4 && (
                    <p className="text-red-500 text-lg">{energyError4}</p>
                  )}
                </div>
              )}

              {/* Chart Container */}
              <div id="chartdiv4" className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
