import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const teachers = [
  { id: 1, name: "Alice Johnson", school: "Delhi Public School Bengaluru Sout", assignedSubjects: [{ subject: "Math", class: "6A" }, { subject: "Science", class: "6B" }], assignedClasses: [{ class: "6A", day: "Monday", time: "9:00 AM - 10:00 AM" }, { class: "6B", day: "Tuesday", time: "10:00 AM - 11:00 AM" }] },
  { id: 2, name: "Bob Smith", school: "Delhi Public School Bengaluru Sout", assignedSubjects: [{ subject: "Science", class: "6A" }], assignedClasses: [{ class: "6A", day: "Monday", time: "9:00 AM - 10:00 AM" }] },
];

export default function TeachersManagement() {
  const [teachersData, setTeachersData] = useState(teachers);
  const [isEditing, setIsEditing] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);

  const handleEdit = (teacher) => {
    setIsEditing(true);
    setEditTeacher({ ...teacher });
  };

  const handleClose = () => {
    setIsEditing(false);
    setEditTeacher(null);
  };

  const handleSave = () => {
    setTeachersData(
      teachersData.map((teacher) =>
        teacher.id === editTeacher.id ? editTeacher : teacher
      )
    );
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeAssignedSubject = (e, index) => {
    const { name, value } = e.target;
    const updatedAssignedSubjects = [...editTeacher.assignedSubjects];
    updatedAssignedSubjects[index][name] = value;
    setEditTeacher((prevState) => ({
      ...prevState,
      assignedSubjects: updatedAssignedSubjects,
    }));
  };

  const handleAddAssignedSubject = () => {
    setEditTeacher((prevState) => ({
      ...prevState,
      assignedSubjects: [
        ...prevState.assignedSubjects,
        { subject: "", class: "" },
      ],
    }));
  };

  const handleChangeAssignedClass = (e, index) => {
    const { name, value } = e.target;
    const updatedAssignedClasses = [...editTeacher.assignedClasses];
    updatedAssignedClasses[index][name] = value;
    setEditTeacher((prevState) => ({
      ...prevState,
      assignedClasses: updatedAssignedClasses,
    }));
  };

  const handleAddAssignedClass = () => {
    setEditTeacher((prevState) => ({
      ...prevState,
      assignedClasses: [
        ...prevState.assignedClasses,
        { class: "", day: "", time: "" },
      ],
    }));
  };

  const handleAddTeacher = () => {
    const newTeacher = {
      id: teachersData.length + 1,
      name: "",
      school: "",
      assignedSubjects: [],
      assignedClasses: [],
    };
    setIsEditing(true);
    setEditTeacher(newTeacher);
  };

  return (
    <div className="p-4 bg-white  rounded">
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Teachers</h2>
      <Button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleAddTeacher}
      >
        Add Teacher
      </Button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">School</th>
              <th className="border p-2">Assigned Subjects</th>
              <th className="border p-2">Assigned Classes (Timetable)</th>
              <th className="border p-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachersData.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border p-2">{teacher.name}</td>
                <td className="border p-2">{teacher.school}</td>
                <td className="border p-2">
                  {teacher.assignedSubjects.map((assignedSubject, index) => (
                    <p key={index}>
                      {assignedSubject.subject} - {assignedSubject.class}
                    </p>
                  ))}
                </td>
                <td className="border p-2">
                  {teacher.assignedClasses.map((assignedClass, index) => (
                    <p key={index}>
                      {assignedClass.class} - {assignedClass.day} - {assignedClass.time}
                    </p>
                  ))}
                </td>
                <td className="border p-2 text-center">
                  <Button
                    onClick={() => handleEdit(teacher)}
                    // className="mt-2 p-2 "
                    variant='secondary'
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-screen-sm max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editTeacher.id ? "Edit Teacher" : "Create Teacher"}
              </h3>
              <button
                onClick={handleClose}
                // className="p-2 bg-red-500 text-white rounded-full"
              >
                <X />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editTeacher.name}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block">School:</label>
                <input
                  type="text"
                  name="school"
                  value={editTeacher.school}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block">Assigned Subjects:</label>
                {editTeacher.assignedSubjects.map((assignedSubject, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      name="subject"
                      value={assignedSubject.subject}
                      onChange={(e) => handleChangeAssignedSubject(e, index)}
                      className="p-2 border rounded w-full"
                      placeholder="Subject"
                    />
                    <input
                      type="text"
                      name="class"
                      value={assignedSubject.class}
                      onChange={(e) => handleChangeAssignedSubject(e, index)}
                      className="p-2 border rounded w-full"
                      placeholder="Class"
                    />
                  </div>
                ))}
                <Button
                  onClick={handleAddAssignedSubject}
                  variant={'outline'}
                  // className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Add Assigned Subject
                </Button>
              </div>
              <div>
                <label className="block">Assigned Classes (Timetable):</label>
                {editTeacher.assignedClasses.map((assignedClass, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      name="class"
                      value={assignedClass.class}
                      onChange={(e) => handleChangeAssignedClass(e, index)}
                      className="p-2 border rounded w-full"
                      placeholder="Class"
                    />
                    <input
                      type="text"
                      name="day"
                      value={assignedClass.day}
                      onChange={(e) => handleChangeAssignedClass(e, index)}
                      className="p-2 border rounded w-full"
                      placeholder="Day"
                    />
                    <input
                      type="text"
                      name="time"
                      value={assignedClass.time}
                      onChange={(e) => handleChangeAssignedClass(e, index)}
                      className="p-2 border rounded w-full"
                      placeholder="Time"
                    />
                  </div>
                ))}
                <Button
                  onClick={handleAddAssignedClass}
                  // className="mt-2 p-2 bg-blue-500 text-white rounded"
                  variant={'outline'}

                >
                  Add Assigned Class
                </Button>
              </div>
              <button
                onClick={handleSave}
                className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
