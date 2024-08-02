import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTimes from "./components/AddTimes";
import ViewAdminHours from "./components/ViewAdminHours";
import ViewVolunteerDetail from "./components/ViewVolunteerDetail";
function App() {
  const navigate = useNavigate();
  const [tokenn, setToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
  }, [Cookies.get()]);

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
          <Route path="/home/*" element={<Home token={tokenn} />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>

        <button
          onClick={() => {
            axios.get("/volunteer/getmonthlyvolunteers", {
              headers: {
                Authorization: `Bearer ${tokenn}`,
              },
              params: {
                month: "7",
                year: "2024",
              },
            });
          }}
          type="button"
        >
          getmonthlyvolunteers
        </button>
      </>
    </>
  );
}

export default App;
