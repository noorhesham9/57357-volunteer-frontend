import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Field } from "formik";
import dayjs from "dayjs";
import { useEffect } from "react";
import moment from "moment";

function TimePpicker({ formik, name, setduration }) {
  const [valuefrom, setValuefrom] = React.useState(dayjs(""));
  const [valueto, setValueto] = React.useState(dayjs(""));

  useEffect(() => {
    if (formik.values.from == "") {
      setValuefrom(dayjs(""));
    }
    if (formik.values.to == "") {
      setValueto(dayjs(""));
    }
  }, [formik.values.from, formik.values.to]);

  useEffect(() => {
    let hoursStart = formik.values.from.split(":")[0];
    if (hoursStart < 10) {
      hoursStart = 0 + formik.values.from.split(":")[0];
    }
    let minutesstart = formik.values.from.split(":")[1];
    if (minutesstart < 10) {
      minutesstart = 0 + formik.values.from.split(":")[1];
    }

    let hoursend = formik.values.to.split(":")[0];
    if (hoursend < 10) {
      hoursend = 0 + formik.values.to.split(":")[0];
    }
    let minutesend = formik.values.to.split(":")[1];
    if (minutesend < 10) {
      minutesend = 0 + formik.values.to.split(":")[1];
    }

    let datestart = new Date(
      `2024-01-01T${hoursStart}:${minutesstart}:00.000Z`
    );
    let dateend = new Date(`2024-01-01T${hoursend}:${minutesend}:00.000Z`);

    let diff = dateend.getTime() - datestart.getTime();
    let diffdate = new Date(diff);

    setduration(diffdate.getUTCHours() + ":" + diffdate.getUTCMinutes());

    if (`${diffdate.getUTCHours()}` == "NaN") {
      setduration("set the time to calculate the duration");
    }
  }, [formik.values.from, formik.values.to]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            value={name == "from" ? valuefrom : valueto}
            render
            onChange={(value) => {
              if (value) {
                if (name == "from") setValuefrom(value);
                if (name == "to") setValueto(value);
                let v = `${value.hour()}:${value.minute()}`;
                formik.setFieldValue(name, v);
              }
            }}
            ampm={false}
            label={name}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default TimePpicker;
