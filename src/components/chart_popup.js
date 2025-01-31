"use client";
import React from 'react';

function ChartPopup({ closePopup, openOptionsPopup }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[60%] max-w-[700px] relative">
        <h2 className="text-center text-gray-700 font-semibold mb-4 text-[22px]">Select Any Chart</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Pie Chart", img: "pie.jpg", type: "pie" },
            { label: "Bar Chart", img: "bar.jpg", type: "bar" },
            { label: "Period Over Period Bar Chart", img: "period.jpg", type: "groupedBar" },
            { label: "Comparison Trends Line Chart", img: "line.jpg", type: "line" },
          ].map((chart) => (
            <div key={chart.type} className="relative flex justify-center items-center">
              <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 text-black font-bold bg-black bg-opacity-10 rounded-lg px-2 py-1">
                {chart.label}
              </div>
              <img
                src={chart.img}
                alt={chart.label}
                className="h-[200px] cursor-pointer"
                onClick={() => openOptionsPopup(chart.type)}
              />
            </div>
          ))}
        </div>
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

export default ChartPopup;
