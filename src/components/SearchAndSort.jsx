import React from "react";

export default function SearchAndSort({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onSort 
}) {
  return (
    <div className="search-sort-section">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by Roll or Name"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Filters */}
      <select
        value={filters.dept}
        onChange={(e) => onFilterChange("dept", e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="ME">ME</option>
        <option value="CE">CE</option>
        <option value="EE">EE</option>
      </select>

      <select
        value={filters.year}
        onChange={(e) => onFilterChange("year", e.target.value)}
      >
        <option value="">All Years</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      {/* Sort Buttons */}
      <button onClick={() => onSort("cgpa")}>Sort CGPA</button>
      <button onClick={() => onSort("name")}>Sort Name</button>
    </div>
  );
}
