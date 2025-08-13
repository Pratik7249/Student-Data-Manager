import React from "react";

export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Roll</th>
          <th>Name</th>
          <th>Department</th>
          <th>Year</th>
          <th>CGPA</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.roll}>
            <td>{student.roll}</td>
            <td>{student.name}</td>
            <td>{student.dept}</td>
            <td>{student.year}</td>
            <td>{student.cgpa}</td>
            <td>
              <button onClick={() => onEdit(student)}>Edit</button>
              <button onClick={() => onDelete(student.roll)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
