import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import Dashboard from "./Components/dashboard";
import HeaderApp from "./Components/headerApp";
import Login from "./Components/login";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Components/profile";
import Register from "./Components/register";
import Recovery from "./Components/recovery";
import EditProfile from "./Components/editProfile";
import ChangePassword from "./Components/changePassword";
import NewKanban from "./Components/newKanban";
import StatusTask from "./Components/statusTask";
import CreateTask from './Components/createTask';
import ResetPassword from "./Components/resetPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/recovery" element={<Recovery/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/> </PrivateRoute>} />
        <Route path="/headerApp" element={<PrivateRoute><HeaderApp/> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/> </PrivateRoute>} />
        <Route path="/edit-profile" element={<PrivateRoute><EditProfile/> </PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword/> </PrivateRoute>} />
        <Route path="/newkanban" element={<PrivateRoute><NewKanban/> </PrivateRoute>} />
        <Route path="/status-task" element={<PrivateRoute><StatusTask/> </PrivateRoute>} />
        <Route path="/create-task" element={<PrivateRoute><CreateTask /> </PrivateRoute>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>

  );
}

export default App;