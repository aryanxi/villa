import React, { useState, useEffect } from "react";
import axios from "axios";

function Customers() {
  // State to hold customer form data
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billDate, setBillDate] = useState("");

  // State to hold list of customers
  const [customers, setCustomers] = useState([]);

  // Fetch customers from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5001/customers") // Update with your API endpoint
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Function to handle form submission
  const handleAddCustomer = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    try {
      // Send POST request to backend API to add customer
      const response = await axios.post("http://localhost:5001/customers", {
        name,
        birthdate,
        phone,
        billAmount,
        billDate,
      });

      // Update the customers list after adding a new customer
      setCustomers([...customers, response.data]);

      // Reset form fields
      setName("");
      setBirthdate("");
      setPhone("");
      setBillAmount("");
      setBillDate("");

      alert("Customer added successfully!");
    } catch (err) {
      console.error("Error adding customer:", err);
      alert("Failed to add customer");
    }
  };

  return (
    <div className="container">
      <h2>Add Customer</h2>
      <form onSubmit={handleAddCustomer}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bill Amount:</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bill Date:</label>
          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>

      <h2 className="maxi">Customers List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Birthdate</th>
              
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{new Date(customer.birthdate).toLocaleDateString()}</td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
