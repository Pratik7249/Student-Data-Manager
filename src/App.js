import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchAndSort from "./components/SearchAndSort";
import Tests from "./components/Tests";
import { normalizeName, isFuzzyMatch } from "./utils/helpers";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ dept: "", year: "" });
  const [sortConfig, setSortConfig] = useState({ field: "", direction: "" });
  const [message, setMessage] = useState("");

  // Save or update student
  const handleSave = (student) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.roll === editingStudent.roll ? student : s))
      );
      setEditingStudent(null);
    } else {
      setStudents((prev) => [...prev, student]);
    }
  };

  // Clear form
  const handleClear = () => {
    setEditingStudent(null);
  };

  // Edit student
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Delete student
  const handleDelete = (roll) => {
    setStudents((prev) => prev.filter((s) => s.roll !== roll));
  };

  // Filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Sort handler (toggle)
  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === "asc" ? "desc" : "asc"
        };
      } else {
        return { field, direction: "asc" };
      }
    });
  };

  // Filtering
  const filteredStudents = students.filter((s) => {
    if (filters.dept && s.dept !== filters.dept) return false;
    if (filters.year && String(s.year) !== filters.year) return false;

    if (searchQuery) {
      const q = normalizeName(searchQuery);
      const rollMatch = isFuzzyMatch(q, normalizeName(s.roll));
      const nameMatch = isFuzzyMatch(q, normalizeName(s.name));
      if (!rollMatch && !nameMatch) return false;
    }

    return true;
  });

  // Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig.field) return 0;

    let valA = a[sortConfig.field];
    let valB = b[sortConfig.field];

    if (sortConfig.field === "name") {
      valA = normalizeName(valA);
      valB = normalizeName(valB);
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="App">
      <h1>Student Data Manager</h1>

      <SearchAndSort
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSort={handleSort}
      />

      <StudentForm
        onSave={handleSave}
        editingStudent={editingStudent}
        onClear={handleClear}
        students={students}
      />

      <StudentTable
        students={sortedStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Tests setMessage={setMessage} />
      {message && <p className="message">{message}</p>}
    </div>
  );
}
