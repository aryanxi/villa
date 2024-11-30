import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";

// Import components
import Customers from "./components/Customers"; // Customer form component
import FinancePage from "./components/FinancePage"; // Finance page component
import Advertisement from "./components/Advertisement"; // Advertisement component

function App() {
  const [isFinancePageVisible, setIsFinancePageVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const correctUserId = "admin"; // Example admin credentials
  const correctPassword = "admin123"; // Example admin credentials

  // Handle finance page visibility toggle with login
  const handleFinancePageToggle = () => {
    if (!isLoggedIn) {
      const enteredUserId = prompt("Enter User ID:");
      const enteredPassword = prompt("Enter Password:");

      // Validate user credentials
      if (
        enteredUserId === correctUserId &&
        enteredPassword === correctPassword
      ) {
        setIsLoggedIn(true); // Mark the user as logged in
        setIsFinancePageVisible(true); // Show finance page
      } else {
        alert("Invalid credentials!");
      }
    } else {
      // If already logged in, just toggle the visibility of the finance page
      setIsFinancePageVisible(!isFinancePageVisible);
    }
  };

  return (
    <Router>
      <div className="container">
        {/* Main header */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1>Resort Management Dashboard</h1>
          <button
            onClick={handleFinancePageToggle}
            style={{ marginLeft: "20px" }}
          >
            {isFinancePageVisible ? "Hide Finance Page" : "Show Finance Page"}
          </button>
        </div>

        {/* Advertisement section */}
        <Advertisement />

        {/* Flex layout for dashboard components */}
        <div className="flex-container">
          <div className="form-container">
            {/* Customers form component */}
            <Customers />
          </div>

          {/* Show Finance Page conditionally */}
          {isFinancePageVisible && <FinancePage />}
        </div>
      </div>
    </Router>
  );
}

export default App;
