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
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded); // Toggle the expand state
  };
  const [range, setRange] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });
  const [range1, setRange1] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });
  const [range2, setRange2] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });
  const [range3, setRange3] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });
  const [range4, setRange4] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });
  const [range5, setRange5] = useState({
    from: startOfToday(),
    to: startOfToday(),
  });

  useEffect(() => {
    // Fetch and render the first chart with the default date range (today) on load
    const formattedStart = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData(formattedStart, formattedEnd);
  }, []);

  useEffect(() => {
    // Fetch and render the second chart with the default date range (today) on load
    const formattedStart1 = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd1 = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData1(formattedStart1, formattedEnd1);
  }, []);
  useEffect(() => {
    // Fetch and render the second chart with the default date range (today) on load
    const formattedStart2 = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd2 = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData2(formattedStart2, formattedEnd2);
  }, []);
  useEffect(() => {
    // Fetch and render the second chart with the default date range (today) on load
    const formattedStart3 = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd3 = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData3(formattedStart3, formattedEnd3);
  }, []);
  useEffect(() => {
    // Fetch and render the second chart with the default date range (today) on load
    const formattedStart4 = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd4 = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData4(formattedStart4, formattedEnd4);
  }, []);
  useEffect(() => {
    // Fetch and render the second chart with the default date range (today) on load
    const formattedStart5 = format(startOfToday(), "yyyy-MM-dd");
    const formattedEnd5 = format(startOfToday(), "yyyy-MM-dd");
    fetchChartData5(formattedStart5, formattedEnd5);
  }, []);

  useEffect(() => {
    // Fetch chart data when date range changes for the first chart
    if (range.from && range.to) {
      const formattedStart = format(range.from, "yyyy-MM-dd");
      const formattedEnd = format(range.to, "yyyy-MM-dd");
      fetchChartData(formattedStart, formattedEnd);
    }
  }, [range]);

  useEffect(() => {
    // Fetch chart data when date range changes for the second chart
    if (range1.from && range1.to) {
      const formattedStart1 = format(range1.from, "yyyy-MM-dd");
      const formattedEnd1 = format(range1.to, "yyyy-MM-dd");
      fetchChartData1(formattedStart1, formattedEnd1);
    }
  }, [range1]);

  useEffect(() => {
    // Fetch chart data when date range changes for the second chart
    if (range2.from && range2.to) {
      const formattedStart2 = format(range2.from, "yyyy-MM-dd");
      const formattedEnd2 = format(range2.to, "yyyy-MM-dd");
      fetchChartData2(formattedStart2, formattedEnd2);
    }
  }, [range2]);
  useEffect(() => {
    // Fetch chart data when date range changes for the second chart
    if (range3.from && range3.to) {
      const formattedStart3 = format(range3.from, "yyyy-MM-dd");
      const formattedEnd3 = format(range3.to, "yyyy-MM-dd");
      fetchChartData3(formattedStart3, formattedEnd3);
    }
  }, [range3]);
  useEffect(() => {
    // Fetch chart data when date range changes for the second chart
    if (range4.from && range4.to) {
      const formattedStart4 = format(range4.from, "yyyy-MM-dd");
      const formattedEnd4 = format(range4.to, "yyyy-MM-dd");
      fetchChartData4(formattedStart4, formattedEnd4);
    }
  }, [range4]);
  useEffect(() => {
    // Fetch chart data when date range changes for the second chart
    if (range5.from && range5.to) {
      const formattedStart5 = format(range5.from, "yyyy-MM-dd");
      const formattedEnd5 = format(range5.to, "yyyy-MM-dd");
      fetchChartData5(formattedStart5, formattedEnd5);
    }
  }, [range5]);
  // Simulate data fetching and preloader
  useEffect(() => {
    setIsLoading(true); // Show preloader
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  const fetchChartData = async (startDate, endDate) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bev_activeenergy.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      renderChart(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const fetchChartData1 = async (startDate, endDate) => {
    const apiUrl1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bev_activepower.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;

    try {
      const response = await fetch(apiUrl1);
      const data = await response.json();
      renderChart1(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const fetchChartData2 = async (startDate, endDate) => {
    const apiUrl2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bev_voltage.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;

    try {
      const response = await fetch(apiUrl2);
      const data = await response.json();
      renderChart2(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const fetchChartData3 = async (startDate, endDate) => {
    const apiUrl3 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bev_current.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;

    try {
      const response = await fetch(apiUrl3);
      const data = await response.json();
      renderChart3(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const fetchChartData4 = async (startDate, endDate) => {
    const apiUrl4 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bev_pf.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;

    try {
      const response = await fetch(apiUrl4);
      const data = await response.json();
      renderChart4(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const fetchChartData5 = async (startDate, endDate) => {
    const apiUrl5 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bev_har.php?startDate=${startDate}&endDate=${endDate}&Label=Custom Range`;

    try {
      const response = await fetch(apiUrl5);
      const data = await response.json();
      renderChart5(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const renderChart = (data) => {
    am4core.useTheme(am4themes_animated);

    // Dispose of existing chart instance
    // const chartContainer = am4core.registry.baseSprites;
    // if (chartContainer.length > 0) {
    //   chartContainer.forEach((chart) => chart.dispose());
    // }

    // Create chart
    const chart = am4core.create("chartdiv", am4charts.XYChart);
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
    valueAxis.renderer.minGridDistance = 30;
    // Adjust the appearance of labels
    valueAxis.renderer.labels.template.fill = am4core.color("#666666"); // Dark grey color for text
    valueAxis.renderer.labels.template.fontSize = 12; // Font size for the labels
    valueAxis.renderer.labels.template.fontWeight = "bold"; // Make labels bold
    // Title for the Value Axis
    valueAxis.title.text = "MWh Del";
    valueAxis.title.rotation = -90;
    valueAxis.title.fill = am4core.color("#666666");
    valueAxis.title.fontSize = 14;
    valueAxis.title.fontWeight = "bold";
    valueAxis.title.valign = "middle";
    valueAxis.title.align = "center";
    valueAxis.title.dy = -15;
    valueAxis.title.dx = 0;
    var intervalAxis = chart.yAxes.push(new am4charts.ValueAxis());
    intervalAxis.renderer.opposite = true; // Position on the opposite side
    intervalAxis.title.text = "MWh Del Int";
    intervalAxis.renderer.labels.template.fill = am4core.color("#666");
    intervalAxis.renderer.ticks.template.disabled = false;
    intervalAxis.renderer.ticks.template.strokeOpacity = 0.5;
    intervalAxis.renderer.ticks.template.length = 8; // Length of ticks, adjust as needed
    intervalAxis.renderer.labels.template.fill = am4core.color("#666666"); // Dark grey color for text
    intervalAxis.renderer.labels.template.fontSize = 12; // Font size for the labels
    intervalAxis.renderer.labels.template.fontWeight = "bold";

    // Line Series for Active Energy
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Active Energy"; // Name for the legend
    // series.tooltipText = "{name}: [b]{valueY}[/]";
    series.tooltipText = "Energy Usage: [bold]{valueY} MWh[/]";

    // series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#139346"); // Set series color to a specific blue
    series.strokeWidth = 3; // Set the stroke width
    // Drop-shaped tooltips
    series.tooltip.background.fill = am4core.color("#139346"); // Change color here
    series.tooltip.getFillFromObject = false;
    series.tooltip.autoBackground = true;
    series.tooltip.background.cornerRadius = 5;
    series.tooltip.background.strokeWidth = 2;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 150;
    series.tooltip.label.minHeight = 20;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    series.tooltip.autoTextColor = false;
    series.showOnInit = true;

    // Column Series for Intervals
    // Column series for intervals
    var intervalSeries = chart.series.push(new am4charts.ColumnSeries());
    intervalSeries.dataFields.valueY = "interval";
    intervalSeries.dataFields.dateX = "date";
    intervalSeries.yAxis = intervalAxis; // Link to secondary axis
    intervalSeries.columns.template.fill = am4core.color("#1e86cd");
    intervalSeries.name = "Energy Usage Interval";

    intervalSeries.tooltipText = "{name}: [bold]{valueY}[/]";

    // Configuring the tooltip
    intervalSeries.tooltipText = "Energy Usage Interval: [bold]{valueY} MWh[/]";
    intervalSeries.tooltip.background.fill = am4core.color("#FFF");
    intervalSeries.tooltip.background.stroke = am4core.color("#FFF");
    intervalSeries.tooltip.background.cornerRadius = 5;
    intervalSeries.tooltip.background.strokeWidth = 2;
    intervalSeries.tooltip.pointerOrientation = "vertical";
    intervalSeries.tooltip.label.minWidth = 150;
    intervalSeries.tooltip.label.minHeight = 20;
    intervalSeries.tooltip.label.textAlign = "middle";
    intervalSeries.tooltip.label.textValign = "middle";

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
  };
  const renderChart1 = (data) => {
    am4core.useTheme(am4themes_animated);

    // Dispose of existing chart instance
    const chartContainer = am4core.registry.baseSprites;
    // if (chartContainer.length > 0) {
    //   chartContainer.forEach((chart) => chart.dispose());
    // }

    // Create chart
    const chart = am4core.create("chartdiv1", am4charts.XYChart);
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
    // dateAxis.renderer.labels.template.fill = am4core.color("#666666");
    dateAxis.baseInterval = {
      timeUnit: "minute",
      count: 15,
    };

    // Primary Value Axis
    // Create primary value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.5;
    valueAxis.renderer.grid.template.stroke = am4core.color("#D0D0D0");
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.title.text = "kW";
    // valueAxis.renderer.opposite = true;
    // Adding ticks to the Y-axis
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.length = 8; // Length of ticks, adjust as needed
    // Adjust the appearance of labels
    valueAxis.renderer.labels.template.fill = am4core.color("#666666"); // Dark grey color for text
    valueAxis.renderer.labels.template.fontSize = 12; // Font size for the labels
    valueAxis.renderer.labels.template.fontWeight = "bold"; // Make labels bold
    valueAxis.title.fill = am4core.color("#666666");
    // Create series primary
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Real Power"; // Name for the legend
    series.tooltipText = "Real Power: [b]{valueY}[/] kW";

    // series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#1e86cd"); // Set series color to a specific blue
    series.strokeWidth = 3; // Set the stroke width
    // Drop-shaped tooltips
    series.tooltip.background.stroke = am4core.color("#FFF"); // Optionally change the border color
    series.tooltip.background.fill = am4core.color("#1e86cd"); // Change color here
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
      // Ensure the valueAxis exists
      if (!valueAxis || !chart.data) {
        console.error("valueAxis or chart data is not defined");
        return;
      }

      const chartData = chart.data;
      if (!chartData || chartData.length === 0) return; // Guard clause for empty data

      let minValue = Infinity;
      let maxValue = -Infinity;

      // Calculate min and max values
      chartData.forEach((item) => {
        const value = Number(item["value"]);
        if (!isNaN(value)) {
          if (value > maxValue) maxValue = value;
          if (value < minValue) minValue = value;
        }
      });

      if (maxValue !== -Infinity && minValue !== Infinity) {
        // Clear existing ranges (if any)
        valueAxis.axisRanges.clear();

        // Add max value range
        const maxRange = valueAxis.axisRanges.create();
        maxRange.value = maxValue;
        maxRange.grid.stroke = am4core.color("#24a7ff");
        maxRange.grid.strokeWidth = 1;
        maxRange.grid.strokeOpacity = 1;

        maxRange.label.text = `Max: ${maxValue.toFixed(2)} kW`;
        maxRange.label.fill = am4core.color("#FFFFFF");
        maxRange.label.inside = true;
        maxRange.label.fill = maxRange.grid.stroke;
        maxRange.label.verticalCenter = "top";
        maxRange.label.fontSize = 14;
        maxRange.label.fontWeight = "bold";

        // Add min value range
        // const minRange = valueAxis.axisRanges.create();
        // minRange.value = minValue;
        // minRange.grid.stroke = am4core.color("#ff6666");
        // minRange.grid.strokeWidth = 1;
        // minRange.grid.strokeOpacity = 1;

        // minRange.label.text = `Min: ${minValue.toFixed(2)} kW`;
        // minRange.label.fill = am4core.color("#FFFFFF");
        // minRange.label.inside = true;
        // minRange.label.fill = minRange.grid.stroke;
        // minRange.label.verticalCenter = "bottom";
        // minRange.label.fontSize = 14;
        // minRange.label.fontWeight = "bold";

        // Optional: Threshold indication
        var range = valueAxis.axisRanges.create();
        range.value = 550; // This is your threshold value
        range.endValue = 0; // This should be higher than the highest expected value, adjust as necessary
        range.axisFill.fill = am4core.color("#e3f2dd"); // Green color
        range.axisFill.fillOpacity = 0.7; // Adjust opacity as needed

        // Adding a red line at the threshold
        var thresholdLine = valueAxis.axisRanges.create();
        thresholdLine.value = 550;
        thresholdLine.grid.stroke = am4core.color("#FF0000"); // Red line
        thresholdLine.grid.strokeWidth = 3;
        thresholdLine.grid.strokeOpacity = 1;
      }
    }
  };

  const renderChart2 = (data) => {
    am4core.useTheme(am4themes_animated);

    // Dispose of existing chart instance
    // const chartContainer = am4core.registry.baseSprites;
    // // if (chartContainer.length > 0) {
    //   chartContainer.forEach((chart) => chart.dispose());
    // }

    // Create chart
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
    valueAxis.title.text = "Volts";
    valueAxis.title.fill = am4core.color("#666666");
    // Create series primary
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Avg Voltage"; // Name for the legend
    series.tooltipText = "Avg Voltage: [b]{valueY}[/] V";

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

        maxRange.label.text = "Max: " + maxValue.toFixed(2) + " kW"; // Label text with rounded value
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

  const renderChart3 = (data) => {
    am4core.useTheme(am4themes_animated);

    // Dispose of existing chart instance
    // const chartContainer = am4core.registry.baseSprites;
    // // if (chartContainer.length > 0) {
    //   chartContainer.forEach((chart) => chart.dispose());
    // }

    // Create chart
    const chart = am4core.create("chartdiv3", am4charts.XYChart);
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
    // Create primary value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.5;
    valueAxis.renderer.grid.template.stroke = am4core.color("#D0D0D0");
    dateAxis.renderer.grid.template.fillOpacity = 1;
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
    valueAxis.title.text = "Amps";
    valueAxis.title.fill = am4core.color("#666666");
    // Create series primary
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Avg Current"; // Name for the legend
    series.tooltipText = "Avg Current: [b]{valueY}[/] A";

    // series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#f68d00"); // Set series color to a specific orange
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
      var total = 0;
      var count = data.length;

      for (var i = 0; i < count; i++) {
        var value = Number(data[i]["value"]);
        if (value > maxValue) maxValue = value;
        if (value < minValue) minValue = value;
        total += value;
      }
      var mean = total / count;
      var varianceSum = 0;

      // Calculate variance for standard deviation
      for (var i = 0; i < count; i++) {
        var value = Number(data[i]["value"]);
        varianceSum += Math.pow(value - mean, 2);
      }

      var standardDeviation = Math.sqrt(varianceSum / count);
      var threshold = mean + 2 * standardDeviation; // Adjust multiplier as needed
      // Remove previous ranges to update with new ones
      valueAxis.axisRanges.clear();

      // Create and configure the max value range
      if (maxValue !== -Infinity) {
        var maxRange = valueAxis.axisRanges.create();
        maxRange.value = maxValue;
        maxRange.grid.stroke = am4core.color("#f68d00"); // Red color for max value
        maxRange.grid.strokeWidth = 2;
        maxRange.grid.strokeOpacity = 0.8;
        maxRange.label.text = "Max: " + maxValue.toFixed(2) + " A";
        maxRange.label.fill = am4core.color("#aaadb2");
        maxRange.label.inside = true;
        maxRange.label.verticalCenter = "top";
        maxRange.label.fontSize = 14;
        maxRange.label.fontWeight = "bold";
        maxRange.label.valign = "top";
      }
      // Create and configure the min value range
      if (minValue !== Infinity) {
        var minRange = valueAxis.axisRanges.create();
        minRange.value = minValue;
        minRange.grid.stroke = am4core.color("#f68d00"); // Blue color for min value
        minRange.grid.strokeWidth = 2;
        minRange.grid.strokeOpacity = 0.8;
        minRange.label.text = "Min: " + minValue.toFixed(2) + " A";
        minRange.label.fill = am4core.color("#aaadb2");
        minRange.label.inside = true;
        minRange.label.verticalCenter = "bottom";
        minRange.label.fontSize = 14;
        minRange.label.fontWeight = "bold";
        minRange.label.valign = "bottom";
      }

      // // Create a range to fill above the threshold
      // var range = valueAxis.axisRanges.create();
      // range.value = 1400; // This is your threshold value
      // range.endValue = threshold; // This should be higher than the highest expected value, adjust as necessary
      // range.axisFill.fill = am4core.color("#fce1d0"); // Green color
      // range.axisFill.fillOpacity = 0.7; // Adjust opacity as needed

      // Create a range to fill above the threshold
      var range1 = valueAxis.axisRanges.create();
      range1.value = 0; // This is your threshold value
      range1.endValue = maxValue; // This should be higher than the highest expected value, adjust as necessary
      range1.axisFill.fill = am4core.color("#dfecf5"); // Green color
      range1.axisFill.fillOpacity = 0.7; // Adjust opacity as needed

      // Extend the maximum of the value axis to include the threshold
      valueAxis.max = Math.max(maxValue, threshold);

      // Create a range for the threshold
      var thresholdLine = valueAxis.axisRanges.create();
      thresholdLine.value = threshold;
      thresholdLine.grid.stroke = am4core.color("#FF0000");
      thresholdLine.grid.strokeWidth = 3;
      thresholdLine.grid.strokeOpacity = 1;
      // thresholdLine.label.text = threshold.toFixed(2);
      thresholdLine.label.inside = true;
      thresholdLine.label.fill = am4core.color("#FF0000");
      thresholdLine.label.fontSize = 12;
      thresholdLine.label.fontWeight = "bold";
    }
  };

  const renderChart4 = (data) => {
    am4core.useTheme(am4themes_animated);

    // Dispose of existing chart instance
    // const chartContainer = am4core.registry.baseSprites;
    // // if (chartContainer.length > 0) {
    //   chartContainer.forEach((chart) => chart.dispose());
    // }

    // Create chart
    const chart = am4core.create("chartdiv4", am4charts.XYChart);
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
    // Create primary value axis
    // Create primary value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.5;
    valueAxis.renderer.grid.template.stroke = am4core.color("#D0D0D0");
    valueAxis.renderer.minGridDistance = 30;
    // Adjust the appearance of labels
    valueAxis.renderer.labels.template.fill = am4core.color("#666666"); // Dark grey color for text
    valueAxis.renderer.labels.template.fontSize = 12; // Font size for the labels
    valueAxis.renderer.labels.template.fontWeight = "bold"; // Make labels bold
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.length = 8; // Length of ticks, adjust as needed
    valueAxis.title.text = "VAR";
    valueAxis.title.fill = am4core.color("#666666");
    // Secondary Value Axis for Intervals
    // Create secondary value axis
    var intervalAxis = chart.yAxes.push(new am4charts.ValueAxis());
    intervalAxis.renderer.opposite = true; // Position on the opposite side
    intervalAxis.renderer.labels.template.fill = am4core.color("#666");
    intervalAxis.renderer.ticks.template.disabled = false;
    intervalAxis.renderer.ticks.template.strokeOpacity = 0.5;
    intervalAxis.renderer.ticks.template.length = 8; // Length of ticks, adjust as needed
    intervalAxis.title.text = "PF";
    intervalAxis.renderer.labels.template.fontSize = 12;
    intervalAxis.title.fill = am4core.color("#666666");
    // Create series primary
    // Create series primary
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Reactive Power"; // Name for the legend
    // series.tooltipText = "{name}: [b]{valueY}[/]";
    series.tooltipText = "Reactive Power: [bold]{valueY} kVAr[/]";

    // series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#b70bec"); // Set series color to a specific blue
    series.strokeWidth = 3; // Set the stroke width
    // Drop-shaped tooltips
    series.tooltip.background.fill = am4core.color("#b70bec"); // Change color here
    series.tooltip.getFillFromObject = false;
    series.tooltip.autoBackground = true;
    series.tooltip.background.cornerRadius = 5;
    series.tooltip.background.strokeWidth = 2;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 150;
    series.tooltip.label.minHeight = 20;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    series.tooltip.autoTextColor = false;
    series.showOnInit = true;

    // Line series for intervals secondary
    var intervalSeries = chart.series.push(new am4charts.LineSeries());
    intervalSeries.dataFields.valueY = "powerFactor"; // Make sure to set this to the field that contains interval data
    intervalSeries.dataFields.dateX = "date";
    intervalSeries.yAxis = intervalAxis; // Link to the secondary value axis
    intervalSeries.name = "Power Factor";
    intervalSeries.strokeWidth = 3; // Set the stroke width for the line
    intervalSeries.stroke = am4core.color("#f68d00"); // Color for the interval line

    // Configuring the tooltip for interval line
    intervalSeries.tooltipText = "Power Factor: [bold]{valueY} %[/]";
    intervalSeries.tooltip.background.fill = am4core.color("#f68d00");
    intervalSeries.tooltip.getFillFromObject = false;
    intervalSeries.tooltip.autoBackground = true;
    intervalSeries.tooltip.background.cornerRadius = 5;
    intervalSeries.tooltip.background.strokeWidth = 2;
    intervalSeries.tooltip.pointerOrientation = "vertical";
    intervalSeries.tooltip.label.minWidth = 150;
    intervalSeries.tooltip.label.minHeight = 20;
    intervalSeries.tooltip.label.textAlign = "middle";
    intervalSeries.tooltip.label.textValign = "middle";

    // Additional optional styling
    intervalSeries.minBulletDistance = 15;
    intervalSeries.tensionX = 0.8;

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
  };

  const renderChart5 = (data) => {
    am4core.useTheme(am4themes_animated);

    // Dispose of existing chart instance
    // const chartContainer = am4core.registry.baseSprites;
    // // if (chartContainer.length > 0) {
    //   chartContainer.forEach((chart) => chart.dispose());
    // }

    // Create chart
    const chart = am4core.create("chartdiv5", am4charts.XYChart);
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
    // Create primary value axis
    // Create primary value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0.5;
    valueAxis.renderer.grid.template.stroke = am4core.color("#D0D0D0");
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
    valueAxis.title.fill = am4core.color("#666666");
    valueAxis.title.text = "THD V";
    // Secondary Value Axis for Intervals
    // Create secondary value axis
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "THD Voltage"; // Name for the legend
    series.tooltipText = "THD Voltage: [b]{valueY}[/] %";

    // series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#139346"); // Set series color to a specific blue
    series.strokeWidth = 3; // Set the stroke width
    // Drop-shaped tooltips
    series.tooltip.background.stroke = am4core.color("#FFF"); // Optionally change the border color
    series.tooltip.background.fill = am4core.color("#139346"); // Change color here
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
    function calculateMinMax() {
      // // Create a range to fill above the threshold
      // var range = valueAxis.axisRanges.create();
      // range.value = 5; // This is your threshold value
      // range.endValue = 0; // This should be higher than the highest expected value, adjust as necessary
      // range.axisFill.fill = am4core.color("#e3f2dd"); // Green color
      // range.axisFill.fillOpacity = 0.7; // Adjust opacity as needed

      // Adding a red line at the threshold
      var thresholdLine = valueAxis.axisRanges.create();
      thresholdLine.value = 5;
      thresholdLine.grid.stroke = am4core.color("#FF0000"); // Red line
      thresholdLine.grid.strokeWidth = 3;
      thresholdLine.grid.strokeOpacity = 1;
  }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
          <Preloader />
        </div>
      )}
     <div className={`space-y-6 h-[85vh] ${isLoading ? "hidden" : ""}`}>
      <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden relative flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold text-gray-500">
            1 - PLANT - ENERGY USAGE
          </h2>

          {/* Controls and Date Range */}
          <div className="flex items-center gap-3">
            <DateRangePicker range={range} setRange={setRange} />

            <button className="p-1 rounded hover:bg-gray-200" title="Maximize">
              <FontAwesomeIcon icon={faMaximize} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-grow">
          <div className="flex-grow p-4">
              <div
                id="chartdiv"
                className="w-full h-[350px] border rounded bg-gray-50"
              ></div>
          </div>
        </div>
      </div>
      {/* Second Section */}
      <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden flex flex-col ">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold text-gray-500">
            2 - PLANT - ACTIVE DEMAND HISTORICAL
          </h2>
          <div className="flex items-center gap-3">
            <DateRangePicker range={range1} setRange={setRange1} />
            <button className="p-1 rounded hover:bg-gray-200" title="Maximize">
              <FontAwesomeIcon icon={faMaximize} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex-grow p-4">
          <div
            id="chartdiv1"
            className="w-full h-[350px] border rounded bg-gray-50"
          ></div>
        </div>
      </div>
      {/* 3rd Section */}
      <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden flex flex-col ">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold text-gray-500">
            3- Plant Main Voltage
          </h2>
          <div className="flex items-center gap-3">
            <DateRangePicker range={range2} setRange={setRange2} />
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
      {/* 4th Section */}
      <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden flex flex-col ">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold text-gray-500">
            4- Plant Main Current
          </h2>
          <div className="flex items-center gap-3">
            <DateRangePicker range={range3} setRange={setRange3} />
            <button className="p-1 rounded hover:bg-gray-200" title="Maximize">
              <FontAwesomeIcon icon={faMaximize} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex-grow p-4">
          <div
            id="chartdiv3"
            className="w-full h-[350px] border rounded bg-gray-50"
          ></div>
        </div>
      </div>
      {/* 5th Section */}
      <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden flex flex-col ">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold text-gray-500">
            5- Plant - Reactive Power and PF
          </h2>
          <div className="flex items-center gap-3">
            <DateRangePicker range={range4} setRange={setRange4} />
            <button className="p-1 rounded hover:bg-gray-200" title="Maximize">
              <FontAwesomeIcon icon={faMaximize} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex-grow p-4">
          <div
            id="chartdiv4"
            className="w-full h-[350px] border rounded bg-gray-50"
          ></div>
        </div>
      </div>
      {/* 6th Section */}
      <div className="border-t-[5px] border-[#1f5897] p-4 rounded-[7px] shadow-md bg-white overflow-hidden flex flex-col ">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold text-gray-500">
            6- Plant - Voltage Harmonic Reduction
          </h2>
          <div className="flex items-center gap-3">
            <DateRangePicker range={range5} setRange={setRange5} />
            <button className="p-1 rounded hover:bg-gray-200" title="Maximize">
              <FontAwesomeIcon icon={faMaximize} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex-grow p-4">
          <div
            id="chartdiv5"
            className="w-full h-[350px] border rounded bg-gray-50"
          ></div>
        </div>
      </div>
    </div>
    </>
  );
}
