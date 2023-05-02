// CountryItem.js
import React from "react";

const CountryListItem = ({ name, onClick }) => {
  return (
    <p>
      {name}
      <button onClick={onClick}>show</button>
    </p>
  );
};


export default CountryListItem;

