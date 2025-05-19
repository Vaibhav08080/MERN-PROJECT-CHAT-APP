import { Routes,Route } from "react-router";  
import HomePage from "../src/pages/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage.jsx";
import OnBoardingPage from "../src/pages/OnBoardingPage.jsx";
import NotificationPage from "../src/pages/NotificationPage.jsx";
import ChatPage from "../src/pages/ChatPage.jsx";
import CallPage from "../src/pages/CallPage.jsx";
import { Toaster } from "react-hot-toast";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "./lib/axios";
import {Navigate} from "react-router";
const App = () => {
  // tanstack query crash course

  const { data:authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false, // auth check
  });

  const authUser=authData?.user;
    return(

    <div>
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route 
          path="/notifications" 
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/call" 
          element={authUser ? <CallPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chat" 
          element={authUser ? <ChatPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/onboarding" 
          element={authUser ? <OnBoardingPage /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
