import { Outlet } from "react-router-dom";
import Navbar from "../ui/navbar";
import Footer from "../ui/footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-gray-800">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
