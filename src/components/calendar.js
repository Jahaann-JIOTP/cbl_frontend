'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import default styling for the calendar
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon from react-icons

const MyCalendar = () => {
  const [date, setDate] = useState(new Date()); // Store the selected date
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle the calendar visibility

  const handleDateChange = (newDate) => {
    setDate(newDate); // Set the new selected date
    console.log(newDate); // You can log or use the selected date
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility on icon click
  };

  return (
    <div className="relative">
      {/* Title and Icon Section */}
      <div className="flex items-center justify-between" title="Today" style={{ height: '130px' }}>
        <div className="text-lg">Today</div>
        <div className="flex items-center space-x-2">
          {/* Calendar Icon */}
          <FaCalendarAlt
            className="cursor-pointer"
            size={24}
            onClick={toggleCalendar} // Toggle calendar visibility on icon click
          />
        </div>
      </div>

      {/* Conditional Rendering of the Calendar */}
      {showCalendar && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg">
          <Calendar onChange={handleDateChange} value={date} /> {/* Calendar display */}
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
