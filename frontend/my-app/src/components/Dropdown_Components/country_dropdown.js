import React from 'react';
import countries from '../Assets/countries_Dtata'; // Import the list of countries

const Country_Dropdown = ({ value, onChange }) => {
  // console.log("cntyr value",value);
  return (
    <select name="country" value={value} onChange={onChange}>
      <option value="">Select a country</option>
      {countries.map((country, index) => (
        <option key={index} value={country.name}>
          {country.name}
          {country.code}
        </option>
      ))}
    </select>
  );
};

export default Country_Dropdown;
