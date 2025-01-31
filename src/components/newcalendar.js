"use client";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";

const DateRangePicker1 = ({ range, setRange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedRange) => {
    setRange(selectedRange);

    // Close the popover if both `from` and `to` are selected
    if (selectedRange.from && selectedRange.to) {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="p-2 border rounded-md bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-50" title="DatePicker">
          {/* <span>
            {range.from
              ? `${format(range.from, "MMM dd, yyyy")} → ${
                  range.to ? format(range.to, "MMM dd, yyyy") : "Select End Date"
                }`
              : "Pick Date Range"}
          </span> */}
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
          onSelect={handleSelect}
          numberOfMonths={1}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker1;
