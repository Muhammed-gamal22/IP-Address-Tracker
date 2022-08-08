import React from "react";
import "./CountryInfoList.css";
const CountryInfoList = ({ title, desc }) => {
  return (
    <div className="countryInfoListWrapper">
      <span>{title}</span>
      <h2>{desc}</h2>
    </div>
  );
};

export default CountryInfoList;
