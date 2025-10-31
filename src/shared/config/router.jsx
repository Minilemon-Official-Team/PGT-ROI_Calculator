import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";

// pages
import Home from "../../pages/";
import CalculatorPage from "../../pages/CalculatorPage";
import ResultsPage from "../../pages/ResultsPage";
import DashboardPage from "../../pages/DashboardPage";

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
            },
            {
                path: '/hasil',
                element: <ResultsPage />
            },
            {
                path: '/dashboard',
                element: <DashboardPage />
            }
        ]
    }
])