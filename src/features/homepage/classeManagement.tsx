import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";

// Dummy data for schools
const schools = [
  { id: "1", name: "Delhi Public School Bengaluru South" },
  { id: "2", name: "Delhi Public School Bengaluru South" },
];

// Predefined classes for a specific school (Delhi Public School Bengaluru South)
const predefinedClasses = [
  { id: "1", name: "8", schoolId: "1", roomSize: 2 },
  { id: "2", name: "9", schoolId: "1", roomSize: 2 },
  { id: "2", name: "10", schoolId: "1", roomSize: 1 },
];

export default function ClassesManagement() {
  // Assume that the logged-in school ID is "1" (Delhi Public School Bengaluru South)
  const loggedInSchoolId = "1"; // Replace this with the actual logged-in school ID

  const [classes, setClasses] = useState(predefinedClasses.filter(cls => cls.schoolId === loggedInSchoolId));
  const [isEditing, setIsEditing] = useState(false);
  const [editClass, setEditClass] = useState(null);

  const [isCreating, setIsCreating] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    schoolId: loggedInSchoolId, // Pre-fill with logged-in school
    roomSize: 0, // Default room size
  });

  const handleCreate = () => {
    setIsCreating(true);
    setNewClass({
      name: "",
      schoolId: loggedInSchoolId, // Ensure this is always the logged-in school
      roomSize: 0, // Default value for room size
    });
  };

  const handleEdit = (cls) => {
    setIsEditing(true);
    setEditClass({ ...cls });
  };

  const handleSave = () => {
    // If creating a new class
    if (isCreating) {
      // Validate room size
      if (newClass.roomSize < 0 || newClass.roomSize > 5) {
        alert("Room size must be between 0 and 5.");
        return;
      }

      setClasses([...classes, { ...newClass, id: (classes.length + 1).toString() }]);
      setIsCreating(false);
    }
    // If editing an existing class
    else if (isEditing) {
      // Validate room size
      if (editClass.roomSize < 0 || editClass.roomSize > 5) {
        alert("Room size must be between 0 and 5.");
        return;
      }

      setClasses(classes.map(cls => cls.id === editClass.id ? editClass : cls));
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isCreating) {
      setNewClass((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (isEditing) {
      setEditClass((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Classes</h2>
      <Button
        onClick={handleCreate}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Create Class
      </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {classes.map((cls) => (
          <Card key={cls.id}>
          <div  className="p-4 rounded">
            <h3 className="text-lg font-semibold">{cls.name}</h3>
            <p>School: {schools.find((school) => school.id === cls.schoolId)?.name}</p>
            <p>Room Size: {cls.roomSize}</p>
            <Button
              variant='secondary'
              onClick={() => handleEdit(cls)}
              className="mt-2 p-2 "
            >
              Edit
            </Button>
          </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Form Modal */}
      {(isCreating || isEditing) && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <Card><div className="bg-white p-6 rounded w-96">
            <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{isCreating ? "Create Class" : "Edit Class"}</h3>
            <button
              onClick={() => { setIsCreating(false); setIsEditing(false); }}
              // className="p-2 bg-red-500 text-white rounded-full"
            >
              <X />
            </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block">Class Name:</label>
                <input
                  type="text"
                  name="name"
                  value={isCreating ? newClass.name : editClass.name}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
              </div>

              <div>
                <label className="block">School:</label>
                <input
                  type="text"
                  value={schools.find((school) => school.id === (isCreating ? newClass.schoolId : editClass.schoolId))?.name}
                  disabled
                  className="p-2 border rounded w-full bg-gray-200"
                />
              </div>

              <div>
                <label className="block">Room Size:</label>
                <select
                  name="roomSize"
                  value={isCreating ? newClass.roomSize : editClass.roomSize}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <button
                onClick={handleSave}
                className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
              >
                {isCreating ? "Create Class" : "Save Changes"}
              </button>
            </div>
          </div></Card>
        </div>
      )}
    </div>
  );
}
