import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

// const green_btn = {
//     backgroundColor: "#3bb19b",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: "5px",

// };

const Reset = ({ resetFormFields }) => {
    const [users, setUsers] = useState([]);
    return (
        <div>
      {/* ... other child component content */}
      <button onClick={resetFormFields}>Reset Form Fields</button>
    </div>
    );
};

export default Reset;