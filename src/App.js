import "./App.css";
import { useEffect, useState } from "react";
import img1 from "./img/512px-United-states_flag_icon_round 1.png";
import img2 from "./img/SGD 1.png";
import downIcon from "./img/bx_bx-chevron-down.png";
import arrow from "./img/Group.png";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { baseCurrency } from "./api";
import CurrencyFlag from "react-currency-flags";

function App() {
  const [initalCurrency, setInitalCurrency] = useState(0);
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [typeOne, setTypeOne] = useState("USD");
  const [typeTwo, setTypeTwo] = useState("USD");
  const [liveCurrency, setLiveCurrency] = useState();
  const [toggle, setToggle] = useState(true);

  const handleInitalCurrency = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setInitalCurrency(amount);

    if (liveCurrency && typeOne && typeTwo) {
      const baseRate = liveCurrency[typeOne];
      const targetRate = liveCurrency[typeTwo];
      const convertedAmount = (amount * targetRate) / baseRate;
      setConvertedCurrency(isNaN(convertedAmount) ? 0 : convertedAmount);
    }
  };

  const handleTypeOne = (e) => {
    setTypeOne(e.target.value);
    if (liveCurrency && typeTwo && initalCurrency) {
      const baseRate = liveCurrency[e.target.value];
      const targetRate = liveCurrency[typeTwo];
      const convertedAmount = (initalCurrency * targetRate) / baseRate;
      setConvertedCurrency(isNaN(convertedAmount) ? 0 : convertedAmount);
    }
  };

  const handleTypeTwo = (e) => {
    setTypeTwo(e.target.value);
    if (liveCurrency && typeOne && initalCurrency) {
      const baseRate = liveCurrency[typeOne];
      const targetRate = liveCurrency[e.target.value];
      const convertedAmount = (initalCurrency * targetRate) / baseRate;
      setConvertedCurrency(isNaN(convertedAmount) ? 0 : convertedAmount);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await baseCurrency();
      setLiveCurrency(data.data.data);
      console.log(data.data);
    };
    fetchData();
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const currency = ["USD", "INR", "GBP", "EUR", "NZD", "JPY", "CNY"];
  return (
    <div className="flex flex-col items-center  bg-gradient-to-b from-blue-50 to-white w-full h-screen">
      <div className="w-[80%] flex flex-col gap-1 mt-5">
        <p className="text-[#1F2261] text-lg font-bold  text-center">
          Currency Converter
        </p>
        <p className="text-gray-400 text-sm text-center">
          Check live rates, set rate alerts, recive notification
        </p>
      </div>
      <div className="bg-white p-2 mt-4 flex flex-col items-center rounded-lg shadow-xl w-[80%]">
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-gray-400">Amount</p>
          </div>
          <div className="flex w-full  justify-between  items-center ">
            <div className="w-[45%] flex gap-4">
              <div className="border rounded-[50%] w-[50px] h-[50px] shadow-xl flex justify-center items-center">
                <CurrencyFlag currency={typeOne} width={38} />
              </div>
              <div className="flex items-center justify-center">
                <select onChange={handleTypeOne}>
                  <option>select</option>
                  {currency.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="w-[45%] ">
              <input
                onChange={handleInitalCurrency}
                className="w-full bg-gray-200 outline-none rounded-lg p-2 flex justify-end"
                type="text"
                value={initalCurrency}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center my-3 relative">
          <div className="w-full z-0 h-[1px] bg-gray-300 absolute top-[50%]"></div>
          <div className="rounded-[50%] z-10 p-1 h-[30px] w-[30px] bg-[#26278D] flex justify-center items-center">
            <img src={arrow}></img>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-gray-400">Current Amount</p>
          </div>
          <div className="flex w-full  justify-between items-center ">
            <div className="w-[45%] flex gap-4">
            <div className="border rounded-[50%] w-[50px] h-[50px] shadow-xl flex justify-center items-center">
                <CurrencyFlag currency={typeTwo} width={38} />
              </div>
              <div className="flex items-center justify-center">
                <select onChange={handleTypeTwo}>
                  <option>select</option>
                  {currency.map((val) => {
                    return <option value={val}>{val}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="w-[45%] ">
              <input
                className="w-full bg-gray-200 outline-none rounded-lg p-2 flex justify-end"
                type="text"
                value={convertedCurrency}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-3 p-3 h-full">
        <p className="text-gray-400">Indecative Exchange Rate</p>
        <p className="font-bold text-lg">
          {initalCurrency} {typeOne} = {convertedCurrency} {typeTwo}
        </p>
      </div>
      {/* <div
        onClick={handleToggle}
        className={`w-[80%] mt-5 h-[200px] border-2 border-gray-700 flex justify-start`}
      >
        <div
          className={`w-[100px] h-full`}
          style={{
            transition: "margin-left 0.5s ease-in-out",
            marginLeft: toggle ? "calc(100% - 100px)" : "0px",
          }}
        >
          <div
            className={toggle ? "bg-red-500" : "bg-blue-500"}
            style={{ height: "100%" }}
          ></div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
