/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { Stack, TextField } from "@mui/material";
import * as Yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Tableee from "./Tableee";

function ViewVolunteerDetail({ token, volunteers }) {
  //  const  submitAgain = () => {

  //  }
  const [value, setvalue] = useState(null);
  const [times, setTimes] = useState([]);
  let durations = [];
  const initialValues = {
    Vname: "",
  };
  const validationSchema = Yup.object({
    Vname: Yup.string().required("Required"),
  });
  const resubmit = (name) => {
    if (name) {
      axios
        .get("/volunteer/getTImes", {
          params: {
            name: name,
          },
        })
        .then((response) => {
          setTimes(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    if (token) {
      axios
        .get("/volunteer/getTImes", {
          params: {
            name: values.Vname,
          },
        })
        .then((response) => {
          setTimes(response.data.data);
          resetForm(initialValues);
          setvalue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // انا مضطر حاليا
  const calculateTotalDuration = (durations) => {
    let totalMinutes = 0;

    durations.forEach((duration) => {
      const [hours, minutes] = duration.split(":").map(Number);
      totalMinutes += hours * 60 + minutes;
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours}:${remainingMinutes.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          console.log(formik.values, value);
          return (
            <>
              <Form>
                <FormControl
                  sx={{
                    width: "400px",
                  }}
                >
                  <Autocomplete
                    onChange={(event, newValue) => {
                      if (volunteers.includes(newValue)) {
                        formik.setFieldValue("Vname", newValue);
                        setvalue(newValue);
                      } else if (newValue == null) {
                        formik.setFieldValue("Vname", "");
                        setvalue(newValue);
                      }
                    }}
                    options={volunteers}
                    sx={{ width: 300 }}
                    freeSolo
                    // disablePortal
                    value={value}
                    clearOnEscape
                    handleHomeEndKeys
                    selectOnFocus
                    clearOnBlur
                    renderInput={(params) => (
                      <TextField {...params} label="choose the volunteer" />
                    )}
                  />
                </FormControl>
                <button type="submit">Submit</button>
              </Form>
            </>
          );
        }}
      </Formik>

      <Stack direction={"column"}>
        {typeof times[0] == "object" ? (
          <>
            <div
              style={{
                padding: "15px 10px",
                border: "1px solid black",
                margin: "10px 0",
              }}
            >
              Name:{" "}
              {times[0].volunteerName
                ? times[0].volunteerName
                : times[0].volunteer}
              <br />
              {times.map((time, index) => {
                durations.push(time.duration);
                return (
                  <Tableee
                    resubmit={resubmit}
                    token={token}
                    key={index}
                    time={time}
                  />
                );
              })}
              total = {calculateTotalDuration(durations)}
            </div>
          </>
        ) : (
          <>
            <p>no times found to this volunteer</p>
            <p>total : 0 hours</p>
          </>
        )}
      </Stack>
    </div>
  );
}

export default ViewVolunteerDetail;
