import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";

// pages
import Home from "../../features/home/pages";
import CalculatorPage from "../../features/calculator/pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/kalkulator',
                element: <CalculatorPage />
            }
        ]
    }
])