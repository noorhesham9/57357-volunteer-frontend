import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTimes from "./components/AddTimes";
function App() {
  const navigate = useNavigate();
  const [tokenn, setToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (tokenn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [tokenn]);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <>
      <>
        {tokenn ? <p>Token: {tokenn}</p> : <p>No token found</p>}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addTimes" element={<AddTimes token={tokenn} />} />
        </Routes>
      </>
    </>
  );
}

export default App;
