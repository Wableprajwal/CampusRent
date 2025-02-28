import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage";
import VerificationCodePage from "./Pages/ForgotPassword/VerificationCodePage";
import NewPasswordPage from "./Pages/ForgotPassword/NewPasswordPage";
import NewLendPage from "./Pages/NewLendItem";
import HomePage from "./Pages/HomePage";
import ItemDetailPage from "./Pages/ItemDetailPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route path="/new-lend-item" element={
          <PrivateRoute>
            <NewLendPage />
          </PrivateRoute>
        } />

        <Route path="/verification" element={
          <PrivateRoute>
            <VerificationCodePage />
          </PrivateRoute>
        } />

        <Route path="/set-new-password" element={
          <PrivateRoute>
            <NewPasswordPage />
          </PrivateRoute>
        } />

        <Route path="/item-detail/:id" element={
          <PrivateRoute>
            <ItemDetailPage />
          </PrivateRoute>
        } />

        <Route path="/forgot-password" element={
          <PrivateRoute>
            <ForgotPasswordPage />
          </PrivateRoute>
        } />

        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;