/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link, Stack } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link as Linkkk, Routes } from "react-router-dom";
import { Route } from "react-router";
import ViewVolunteerDetail from "./ViewVolunteerDetail";
import axios from "axios";
import AddTimes from "./AddTimes";
import ViewAdminHours from "./ViewAdminHours";
import AllData from "./AllData";
function Home({ token }) {
  const [volunteers, setvolunteers] = useState([]);
  const [regetTheVOlunteer, setregetTheVOlunteer] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get("/volunteer/getvolunteers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          let names = response.data.data.volunteers.map((obj) => obj.name);
          setvolunteers(names.sort());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [regetTheVOlunteer]);

  // محتاج اظبط موضوع الريكويست الكتيييير
  // عايز استخدم redux toolkit علشان هيفيد
  return (
    <div>
      <Stack spacing={2}>
        <Link to={"/home/addTimes"} component={Linkkk}>
          اضافه ساعات
        </Link>
        <Link to={"/home/viewAdminHours"} component={Linkkk}>
          عرض ساعات الادمن
        </Link>
        <Link to={"/home/viewVolunteerDetail"} component={Linkkk}>
          عرض تفاصيل المتطوع
        </Link>

        <Link to={"/home/alldata"} component={Linkkk}>
          All Data
        </Link>
        {/* <Link component={Linkkk}>عرض التقارير الشهريه</Link> */}
      </Stack>
      <br />
      <br />
      <br />
      <br />
      <Routes>
        <Route
          path="/addTimes"
          element={
            <AddTimes
              token={token}
              volunteers={volunteers}
              setregetTheVOlunteer={setregetTheVOlunteer}
              regetTheVOlunteer={regetTheVOlunteer}
            />
          }
        />
        <Route
          path="/viewAdminHours"
          element={<ViewAdminHours token={token} />}
        />

        <Route
          path="/viewAdminHour"
          element={<ViewAdminHours token={token} />}
        />
        <Route
          path="/ViewVolunteerDetail"
          element={
            <ViewVolunteerDetail
              token={token}
              volunteers={volunteers}
              setregetTheVOlunteer={setregetTheVOlunteer}
              regetTheVOlunteer={regetTheVOlunteer}
            />
          }
        />

        <Route path="/alldata" element={<AllData token={token} />} />
      </Routes>
    </div>
  );
}

export default Home;
