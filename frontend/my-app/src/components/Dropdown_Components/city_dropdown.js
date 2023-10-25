import React from 'react';
import citiesList from '../Assets/cities'; // Import the list of countries

const City_Dropdown = ({ value, onChange ,selectedstate}) => {
  // console.log("city ",value);

  return (
    <select name="city" value={value} onChange={onChange}>
      <option value="">Select a city</option>
      {citiesList.map((city, index) => (
         city.state_name == selectedstate
         ? ( <option key={index} value={city.name}>
           {city.name}
         </option> )
         : ""        
      ))}
    </select>
  );
};

export default City_Dropdown;
