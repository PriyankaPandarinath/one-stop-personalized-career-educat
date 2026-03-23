import React from "react";

import Aptitude from "./Aptitude";
import DashboardHome from "./DashboardHome";
import GovtColleges from "./GovtColleges";
import Scholarships from "./Scholarships";
import CareerMappingDashboard from "./CareerMappingDashboard";
import AIRecommendation from "./AIRecommendation";

function Main_dashboard_area({ selected, onNavigate }) {
  return (
    <div className="" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
      {selected === "dashboard" && <DashboardHome onNavigate={onNavigate} />}
      {selected === "test" && <Aptitude />}
      {selected === "college" && <GovtColleges />}
      {selected === "scholarship" && <Scholarships />}
      {selected === "career" && <CareerMappingDashboard />}
      {selected === "ai" && <AIRecommendation />}
    </div>
  );
}

export default Main_dashboard_area;
