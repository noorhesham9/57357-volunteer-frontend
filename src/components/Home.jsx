import { Link, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link as Linkkk } from "react-router-dom";
function Home() {
  return (
    <div>
      <Stack spacing={2}>
        <Link to={"/addTimes"} component={Linkkk}>
          اضافه ساعات
        </Link>
        <Link> عرض ساعات الادمن</Link>
        <Link>عرض تفاصيل المتطوع </Link>
        <Link>عرض التقارير الشهريه</Link>
        <Link>عرض التقارير الشهريه</Link>
      </Stack>
    </div>
  );
}

export default Home;
