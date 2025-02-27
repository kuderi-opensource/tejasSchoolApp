import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { AiFillSchedule } from "react-icons/ai";
import { BsCollectionFill } from "react-icons/bs";
import ClassesManagement from "./classeManagement";
import { FaBookOpen } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import StudentsManagement from "./studentManagement";
import TeachersManagement from "./teacherManagement";
import TimetableManagement from "./timeTableManagement";

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
      <aside className="lg:w-52 w-full bg-sidebar  p-4 px-0 space-y-4">
        <SidebarItem icon={<MdSpaceDashboard className={activeTab === "dashboard" ?'text-primary': ''} />} label="Dashboard" onClick={() => setActiveTab("dashboard")} active={activeTab === "dashboard"} />
        <SidebarItem icon={<FaBookOpen className={activeTab === "classes" ?'text-primary': ''} />} label="Classes" onClick={() => setActiveTab("classes")} active={activeTab === "classes"} />
        <SidebarItem   icon={<GiTeacher className={activeTab === "teachers" ?'text-primary': ''} />} label="Teachers" onClick={() => setActiveTab("teachers")} active={activeTab === "teachers"} />
        <SidebarItem icon={<PiStudentFill className={activeTab === "students" ?'text-primary': ''} />} label="Students" onClick={() => setActiveTab("students")} active={activeTab === "students"} />
        <SidebarItem icon={<AiFillSchedule className={activeTab === "timetable" ?'text-primary': ''} />} label="Timetable" onClick={() => setActiveTab("timetable")} active={activeTab === "timetable"} />
        <SidebarItem icon={<BsCollectionFill className={activeTab === "questionBank" ?'text-primary': ''} />} label="Question Bank" onClick={() => setActiveTab("questionBank")} active={activeTab === "questionBank"} />
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

function SidebarItem({ label, onClick, active, icon }) {
  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded cursor-pointer  ${active ? " bg-muted" : "hover:bg-sidebar-accent text-sidebar-primary"}`}
      onClick={onClick}
    >
      {icon}
      <span className={active? 'text-primary': ''}>{label}</span>
    </div>
  );
}

function DashboardOverview() {
  // School Name:
  const schoolName = "Delhi Public School Bengaluru South";
  return (
    <div className="p-4 rounded">
      <h2 className="text-xl font-semibold mb-6">{schoolName}</h2>
      {/* <p>Total Classes: 11 | Teachers: 7 | Students: 85</p> */}
      <div className="flex gap-4 flex-wrap">
      <Card className="w-1/4 py-8">
      <CardHeader className="pt-0">
        <CardContent className="text-center">Total Classes</CardContent>
      </CardHeader>
        <CardTitle className="text-center">
          11
        </CardTitle>
      </Card>
      <Card className="w-1/4 py-8">
      <CardHeader className="pt-0">
        <CardContent className="text-center">Teachers</CardContent>
      </CardHeader>
        <CardTitle className="text-center">
          7
        </CardTitle>
      </Card>
      <Card className="w-1/4 py-8">
      <CardHeader className="pt-0">
        <CardContent className="text-center">Students</CardContent>
      </CardHeader>
        <CardTitle className="text-center">
          30
        </CardTitle>
      </Card>
      </div>
    </div>
  );
}

function QuestionBankManagement() {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Question Bank</h2>
      <p>Manage question banks here.</p>
    </div>
  );
}
