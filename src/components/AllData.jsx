import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import Tableee from "./Tableee";
import MonthlyReport from "./MonthlyReport";
function AllData({ token }) {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [bsoduDate, setbsoduDate] = useState(null);
  return (
    <>
      {year ? (
        // <Tableee year={year} month={month} />
        <MonthlyReport token={token} year={year} month={month} />
      ) : (
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              //   open={true}
              views={["year", "month"]}
              label={'"month & year"'}
              openTo="year"
              value={bsoduDate}
              onChange={(v) => {
                setbsoduDate(v);
                console.log(v.year());
                console.log(v.month() + 1);
              }}
            />
          </LocalizationProvider>
          <br />
          <Button
            onClick={() => {
              const y = bsoduDate.year();
              const m = bsoduDate.month() + 1;
              if (y && m) {
                setYear(y);
                setMonth(m);
              }
              console.log("submit");
            }}
          >
            Submit year and month
          </Button>
        </div>
      )}

      <Button
        onClick={() => {
          setYear(null);
          setMonth(null);
          setbsoduDate(null);
          console.log("reset");
        }}
      >
        reset the minth and year fields
      </Button>
    </>
  );
}

export default AllData;
