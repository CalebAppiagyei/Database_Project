import React from "react";
import MainApp from "./MainApp";
import Loginsignup from "./components/auth/Loginsignup";
import Profile from "./components/Profile";
import CreateNewUser from "./components/CreateNewUser";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginsignup />} />
        <Route path="/home" element={<MainApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-new-user" element={<CreateNewUser />} />
      </Routes>
    </Router>
  );
}

export default App;
