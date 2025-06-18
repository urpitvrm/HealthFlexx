import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-black">
        <nav className="bg-white p-4 flex justify-between items-center shadow-md">
          <div className="space-x-4">
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Home
            </Link>
            <Link
              to="/history"
              className="text-blue-600 font-medium hover:underline"
            >
              History
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
