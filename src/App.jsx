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
  const [studentList, setStudentList] = useState([]);

  const [currentEdit, setCurrentEdit] = useState(null);

  const [query, setQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({ dept: "", year: "" });
  const [sortOrder, setSortOrder] = useState({ field: "", direction: "" });

  const [alertMsg, setAlertMsg] = useState("");

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const theme = createTheme({
    palette: { mode: themeMode }
  });

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const saveStudent = (data) => {
    if (currentEdit) {
      setStudentList((prev) =>
        prev.map((stu) => (stu.roll === currentEdit.roll ? data : stu))
      );
      setCurrentEdit(null);
    } else {
      setStudentList((prev) => [...prev, data]);
    }
  };

  const clearEdit = () => setCurrentEdit(null);

  const editStudent = (data) => setCurrentEdit(data);

  const deleteStudent = (roll) => {
    setStudentList((prev) => prev.filter((stu) => stu.roll !== roll));
  };

  const updateFilter = (key, value) => {
    setFilterOptions((prev) => ({ ...prev, [key]: value }));
  };

  const changeSort = (field, direction) => {
    setSortOrder({ field, direction });
  };

  const resetFilters = () => {
    setQuery("");
    setFilterOptions({ dept: "", year: "" });
    setSortOrder({ field: "", direction: "" });
  };

  const visibleStudents = studentList.filter((stu) => {
   
    if (filterOptions.dept && stu.dept !== filterOptions.dept) return false;

    if (filterOptions.year && String(stu.year) !== filterOptions.year) return false;

    if (query) {
      const normalizedQuery = normalizeName(query);
      const matchesRoll = isFuzzyMatch(normalizedQuery, normalizeName(stu.roll));
      const matchesName = isFuzzyMatch(normalizedQuery, normalizeName(stu.name));
      if (!matchesRoll && !matchesName) return false;
    }

    return true;
  });

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Student Data Manager</h1>
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </div>

        <SearchAndSort
          searchQuery={query}
          onSearchChange={setQuery}
          filters={filterOptions}
          onFilterChange={updateFilter}
          onSort={changeSort}
          onClearFilters={resetFilters}
        />

        <StudentForm
          onSave={saveStudent}
          editingStudent={currentEdit}
          onClear={clearEdit}
          students={studentList}
        />

        <StudentTable
          students={sortedList}
          onEdit={editStudent}
          onDelete={deleteStudent}
        />

        <Tests setMessage={setAlertMsg} />
        {alertMsg && <p className="message">{alertMsg}</p>}
      </div>
    </ThemeProvider>
  );
}
