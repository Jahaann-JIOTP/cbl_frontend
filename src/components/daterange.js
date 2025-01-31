"use client";
import React from "react";
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";

const DateRangePicker = ({ range, setRange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 border rounded-md bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-50">
          <span>
            {range.from
              ? `${format(range.from, "MMM dd, yyyy")} → ${
                  range.to ? format(range.to, "MMM dd, yyyy") : "Select End Date"
                }`
              : "Pick Date Range"}
          </span>
          📅
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-white border rounded-md shadow-lg z-[50]"
      >
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
