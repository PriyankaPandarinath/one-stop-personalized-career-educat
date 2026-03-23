import { useState, useEffect } from "react";
import LandPage from "./components/landingPage/Landpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AptitudeTest from "./components/AptitudeTest";  
import CareerMapping from "./components/CareerMapping";  // 👈 ADD THIS

const App = () => {
  const [user, setCurrentUser] = useState(null);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* NEW ROUTE */}
        <Route path="/aptitude-test" element={<AptitudeTest />} />
        <Route path="/career-mapping" element={<CareerMapping />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;