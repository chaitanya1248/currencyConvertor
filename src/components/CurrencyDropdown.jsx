import React from "react";
import PropTypes from "prop-types";

const CurrencyDropdown = ({ list, value, onSelectChange, error }) => {
  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <select
        value={value}
        onChange={e => {
          onSelectChange(e.target.value);
        }}
      >
        {Object.keys(list).map((item, i) => (
          <option key={list[item].code} value={list[item].code}>
            {list[item].name}
          </option>
        ))}
      </select>
      <p>{error}</p>
    </div>
  );
};

CurrencyDropdown.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
  list: PropTypes.object,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default CurrencyDropdown;
