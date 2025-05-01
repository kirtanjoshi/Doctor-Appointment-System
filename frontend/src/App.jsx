import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FindDoctors from "./pages/FindDoctors";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DoctorDetails from "./pages/DoctorDetails";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Public Route without Sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUpPage />} />\
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          {/* Protected Routes with Sidebar and Layout */}
          <Route
            path="/*"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 min-h-screen">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="find-doctors" element={<FindDoctors />} />
                    <Route
                      path="appointments"
                      element={<div className="p-8">Appointments Content</div>}
                    />
                    <Route
                      path="medical-records"
                      element={
                        <div className="p-8">Medical Records Content</div>
                      }
                    />
                    <Route
                      path="messages"
                      element={<div className="p-8">Messages Content</div>}
                    />
                    <Route
                      path="profile"
                      element={<div className="p-8">Profile Content</div>}
                    />
                    <Route
                      path="settings"
                      element={<div className="p-8">Settings Content</div>}
                    />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import FindDoctors from "./pages/FindDoctors";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";
// import DoctorDetails from "./pages/DoctorDetails";
// import UserProvider from "./context/UserContext";

// function App() {
//   return (
//     <Router>
//       <UserProvider>
//         <Sidebar />

//         <Routes>
//           {/* Public Route without Sidebar */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signUp" element={<SignUpPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="find-doctors" element={<FindDoctors />} />
//           <Route
//             path="appointments"
//             element={<div className="p-8">Appointments Content</div>}
//           />
//           <Route
//             path="medical-records"
//             element={<div className="p-8">Medical Records Content</div>}
//           />
//           <Route
//             path="messages"
//             element={<div className="p-8">Messages Content</div>}
//           />
//           <Route
//             path="profile"
//             element={<div className="p-8">Profile Content</div>}
//           />
//           <Route
//             path="settings"
//             element={<div className="p-8">Settings Content</div>}
//           />
//           <Route path="/doctors/:id" element={<DoctorDetails />} />
//         </Routes>
//       </UserProvider>
//     </Router>
//   );
// }

// export default App;
