// Advertisement.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Advertisement = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/advertisements")
      .then((response) => setContent(response.data.content))
      .catch((error) => console.error(error));
  }, []);

  const updateContent = () => {
    axios
      .put("http://localhost:5000/advertisements", { content })
      .then(() => alert("Advertisement updated!"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h2>Advertisement</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter advertisement content here..."
      />
      <button onClick={updateContent}>Save</button>
    </div>
  );
};

export default Advertisement;
