import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ATSScore from "./pages/ATSScore";
import CareerReadiness from "./pages/CareerReadiness";
import InterviewPrep from "./pages/InterviewPrep";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/upload-resume" element={<ResumeUpload />} />

        <Route path="/ats-score" element={<ATSScore />} />

        <Route path="/career-readiness" element={<CareerReadiness />} />

        <Route path="/interview-prep" element={<InterviewPrep />} />

      </Routes>


    </BrowserRouter>

  );

}

export default App;