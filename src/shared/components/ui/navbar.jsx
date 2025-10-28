import { NavLink } from "react-router-dom";
import { Home, Calculator, TrendingUp } from "lucide-react";
import { useContext } from "react";
import { NavStateContext } from "../../contexts";

export default function Navbar() {
  const navState = useContext(NavStateContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition
     ${isActive
      ? "bg-black text-white"
      : "text-gray-600 hover:text-black hover:bg-gray-200"
    }`;

  return (
    <nav className="fixed z-50 w-full border-t border-b border-gray-300 bg-white shadow-sm">
      <div className="container mx-auto flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-black rounded-full p-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="font-semibold text-gray-800 text-sm">
              ROI Calculator
            </h1>
            <p className="text-xs text-gray-500 -mt-1">
              Investment Analysis Platform
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <NavLink to="/" className={navLinkClass}>
            <Home className="w-4 h-4" /> Beranda
          </NavLink>

          {
            navState.formCalculated ? <NavLink to="/hasil" className={navLinkClass}>
              <Calculator className="w-4 h-4" /> Hasil
            </NavLink> : null
          }

        </div>
      </div>
    </nav>
  );
}
