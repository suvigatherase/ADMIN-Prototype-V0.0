import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Login/LoginPage";
import LoginWithFormik from "./Login/LoginWithFormik";
import UserInfo from "./Login/UserInfo";
import { useState } from "react";
function App() {
  const [view, setView] = useState("basic");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleLogin(status) {
    console.log(status, "handleLogin-APP");
    setIsLoggedIn(status === 200 ? true : false);
  }

  return (
    <div>
      {/* {!isLoggedIn && <LoginWithFormik handleLogin={handleLogin} />} */}
      {!isLoggedIn && <LoginPage handleLogin={handleLogin} />}
      {/* {isLoggedIn && <UserInfo />} */}
    </div>
  );
}

export default App;
