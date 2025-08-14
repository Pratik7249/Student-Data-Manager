import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";

/**
 * StudentForm handles adding and editing student records
 * with validation for roll uniqueness, required fields, and CGPA range.
 */
export default function StudentForm({
  onSave,
  editingStudent,
  onClear,
  students
}) {
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    dept: "",
    year: "",
    cgpa: ""
  });
  const [errors, setErrors] = useState({});

  const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EE"];
  const YEARS = ["1", "2", "3", "4"];

  // Populate form when editing, reset when cleared
  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const resetForm = () => {
    setFormData({ roll: "", name: "", dept: "", year: "", cgpa: "" });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const { roll, name, dept, year, cgpa } = formData;
    const newErrors = {};

    // Roll validation
    if (!roll.trim()) {
      newErrors.roll = "Roll number is required";
    } else {
      const duplicate = students.find(
        (s) => s.roll === roll && (!editingStudent || s.roll !== editingStudent.roll)
      );
      if (duplicate) newErrors.roll = "Roll number must be unique";
    }

    // Name validation
    if (!name.trim()) newErrors.name = "Name is required";

    // Dropdown validations
    if (!dept) newErrors.dept = "Department is required";
    if (!year) newErrors.year = "Year is required";

    // CGPA validation
    if (cgpa === "") {
      newErrors.cgpa = "CGPA is required";
    } else if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      newErrors.cgpa = "CGPA must be between 0 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...formData, cgpa: parseFloat(formData.cgpa) });
    resetForm();
  };

  const handleClear = () => {
    resetForm();
    onClear();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSave}
      sx={{ p: 3, mb: 3 }}
      elevation={3}
    >
      <Typography variant="h6" gutterBottom>
        {editingStudent ? "Edit Student" : "Add Student"}
      </Typography>

      <Stack spacing={2}>
        {/* Roll Number */}
        <TextField
          label="Roll Number"
          value={formData.roll}
          onChange={(e) => handleChange("roll", e.target.value)}
          error={!!errors.roll}
          helperText={errors.roll}
          fullWidth
        />

        {/* Name */}
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />

        {/* Department */}
        <TextField
          select
          label="Department"
          value={formData.dept}
          onChange={(e) => handleChange("dept", e.target.value)}
          error={!!errors.dept}
          helperText={errors.dept}
          fullWidth
        >
          <MenuItem value="">
            <em>--Select--</em>
          </MenuItem>
          {DEPARTMENTS.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>

        {/* Year */}
        <TextField
          select
          label="Year"
          value={formData.year}
          onChange={(e) => handleChange("year", e.target.value)}
          error={!!errors.year}
          helperText={errors.year}
          fullWidth
        >
          <MenuItem value="">
            <em>--Select--</em>
          </MenuItem>
          {YEARS.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </TextField>

        {/* CGPA */}
        <TextField
          label="CGPA"
          type="number"
          value={formData.cgpa}
          onChange={(e) => handleChange("cgpa", e.target.value)}
          inputProps={{ step: "0.01", min: 0, max: 10 }}
          error={!!errors.cgpa}
          helperText={errors.cgpa}
          fullWidth
        />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" type="submit">
            {editingStudent ? "Update" : "Save"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
