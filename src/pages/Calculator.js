import React, { useState } from "react";
import CalculatorComponent from "../components/CalculatorComponent";
import { ThemeContext } from "../Contexts/index";
function Calculator() {
  const themeContextHook = useState("Light");
  return (
    <ThemeContext.Provider value={themeContextHook}>
      <CalculatorComponent />
    </ThemeContext.Provider>
  );
}

export default Calculator;
