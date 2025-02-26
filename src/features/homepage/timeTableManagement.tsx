import React from "react";

const TimetableManagement = ({
  selectedDay,
  setSelectedDay,
  selectedClass,
  setSelectedClass,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedDate,
  setSelectedDate
}) => {
  // Predefined dummy timetable data (same data for all dates)
  const timetable = {
    "6A": [
      { day: "Monday", subject: "Math", teacher: "Alice Johnson", time: "9:00 AM - 10:00 AM" },
      { day: "Tuesday", subject: "Science", teacher: "Bob Smith", time: "10:00 AM - 11:00 AM" },
      { day: "Monday", subject: "English", teacher: "Alice Johnson", time: "11:15 AM - 12:15 PM" },
    ],
    "6B": [
      { day: "Monday", subject: "Science", teacher: "Bob Smith", time: "9:00 AM - 10:00 AM" },
      { day: "Tuesday", subject: "Math", teacher: "Alice Johnson", time: "10:00 AM - 11:00 AM" },
      { day: "Monday", subject: "English", teacher: "Bob Smith", time: "11:15 AM - 12:15 PM" },
    ],
  };

  // Full list of time slots (including break and lunch)
  const allTimeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 11:15 AM (Break)",
    "11:15 AM - 12:15 PM",
    "12:15 PM - 1:15 PM",
    "1:15 PM - 2:15 PM (Lunch)",
    "2:15 PM - 3:15 PM",
    "3:15 PM - 4:15 PM",
  ];

  // Time slots for the dropdown filter, excluding Break and Lunch
  const timeSlotsForFilter = allTimeSlots.filter(
    (slot) => !slot.includes("(Break)") && !slot.includes("(Lunch)")
  );

  // Handle filtering the timetable based on selected day, class, and time slot
  const filteredTimetable = Object.entries(timetable)
    .filter(([className]) => {
      if (selectedClass && selectedClass !== className) return false;
      return true;
    })
    .map(([className, entries]) => ({
      className,
      entries: entries.filter((entry) => {
        if (selectedDay && entry.day !== selectedDay) return false;
        return true;
      }),
    }));

  return (
    <div className="p-6 bg-white rounded w-full">
      <h2 className="text-xl font-semibold">Timetable</h2>
      <div className="mt-4 flex space-x-4">
        {/* Date Picker for selecting exact date */}
        <div>
          <label className="block mb-2">Select Date:</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              const selectedDayOfWeek = new Date(e.target.value).toLocaleString('en-us', { weekday: 'long' });
              setSelectedDay(selectedDayOfWeek); // Update the day selection based on date
            }}
          />
        </div>

        <div>
          <label className="block mb-2">Select Class:</label>
          <select
            className="p-2 border rounded"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {["6A", "6B"].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Select Time Period:</label>
          <select
            className="p-2 border rounded"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="">All Time Periods</option>
            {timeSlotsForFilter.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Render Logic */}
      {filteredTimetable.map(({ className, entries }) => (
        <div key={className} className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-semibold">{className} - {selectedDay}</h3>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {selectedTimeSlot
              ? entries
                  .filter((entry) => entry.time === selectedTimeSlot) // Only show selected time period
                  .map((entry) => (
                    <div key={entry.time} className="p-3 bg-white border rounded shadow text-center">
                      <p className="font-semibold">{entry.time}</p>
                      <p>{`${entry.subject} - ${entry.teacher}`}</p>
                    </div>
                  ))
              : allTimeSlots
                  .map((slot) => (
                    <div key={slot} className="p-3 bg-white border rounded shadow text-center">
                      <p className="font-semibold">{slot}</p>
                      <p>
                        {["11:00 AM - 11:15 AM (Break)", "1:15 PM - 2:15 PM (Lunch)"].includes(slot)
                            ? "" // Empty string to avoid displaying anything for break and lunch time
                            : entries.find((entry) => entry.time === slot)
                            ? `${entries.find((entry) => entry.time === slot).subject} - ${entries.find((entry) => entry.time === slot).teacher}`
                            : "Not Assigned"}
                        </p>
                    </div>
                  ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimetableManagement;
