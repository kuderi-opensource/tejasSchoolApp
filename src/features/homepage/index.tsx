import { useState, useEffect } from "react";
import StudentsManagement from "./studentManagement";
import TeachersManagement from "./teacherManagement";
import TimetableManagement from "./timeTableManagement";
import ClassesManagement from "./classeManagement";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDay, setSelectedDay] = useState("All Days"); // Day selection


  // Set default selectedDate to current date in yyyy-mm-dd format
  const [selectedDate, setSelectedDate] = useState("");

  // Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  // Set the initial date to today's date on component mount
  useEffect(() => {
    const todayDate = getTodayDate();
    setSelectedDate(todayDate); // Ensure it's set in the correct format
  }, []);

  // This useEffect is used to set the selectedDay when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const currentDay = new Date(selectedDate).toLocaleString("en-us", { weekday: "long" });
      setSelectedDay(currentDay);
    }
  }, [selectedDate]); // Update the day whenever the date changes

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 w-full bg-gray-800 text-white p-4 space-y-4">
        <SidebarItem label="Dashboard" onClick={() => setActiveTab("dashboard")} active={activeTab === "dashboard"} />
        <SidebarItem label="Classes" onClick={() => setActiveTab("classes")} active={activeTab === "classes"} />
        <SidebarItem label="Teachers" onClick={() => setActiveTab("teachers")} active={activeTab === "teachers"} />
        <SidebarItem label="Students" onClick={() => setActiveTab("students")} active={activeTab === "students"} />
        <SidebarItem label="Timetable" onClick={() => setActiveTab("timetable")} active={activeTab === "timetable"} />
        <SidebarItem label="Question Bank" onClick={() => setActiveTab("questionBank")} active={activeTab === "questionBank"} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && <DashboardOverview />}
        {activeTab === "classes" && <ClassesManagement />}
        {activeTab === "teachers" && <TeachersManagement />}
        {activeTab === "students" && <StudentsManagement />}
        {activeTab === "timetable" && 
        <TimetableManagement
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate} // Passing setSelectedDate as a prop
        /> }
        {activeTab === "questionBank" && <QuestionBankManagement />}
      </div>
    </div>
  );
}

function SidebarItem({ label, onClick, active }) {
  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${active ? "bg-gray-700" : "hover:bg-gray-600"}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <p>Total Classes: 11 | Teachers: 7 | Students: 85</p>
    </div>
  );
}

function QuestionBankManagement() {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Question Bank</h2>
      <p>Manage question banks here.</p>
    </div>
  );
}
