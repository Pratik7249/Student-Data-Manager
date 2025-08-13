import React, { useState, useEffect } from "react";

export default function StudentForm({ onSave, editingStudent, onClear, students }) {
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    dept: "",
    year: "",
    cgpa: ""
  });
  const [errors, setErrors] = useState({});

  // Load form data when editing
  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const { roll, name, dept, year, cgpa } = formData;

    if (!roll) newErrors.roll = "Roll number is required";
    else {
      // Unique roll check (except when editing same record)
      const duplicate = students.find(
        (s) => s.roll === roll && (!editingStudent || s.roll !== editingStudent.roll)
      );
      if (duplicate) newErrors.roll = "Roll number must be unique";
    }

    if (!name) newErrors.name = "Name is required";
    if (!dept) newErrors.dept = "Department is required";
    if (!year) newErrors.year = "Year is required";

    if (cgpa === "") newErrors.cgpa = "CGPA is required";
    else if (isNaN(cgpa) || cgpa < 0 || cgpa > 10)
      newErrors.cgpa = "CGPA must be between 0 and 10";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...formData, cgpa: parseFloat(formData.cgpa) });
    setFormData({ roll: "", name: "", dept: "", year: "", cgpa: "" });
  };

  const handleClear = () => {
    setFormData({ roll: "", name: "", dept: "", year: "", cgpa: "" });
    setErrors({});
    onClear();
  };

  return (
    <form onSubmit={handleSave} className="form-section">
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      <div>
        <label htmlFor="roll">Roll Number:</label>
        <input
          id="roll"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
        />
        {errors.roll && <span className="error">{errors.roll}</span>}
      </div>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="dept">Department:</label>
        <select
          id="dept"
          name="dept"
          value={formData.dept}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
          <option value="EE">EE</option>
        </select>
        {errors.dept && <span className="error">{errors.dept}</span>}
      </div>

      <div>
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        {errors.year && <span className="error">{errors.year}</span>}
      </div>

      <div>
        <label htmlFor="cgpa">CGPA:</label>
        <input
          type="number"
          step="0.01"
          id="cgpa"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
        />
        {errors.cgpa && <span className="error">{errors.cgpa}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit">{editingStudent ? "Update" : "Save"}</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </div>
    </form>
  );
}
