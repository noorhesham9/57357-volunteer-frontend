import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import TimePpicker from "./TimePicker";
import ChooseTheVlunteer from "./ChooseTheVlunteer";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const initialValues = {
  from: "",
  to: "",
  volunteer: "",
};

const validationSchema = Yup.object({
  to: Yup.string().required("Required"),
  from: Yup.string().required("Required"),
  volunteer: Yup.string().required("Required"),
});
function AddTimes({ token, ...others }) {
  const [date, setdate] = React.useState("");
  const [bsudodate, setBsodudate] = React.useState("");
  const [duaration, setduration] = useState(null);
  const [times, setTimes] = useState([]);
  const [reGetTImes, setReGetTImes] = useState(false);
  useEffect(() => {
    others.setregetTheVOlunteer(!others.regetTheVOlunteer);
  }, []);

  useEffect(() => {
    const tt = localStorage.getItem("dateForAdd");

    if (tt) {
      setdate(tt);
    }
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const ddate = new Date(date);
    axios
      .post(
        "/times/addtime",
        {
          from: values.from,
          to: values.to,
          volunteer: values.volunteer,
          duration: duaration,
          month: ddate.getMonth() + 1,
          day: ddate.getDate(),
          year: ddate.getFullYear(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        resetForm();
        setReGetTImes(!reGetTImes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (date == "") {
      return;
    } else {
      const ddate = new Date(date);
      axios
        .get("/times/getTimes", {
          params: {
            day: ddate.getDate(),
            month: ddate.getMonth() + 1,
            year: ddate.getFullYear(),
          },
        })
        .then((response) => {
          setTimes(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [date, reGetTImes]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          let ddate;
          if (date) {
            ddate = new Date(date);
          }

          return (
            <Form>
              {date ? (
                <>
                  <div>
                    THE DAY you will enter the new records in is :
                    {ddate.getDate()} / {ddate.getMonth() + 1} /{" "}
                    {ddate.getFullYear()}
                    <button
                      onClick={() => {
                        setdate("");
                        localStorage.removeItem("dateForAdd");
                      }}
                    >
                      {" "}
                      choose another day{" "}
                    </button>
                  </div>
                  <TimePpicker
                    name="from"
                    formik={formik}
                    setduration={setduration}
                  />
                  <TimePpicker
                    name="to"
                    formik={formik}
                    setduration={setduration}
                  />
                  duration : {duaration}
                  {/* <TextField label="volunteer name" variant="outlined">
                  <Field name="volunteer" id="volunteer" type="text" />
                </TextField> */}
                  <ChooseTheVlunteer
                    volunteers={others.volunteers}
                    setregetTheVOlunteer={others.setregetTheVOlunteer}
                    regetTheVOlunteer={others.regetTheVOlunteer}
                    formik={formik}
                    token={token}
                  />
                  <Button type="submit">Submit</Button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div>
                    Times for the day :
                    {times.map((time, index) => {
                      return <div key={index}>{time._id}</div>;
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Typography>Choose the day of entry</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(value) => {
                        setBsodudate(value);
                      }}
                      // value={bsudodate}
                    />
                  </LocalizationProvider>
                  <Button
                    onClick={() => {
                      localStorage.setItem("dateForAdd", bsudodate.toString());
                      setdate(bsudodate.toString());
                    }}
                  >
                    enter the date
                  </Button>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddTimes;
