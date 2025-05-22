import { Routes, Route } from "react-router";
import HomePage from "../src/pages/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage.jsx";
import OnBoardingPage from "../src/pages/OnBoardingPage.jsx";
import NotificationPage from "../src/pages/NotificationPage.jsx";
import ChatPage from "../src/pages/ChatPage.jsx";
import CallPage from "../src/pages/CallPage.jsx";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router";
import PageLoader from "./components/pageloader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
const App = () => {
  // tanstack query crash course

const {authUser, isLoading} = useAuthUser();


const isAuthenticated = Boolean(authUser);
const isOnBoarded =authUser?.isOnBoarded;
const {theme} = useThemeStore();

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated && isOnBoarded ? (<Layout showSidebar={true}><HomePage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnBoarded ? "/" : "/onboarding"}/>}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnBoarded ? "/" : "/onboarding"}/>}
        />
        <Route
          path="/notifications"
          element={isAuthenticated && isOnBoarded ? (<Layout showSidebar={true}><NotificationPage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnBoarded ? (<Layout showSidebar={true}><CallPage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnBoarded ? (<Layout showSidebar={true}><ChatPage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}
        />
        <Route
          path="/onboarding" 
          element={isAuthenticated ?(!isOnBoarded ? <OnBoardingPage /> : <Navigate to="/" />) : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
