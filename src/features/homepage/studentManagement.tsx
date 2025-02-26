import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const teachers = [
  { id: 1, name: "Alice Johnson", subject: "Math", class: "6A" },
  { id: 2, name: "Bob Smith", subject: "Science", class: "6B" },
];

const students = [
  { id: 1, name: "Charlie Brown", class: "6A", section: "A", password: "password1", school: "ABC School" },
  { id: 2, name: "Daisy Adams", class: "6B", section: "B", password: "password2", school: "ABC School" },
];

const classes = [
  { id: 1, name: "6A", school: "ABC School", size: 30 },
  { id: 2, name: "6B", school: "ABC School", size: 28 },
];

export default function StudentsManagement() {
  const [studentsData, setStudentsData] = useState(students);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    password: "",
    school: "",
  });

  const handleEdit = (student) => {
    setIsEditing(true);
    setEditStudent({ ...student });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setNewStudent({
      name: "",
      class: "",
      section: "",
      password: "",
      school: "",
    });
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditStudent(null);
  };

  const handleSave = () => {
    if (isCreating) {
      setStudentsData([...studentsData, { ...newStudent, id: studentsData.length + 1 }]);
      handleClose();
    } else {
      setStudentsData(
        studentsData.map((student) =>
          student.id === editStudent.id ? editStudent : student
        )
      );
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isCreating) {
      setNewStudent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setEditStudent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Students</h2>
      <Button
        onClick={handleCreate}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Student
      </Button>
      </div>

      {/* Table to Display Students */}
      <table className="mt-4 w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Section</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">School</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.section}</td>
              <td className="border p-2">{student.password}</td>
              <td className="border p-2">{student.school}</td>
              <td className="border p-2 mx-auto text-center">
                <Button
                  onClick={() => handleEdit(student)}
                  // className="p-2 bg-green-500 text-white rounded"
                  variant='secondary'
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create/Edit Form Modal */}
      {(isEditing || isCreating) && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {isCreating ? "Create Student" : "Edit Student"}
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
                  value={isCreating ? newStudent.name : editStudent.name}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block">Class:</label>
                <input
                  type="text"
                  name="class"
                  value={isCreating ? newStudent.class : editStudent.class}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block">Section:</label>
                <input
                  type="text"
                  name="section"
                  value={isCreating ? newStudent.section : editStudent.section}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={isCreating ? newStudent.password : editStudent.password}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block">School:</label>
                <input
                  type="text"
                  name="school"
                  value={isCreating ? newStudent.school : editStudent.school}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <button
                onClick={handleSave}
                className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
              >
                {isCreating ? "Create Student" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
