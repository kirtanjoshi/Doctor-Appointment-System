import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Patient/Dashboard";
import FindDoctors from "./pages/Patient/FindDoctors";

import LandingPage from "./pages/Patient/LandingPage";
import Login from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
// import DoctorDetails from "./pages/DoctorDetails";
import UserProvider from "./context/UserContext";
import AppointmentBooking from "./pages/Patient/AppointmentBooking";
import Settings from "./pages/Patient/Setting";
import Layout from "./components/Admin/Layout";
import Doctors from "./pages/Admin/Doctors";
import Patients from "./pages/Admin/Patients";
import DoctorEdit from "./pages/Admin/DoctorEdit";
import PatientEdit from "./pages/Admin/PatientEdit";
import AppLayout from "./pages/Patient/AppLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import Sidebar from "./components/Doctor/Sidebar";
import DoctorLayout from "./components/Doctor/DoctorLayout";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Public Route without Sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="doctors" element={<DoctorDashboard />} />
          <Route path="/auth/signUp" element={<SignUpPage />} />
          <Route path="/doctors/:id" element={<AppointmentBooking />} />
          {/* Protected Routes with Sidebar and Layout */}

          {/* Admin Routes */}
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/edit/:id" element={<DoctorEdit />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientEdit />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
            {/* <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:id" element={<DoctorEdit />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientEdit />} /> */}
          </Route>

        
          <Route path="/patient" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="find-doctors" element={<FindDoctors />} />
            <Route path="appointments" element={<div>Loading</div>} />
            <Route
              path="medical-records"
              element={<div className="p-8">Medical Records Content</div>}
            />
            <Route
              path="messages"
              element={<div className="p-8">Messages Content</div>}
            />
            <Route
              path="profile"
              element={<div className="p-8">Profile Content</div>}
            />
            <Route path="settings" element={<Settings />} />
            <Route path="appointments/:id" element={<AppointmentBooking />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>
    </Router>
  );
}

export default App;

