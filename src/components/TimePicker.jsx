import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Field } from "formik";
function TimePpicker({ formik, name }) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            render
            // value={formik.values.from}
            onChange={(value) => {
              let v = `${value.hour()}:${value.minute()}`;
              console.log(v);
              formik.setFieldValue(name, v);
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
