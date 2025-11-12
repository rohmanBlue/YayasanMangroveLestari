"use client";

import React, { useState } from "react";
import { evaluate } from "mathjs";

export default function Kalkulator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Button angka & operator
  const numberButtons = ["7","8","9","4","5","6","1","2","3","0","."];
  const operatorButtons = ["/","*","-","+","(",")"];

 
  // Input angka/operator
  const handleInput = (value: string) => setInput(prev => prev + value);

  // Clear input & result
  const handleClear = () => {
    setInput("");
    setResult("");
  };

const handleCalculate = () => {
  try {
    const value = evaluate(input); // mathjs akan lempar error kalau invalid
    setResult(value.toString());
  } catch {
    setResult("Input tidak valid");
  }
};

 
  return (
    <div className="p-4 max-w-md mx-auto bg-white/70 text-white rounded-xl backdrop-blur-md shadow-lg">
      <h2 className="text-xl mb-2 font-bold">Kalkulator</h2>

      <input
        type="text"
        className="w-full p-2 mb-2 text-black rounded"
        value={input}
        placeholder="Masukkan ekspresi"
        readOnly
      />

      <div className="grid grid-cols-4 gap-2 mb-2">
        {numberButtons.map(n => (
          <button
            key={n}
            onClick={() => handleInput(n)}
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
          >
            {n}
          </button>
        ))}
        {operatorButtons.map(op => (
          <button
            key={op}
            onClick={() => handleInput(op)}
            className="bg-blue-700 hover:bg-blue-800 p-2 rounded"
          >
            {op}
          </button>
        ))}
        <button onClick={handleClear} className="col-span-2 bg-red-500 hover:bg-red-600 p-2 rounded">
          Clear
        </button>
        <button onClick={handleCalculate} className="col-span-2 bg-green-500 hover:bg-green-600 p-2 rounded">
          =
        </button>
      </div>

      <div className="mb-2">
        <p>Result: {result}</p>
      </div>
    </div>
  );
}
