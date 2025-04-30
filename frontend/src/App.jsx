import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSign from "../src/pages/AuthSign";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="authSignUp" element={<SignUpPage />} />
        <Route path="authSignIn" element={<AuthSign />} />
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
    // <SignUpPage></SignUpPage>
  );
}

export default App;
