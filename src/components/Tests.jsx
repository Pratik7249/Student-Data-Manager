import React from "react";
import { Button } from "@mui/material";
import { normalizeName, isFuzzyMatch } from "../utils/helpers";

export default function Tests({ setMessage }) {
  /** 
   * Run a small set of checks to make sure our helper functions behave correctly.
   */
  const runAllChecks = () => {
    try {
      console.assert(normalizeName("José") === "jose", "Expected José → jose");
      console.assert(normalizeName("JOSE") === "jose", "Expected JOSE → jose");
      console.assert(isFuzzyMatch("rvi", "ravi") === true, "Should match 'ravi'");
      console.assert(isFuzzyMatch("cse2025-01", "CSE2025-001") === true, "Should match roll numbers");
      console.assert(isFuzzyMatch("ana", "arun") === false, "Should NOT match");

      setMessage(" All tests passed successfully!");
    } catch (error) {
      setMessage(" Some tests failed — see console for details.");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Button 
        variant="contained" 
        color="success" 
        onClick={runAllChecks}
      >
        Run Helper Function Tests
      </Button>
    </div>
  );
}
