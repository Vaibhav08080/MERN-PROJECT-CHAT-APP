import { Routes,Route } from "react-router";  
import HomePage from "../src/pages/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage.jsx";
import OnBoardingPage from "../src/pages/OnBoardingPage.jsx";
import NotificationPage from "../src/pages/NotificationPage.jsx";
import ChatPage from "../src/pages/ChatPage.jsx";
import CallPage from "../src/pages/CallPage.jsx";

  const App =()=>{
    return(
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call" element={<CallPage />} />
      </Routes>
    </div>
  )
}

export default App;
