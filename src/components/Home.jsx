import { Link, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link as Linkkk } from "react-router-dom";
function Home() {
  // محتاج اظبط موضوع الريكويست الكتيييير
  // عايز استخدم redux toolkit علشان هيفيد
  return (
    <div>
      <Stack spacing={2}>
        <Link to={"/addTimes"} component={Linkkk}>
          اضافه ساعات
        </Link>
        <Link to={"/viewAdminHours"} component={Linkkk}>
          عرض ساعات الادمن
        </Link>
        <Link to={"/viewVolunteerDetail"} component={Linkkk}>
          عرض تفاصيل المتطوع
        </Link>
        <Link component={Linkkk}>عرض التقارير الشهريه</Link>
        <Link component={Linkkk}>عرض التقارير الشهريه</Link>
      </Stack>
    </div>
  );
}

export default Home;
