"use client";
import React, { useState } from 'react';

function ChartOptionsPopup({ closePopup, applyChartConfig, chartType }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#4CAF50');
  const [selectedMeter, setSelectedMeter] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [periodOption, setPeriodOption] = useState('');
  const [showMeters, setShowMeters] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  const meterCategories = {
    "Compressed Air": ['GWP', 'Airjet', 'Mainline', 'Sewing2', 'Textile', 'Sewing1', 'PG'],
    "Electricity": ['Ozen 350', 'Atlas Copco', 'Compressor Aux', 'Ganzair Compressor', 'New Centac Comp#2', 'ML-132', 'Kaeser Compressor', 'Dryer'],
    "Solars": ['Solar 1', 'Solar 2']
  };

  let parameters;
  const periodOptions = ['Today over Yesterday', 'This Week over Last Week', 'This Month over Last Month'];

  let meterMapping;
  let parameterMapping;
  meterMapping = {
    "GWP": "F1_GWP",
    "Airjet": "F2_Airjet",
    "Mainline": "F3_MainLine",
    "Sewing2": "F4_Sewing2",
    "Textile": "F5_Textile",
    "Sewing1": "F6_Sewing1",
    "PG": "F7_PG",
    "Ozen 350": "U_3_EM3",
    "Atlas Copco": "U_4_EM4",
    "Compressor Aux": "U_5_EM5",
    "Ganzair Compressor": "U_6_EM6",
    "New Centac Comp#2": "U_7_EM7",
    "ML-132": "U_8_EM8",
    "Kaeser Compressor": "U_10_EM10",
    "Dryer": "U_15",
    "Solar 1": "U11_SM11",
    "Solar 2": "U12_SM12",
  };

  // Determine the parameters and parameterMapping dynamically based on selected meters
  const flowRateMeters = ["GWP", "Airjet", "Mainline", "Sewing2", "Textile", "Sewing1", "PG"];

  const isFlowRate = selectedMeter.some((meter) => flowRateMeters.includes(meter));

  if (chartType === "pie" || chartType === "bar" || chartType === "groupedBar") {
    if (isFlowRate) {
      parameters = ['Flow Rate', 'Total Flow Rate'];
      parameterMapping = {
        "Flow Rate": "Flowrate",
        "Total Flow Rate": "TotalFlow",
      };
    } else {
      parameters = ['Active Energy'];
      parameterMapping = {
        "Active Energy": "TotalActiveEnergy_kWh",
      };
    }
  } else {
    if (selectedMeter.includes("Dryer")) {
      parameters =   ["Active Energy", "Active Power A", "Active Power B", "Active Power C", "Active Power Total", "Current A", "Current B", "Current C", "Current Total", "Frequency", "Power Factor Total", "Reactive Power A", "Reactive Power B", "Reactive Power C", "Reactive Power Total", "Voltage A", "Voltage B", "Voltage C", "Voltage LN", "Voltage AB", "Voltage BC", "Voltage CA", "Voltage LL"];
      parameterMapping = {
        "Active Energy": "ActiveEnergy_Delivered_kWh",
        "Active Power A": "ActivePower_A_kW",
        "Active Power B": "ActivePower_B_kW",
        "Active Power C": "ActivePower_C_kW",
        "Active Power Total": "ActivePower_Total_kW",
        "Current A": "Current_AN_Amp",
        "Current B": "Current_BN_Amp",
        "Current C": "Current_CN_Amp",
        "Current Total": "Current_Total_Amp",
        "Frequency": "Frequency_Hz",
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
      };
    } else if (selectedMeter.includes("New Centac Comp#2")) {
      parameters = ["Active Energy", "Active Power A", "Active Power B", "Active Power C", "Active Power Total", "Current A", "Current B", "Current C", "Current Total", "Frequency", "Power Factor A", "Power Factor B", "Power Factor C", "Power Factor Total", "Reactive Power A", "Reactive Power B", "Reactive Power Total", "Voltage A", "Voltage B", "Voltage C", "Voltage LN", "Voltage AB", "Voltage BC", "Voltage CA", "Voltage LL"];
      parameterMapping = {
        "Active Energy": "ActiveEnergyDelivered_Wh",
        "Active Power A": "ActivePowerA_kW",
        "Active Power B": "ActivePowerB_kW",
        "Active Power C": "ActivePowerC_kW",
        "Active Power Total": "ActivePowerTotal_kW",
        "Current A": "CurrentA_A",
        "Current B": "CurrentB_A",
        "Current C": "CurrentC_A",
        "Current Total": "CurrentAvg_A",
        "Frequency": "Frequency_Hz",
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
      };
    } else if (isFlowRate) {
      parameters = ['Flow Rate', 'Total Flow Rate'];
      parameterMapping = {
        "Flow Rate": "Flowrate",
        "Total Flow Rate": "TotalFlow",
      };
    } else {
      parameters = ["Active Energy", "Active Power A", "Active Power B", "Active Power C", "Active Power Total", "Current A", "Current B", "Current C", "Current Total", "Frequency", "Power Factor A", "Power Factor B", "Power Factor C", "Power Factor Total", "Reactive Power A", "Reactive Power B", "Reactive Power Total", "Voltage A", "Voltage B", "Voltage C", "Voltage LN", "Voltage AB", "Voltage BC", "Voltage CA", "Voltage LL"];
      parameterMapping = {
        "Active Energy": "TotalActiveEnergy_kWh",
        "Active Power A": "Activepower_PH1_W",
        "Active Power B": "Activepower_PH2_W",
        "Active Power C": "Activepower_PH3_W",
        "Active Power Total": "Activepower_Total_W",
        "Current A": "CurrentPh1_A",
        "Current B": "CurrentPh2_A",
        "Current C": "CurrentPh3_A",
        "Current Total": "CurrentAvg_A",
        "Frequency": "Freq_Hz",
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
    }
  }
  // const handleMeterChange = (e) => {
  //   const meter = e.target.value;
  //   setSelectedMeter(prev =>
  //     prev.includes(meter) ? prev.filter(m => m !== meter) : [...prev, meter]
  //   );
  // };

  const handleMeterChange = (e) => {
    const meter = e.target.value;

    // Determine the category of the selected meter
    let selectedCategory = null;
    for (const [category, meters] of Object.entries(meterCategories)) {
      if (meters.includes(meter)) {
        selectedCategory = category;
        break;
      }
    }

    // Clear meters from other categories and add/remove the selected meter
    setSelectedMeter((prev) => {
      // If the meter is already selected, remove it
      if (prev.includes(meter)) {
        return prev.filter((m) => m !== meter);
      }

      // Otherwise, clear all other categories and add the selected meter
      return [
        ...prev.filter((m) => {
          // Retain meters from the same category
          return meterCategories[selectedCategory].includes(m);
        }),
        meter,
      ];
    });
  };

  const handleParameterChange = (e) => {
    setSelectedParameter(e.target.value);
  };

  const applyChart = () => {
    const chartConfig = {
      title,
      color,
      chartType,
      selectedMeter: selectedMeter.map(meter => meterMapping[meter]),
      selectedParameter: parameterMapping[selectedParameter],
      startDate,
      endDate,
      periodOption,
    };

    applyChartConfig(chartConfig);
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-w-lg relative">
        <h2 className="text-center text-gray-700 font-semibold mb-4">Select Options for Chart</h2>

        {/* Title and color picker */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Title..."
            className="border border-gray-300 rounded p-2 w-full mb-2 text-black"
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-1 rounded"
          />
        </div>

        {/* Meters and Parameters dropdowns side by side */}
        <div className="flex justify-between gap-4 mb-4">
          {/* Meters Dropdown */}
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Meters</h3>
            <div
              className="border border-gray-300 rounded p-2 w-full text-black relative"
              onMouseEnter={() => setShowMeters(true)}
              onMouseLeave={() => setShowMeters(false)}
            >
              <button className="w-full text-left flex items-center justify-between">
                {selectedMeter.length > 0 ? selectedMeter.join(', ') : 'Select Meters'}
                <span className='text-[13px]'>{showMeters ? '△' : '▽'}</span>
              </button>
              {showMeters && (
                <div className="absolute top-full left-0 w-full bg-white border mt-0 z-10 h-[300px] overflow-auto">
                  {Object.entries(meterCategories).map(([category, meters]) => (
                    <div key={category} className="mb-2">
                      <h4 className="text-gray-500 font-semibold text-sm px-2">{category}</h4>
                      {meters.map((meter) => (
                        <label key={meter} className="block p-2 hover:bg-gray-100">
                          <input
                            type={`${chartType === "groupedBar" ? "radio" : "checkbox"}`}
                            value={meter}
                            checked={selectedMeter.includes(meter)}
                            onChange={(e) => {
                              if (chartType === "groupedBar") {
                                // Only allow one meter to be selected for groupedBar charts
                                setSelectedMeter([meter]);
                              } else {
                                // Toggle selection for checkboxes
                                handleMeterChange(e);
                              }
                            }}
                          />
                          {meter}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Parameters Dropdown */}
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Parameters</h3>
            <div
              className="border border-gray-300 rounded p-2 w-full text-black relative"
              onMouseEnter={() => setShowParameters(true)}
              onMouseLeave={() => setShowParameters(false)}
            >
              <button className="w-full text-left flex items-center justify-between">
                {selectedParameter || 'Select Parameter'}
                <span className='text-[13px]'>{showParameters ? '△' : '▽'}</span>
              </button>
              {showParameters && (
                <div className="absolute top-full left-0 w-full bg-white border mt-0 z-10  max-h-[300px] overflow-auto">
                  {parameters.map((param) => (
                    <label key={param} className="block p-2 hover:bg-gray-100">
                      <input
                        type="radio"
                        name="parameter"
                        value={param}
                        checked={selectedParameter === param}
                        onChange={handleParameterChange}
                      />
                      {param}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Show period options for groupedBar chart only */}
        {chartType === "groupedBar" ? (
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Period Comparison</h3>
            <select
              className="border border-gray-300 rounded p-2 w-full text-black"
              onChange={(e) => setPeriodOption(e.target.value)}
              value={periodOption}
            >
              <option value="">Select a Period</option>
              {periodOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ) : (
          // Start and End Date Pickers for other charts
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
              <h3 className="text-gray-600 font-semibold text-sm mb-2">Start Date</h3>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-gray-600 font-semibold text-sm mb-2">End Date</h3>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
          </div>
        )}

        <button
          onClick={applyChart}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-2 hover:bg-blue-600"
        >
          OK
        </button>
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ChartOptionsPopup;
