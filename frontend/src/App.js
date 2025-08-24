import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → goes to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderOn = ["/login", "/signup"]; // hide header on login & signup

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} /> {/* default page = login */}
      </Routes>
    </>
  );
}


// export default App;

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}