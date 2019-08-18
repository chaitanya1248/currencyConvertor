import React from "react";
import PropTypes from "prop-types";

const DISPLAY_NAME = "currency-input";

const CurrencyInput = ({ symbol, value, disabled, onChange }) => {
  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <label htmlFor={`${DISPLAY_NAME}`} style={{padding:'20px', margin: '20px'}}>
        <span>{symbol}</span>
        <input type="number"
          disabled={disabled}
          value={value}
          onChange={ (e) => { onChange(e.target.value)} } />
      </label>
    </div>
  );
};

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  symbol: PropTypes.string
};

export default CurrencyInput;
