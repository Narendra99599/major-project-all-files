import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./services/operations/authApi";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./auth/OpenRoute";
import PrivateRoute from "./auth/PrivateRoute";
import PromptPage from "./components/PromptPage";
import CustomPrompt from "./components/CustomPrompt";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="bg-primary-black overflow-hidden">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/prompt-page"
          element={
            <PrivateRoute>
              <PromptPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/custom-prompt"
          element={
            <PrivateRoute>
              <CustomPrompt />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
