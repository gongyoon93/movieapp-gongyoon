import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LandingPage from "./views/LandingPage/Landingpage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from "./views/MovieDetail/MovieDetail";

function App() {
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthLandingPage = Auth(LandingPage, true);
  const AuthMovieDetailPage = Auth(MovieDetail, true);

  return (
    <>
    <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/movie/:movieId" element={<AuthMovieDetailPage />} />
            <Route path="/register" element={<AuthRegisterPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/" element={<AuthLandingPage />} />
          </Routes>
      </div>
      <Footer />
    </Router>
    </>
  );
}
 
export default App;
