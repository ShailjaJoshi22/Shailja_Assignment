import React from 'react';
import states from '../Assets/states_Data'; // Import the list of countries

const State_Dropdown = ({ value, onChange , selectedcountry}) => {
  // console.log("state value",value,selectedcountry);

  return (
    <select name="state" value={value} onChange={onChange}>
      <option value="">Select a state</option>
      {states.map((state, index) => (
        state.country_name == selectedcountry
      ? ( <option key={index} value={state.name}>
        {state.name}
      </option> )
      : ""
      ))}
    </select>
  );
};

export default State_Dropdown;
