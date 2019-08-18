import React, { useState, useEffect } from "react";
import fx from "money";
import CurrencyInput from "../components/CurrencyInput";
import CurrencyDropdown from "../components/CurrencyDropdown";

const DISPLAY_NAME = "currency-container";

const CurrencyContainer = () => {
  const [symbol, setSymbol] = useState("$");
  const [baseValue, setBaseValue] = useState("0");
  const [selectOptions, setSelectOptions] = useState({});
  const [fromValue, setFromValue] = useState('USD');
  const [toValue, setToValue] = useState('USD');
  const [converted, setConverted] = useState("0.00");
  const [errorState, setErrorState] = useState({from: '', to: ''});
  const [isError, setIsError] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({});

  const mockData =
  "https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/27beff3509eff0d2690e593336179d4ccda530c2/Common-Currency.json";
  const endPoint = `https://api.exchangeratesapi.io/latest?base=USD`;

  useEffect(() => {
    fetch(mockData)
      .then(response => response.json())
      .then(data => setSelectOptions(data));
    fetch(endPoint)
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data.rates);
        fx.rates = data.rates;
        fx.base = data.base;
      });
  }, []);

  const changeHandler = e => {
    setBaseValue(e);
    if (!isError) {
      let conversion = fx(e)
        .from(fromValue)
        .to(toValue);
      setConverted(conversion.toFixed(2));
    }
  };

  const onFromChange = (e) => {
    const sym = selectOptions[e] && selectOptions[e].symbol;
    validateInput(e, 'from');
    setSymbol(sym);
    setFromValue(e);
  };

  const onToChange = (e) => {
    validateInput(e, 'to');
    setToValue(e);
  };

  const validateInput = (e, dest) => {
    if (!exchangeRates[e]) {
      setErrorState({...errorState, [dest] : 'Please choose valid currency'});
      setIsError(true);
    } else {
      setErrorState({...errorState, [dest] : ''});
      setIsError(false);
    }
  };


  return (
    <div className={`${DISPLAY_NAME}`}>
      <div>
        From :
        <CurrencyDropdown
          list={selectOptions}
          value={fromValue}
          onSelectChange={e => {
            onFromChange(e);
          }}
          error={errorState.from}
        />
      </div>
      <div>
        To:
        <CurrencyDropdown
          list={selectOptions}
          value={toValue}
          onSelectChange={e => {
            onToChange(e);
          }}
          error={errorState.to}
        />
      </div>
      <div>
        Enter Amount to be converted:
        <CurrencyInput
          symbol={symbol}
          value={baseValue}
          disabled={isError}
          onChange={e => {
            changeHandler(e);
          }}
        />
      </div>

      <div>
        <h2>Converted:</h2>
        <h3>{converted}</h3>
      </div>
    </div>
  );
};

export default CurrencyContainer;
