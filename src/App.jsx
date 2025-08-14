import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchAndSort from "./components/SearchAndSort";
import Tests from "./components/Tests";
import { normalizeName, isFuzzyMatch } from "./utils/helpers";

export default function App() {
  // All student records
  const [studentList, setStudentList] = useState([]);

  // Currently selected student for editing
  const [currentEdit, setCurrentEdit] = useState(null);

  // Search, filter, and sorting controls
  const [query, setQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({ dept: "", year: "" });
  const [sortOrder, setSortOrder] = useState({ field: "", direction: "" });

  // Feedback messages from tests or actions
  const [alertMsg, setAlertMsg] = useState("");

  // Theme state: load preference from localStorage, fall back to light mode
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // MUI theme configuration
  const theme = createTheme({
    palette: { mode: themeMode }
  });

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  /** Save a new student or update an existing one */
  const saveStudent = (data) => {
    if (currentEdit) {
      // Update existing record
      setStudentList((prev) =>
        prev.map((stu) => (stu.roll === currentEdit.roll ? data : stu))
      );
      setCurrentEdit(null);
    } else {
      // Add new record
      setStudentList((prev) => [...prev, data]);
    }
  };

  /** Cancel editing mode */
  const clearEdit = () => setCurrentEdit(null);

  /** Prepare a student for editing */
  const editStudent = (data) => setCurrentEdit(data);

  /** Remove a student by roll number */
  const deleteStudent = (roll) => {
    setStudentList((prev) => prev.filter((stu) => stu.roll !== roll));
  };

  /** Update filter selections */
  const updateFilter = (key, value) => {
    setFilterOptions((prev) => ({ ...prev, [key]: value }));
  };

  /** Change sort order */
  const changeSort = (field, direction) => {
    setSortOrder({ field, direction });
  };

  /** Reset search, filters, and sorting */
  const resetFilters = () => {
    setQuery("");
    setFilterOptions({ dept: "", year: "" });
    setSortOrder({ field: "", direction: "" });
  };

  /** Apply filtering logic */
  const visibleStudents = studentList.filter((stu) => {
    // Department filter
    if (filterOptions.dept && stu.dept !== filterOptions.dept) return false;

    // Year filter
    if (filterOptions.year && String(stu.year) !== filterOptions.year) return false;

    // Search by name or roll
    if (query) {
      const normalizedQuery = normalizeName(query);
      const matchesRoll = isFuzzyMatch(normalizedQuery, normalizeName(stu.roll));
      const matchesName = isFuzzyMatch(normalizedQuery, normalizeName(stu.name));
      if (!matchesRoll && !matchesName) return false;
    }

    return true;
  });

  /** Apply sorting logic */
  const sortedList = [...visibleStudents].sort((a, b) => {
    if (!sortOrder.field) return 0;

    let aValue = a[sortOrder.field];
    let bValue = b[sortOrder.field];

    if (sortOrder.field === "name") {
      aValue = normalizeName(aValue);
      bValue = normalizeName(bValue);
    }

    if (aValue < bValue) return sortOrder.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: 20 }}>
        {/* App Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Student Data Manager</h1>
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </div>

        {/* Search / Filters / Sorting */}
        <SearchAndSort
          searchQuery={query}
          onSearchChange={setQuery}
          filters={filterOptions}
          onFilterChange={updateFilter}
          onSort={changeSort}
          onClearFilters={resetFilters}
        />

        {/* Form for Adding / Editing */}
        <StudentForm
          onSave={saveStudent}
          editingStudent={currentEdit}
          onClear={clearEdit}
          students={studentList}
        />

        {/* Table Display */}
        <StudentTable
          students={sortedList}
          onEdit={editStudent}
          onDelete={deleteStudent}
        />

        {/* Tests and Messages */}
        <Tests setMessage={setAlertMsg} />
        {alertMsg && <p className="message">{alertMsg}</p>}
      </div>
    </ThemeProvider>
  );
}
