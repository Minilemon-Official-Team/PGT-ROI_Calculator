import { RouterProvider } from "react-router-dom";
import { router } from "./shared/config/router";
import { NavStateProvider } from "./shared/contexts";

function App() {
  return (
    <NavStateProvider>
      <RouterProvider router={router} />
    </NavStateProvider>
  );
}

export default App;
