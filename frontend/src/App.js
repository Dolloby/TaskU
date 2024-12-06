import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Components/profile";
import Register from "./Components/register";
import Recovery from "./Components/recovery";
import EditProfile from "./Components/editProfile";
import ChangePassword from "./Components/changePassword";
import Kanban from "./Components/kanban";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/recovery" element={<Recovery/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/> </PrivateRoute>} />
        <Route path="/edit-profile" element={<PrivateRoute><EditProfile/> </PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword/> </PrivateRoute>} />
        <Route path="/kanban" element={<Kanban/>} />
      </Routes>
    </Router>

  );
}

export default App;