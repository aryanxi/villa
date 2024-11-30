import React, { useState, useEffect } from "react";
import axios from "axios";

function FinancePage() {
  const [customers, setCustomers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageBill, setAverageBill] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  useEffect(() => {
    // Fetching customer data from backend
    axios
      .get("http://localhost:5001/customers")
      .then((response) => {
        const customerData = response.data;
        setCustomers(customerData);

        // Calculate financial data
        const total = customerData.reduce(
          (acc, customer) => acc + (parseFloat(customer.billAmount) || 0), // Fallback to 0 if not a valid number
          0
        );

        const average =
          customerData.length > 0 ? total / customerData.length : 0;

        const outstanding = customerData
          .filter((customer) => !customer.billPaid)
          .reduce(
            (acc, customer) => acc + (parseFloat(customer.billAmount) || 0),
            0
          ); // Fallback to 0 if not a valid number

        setTotalRevenue(total);
        setAverageBill(average);
        setOutstandingBalance(outstanding);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  return (
    <div className="finance-page">
      <center>
        <h2>Finance Dashboard</h2>
      </center>
      <div className="financial-summary">
        <h3>Total Revenue: ₹{totalRevenue.toFixed(2)}</h3>
        <h3>Average Bill: ₹{averageBill.toFixed(2)}</h3>
        <h3>Outstanding Balance: ₹{outstandingBalance.toFixed(2)}</h3>
      </div>

      <h2>Customer Bills</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Bill Amount</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>₹{customer.billAmount || "0"}</td>{" "}
                {/* Show 0 if billAmount is empty or invalid */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FinancePage;
