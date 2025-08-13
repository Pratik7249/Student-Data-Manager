import React from "react";
import { normalizeName, isFuzzyMatch } from "../utils/helpers";

export default function Tests({ setMessage }) {
  const runTests = () => {
    try {
      console.assert(normalizeName("José") === "jose", "Test 1 failed");
      console.assert(normalizeName("JOSE") === "jose", "Test 2 failed");
      console.assert(isFuzzyMatch("rvi", "ravi") === true, "Test 3 failed");
      console.assert(isFuzzyMatch("cse2025-01", "CSE2025-001") === true, "Test 4 failed");
      console.assert(isFuzzyMatch("ana", "arun") === false, "Test 5 failed");

      setMessage("All tests passed");
    } catch (err) {
      setMessage("Some tests failed — check console");
    }
  };

  return (
    <div className="tests-section">
      <button onClick={runTests}>Run Tests</button>
    </div>
  );
}
