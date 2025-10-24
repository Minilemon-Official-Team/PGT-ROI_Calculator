import { RouterProvider } from "react-router-dom";
import { router } from "./shared/config/router";
import { useState } from "react";
import { NavStateContext } from "./shared/contexts";

function App() {
  const [formCalculated, setFormCalculated] = useState(false);
  return (
    <>
      <NavStateContext.Provider value={{ formCalculated, setFormCalculated }}>
        <RouterProvider router={router}></RouterProvider>
      </NavStateContext.Provider>
    </>
  )
}

export default App
