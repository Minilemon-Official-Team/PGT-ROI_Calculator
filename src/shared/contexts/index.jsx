/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// 1️⃣ Buat context-nya
export const NavStateContext = createContext();

// 2️⃣ Buat provider untuk membungkus komponen lain
export const NavStateProvider = ({ children }) => {
  const [formCalculated, setFormCalculated] = useState(false);
  const [roiResult, setRoiResult] = useState(null);
  const [period, setPeriod] = useState(6);

  return (
    <NavStateContext.Provider
      value={{
        formCalculated,
        setFormCalculated,
        roiResult,
        setRoiResult,
        period,
        setPeriod
      }}
    >
      {children}
    </NavStateContext.Provider>
  );
};
