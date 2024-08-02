/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import axios from "axios";
function EditTimePage({
  token,
  time,
  setOpenEditPage,
  setReload,
  reload,
  resubmit,
}) {
  console.log(time);
  const [NNduration, setNNduration] = useState(null);
  let fromHH = time.from.split(":")[0];
  if (time.from.split(":")[0] < 10) {
    fromHH = `0${time.from.split(":")[0]}`;
  }

  let fromMM = time.from.split(":")[1];
  if (time.from.split(":")[1] < 10) {
    fromMM = `0${time.from.split(":")[1]}`;
  }

  let TOHH = time.to.split(":")[0];
  if (time.to.split(":")[0] < 10) {
    TOHH = `0${time.to.split(":")[0]}`;
  }
  let TOMM = time.to.split(":")[1];
  if (time.to.split(":")[1] < 10) {
    TOMM = `0${time.to.split(":")[1]}`;
  }

  const TimeFFF = dayjs(new Date(`2024-07-11T${fromHH}:${fromMM}:00`));
  const TimeTTT = dayjs(new Date(`2024-07-11T${TOHH}:${TOMM}:00`));

  const [fromTT, setFrom] = React.useState(TimeFFF);
  const [toTT, setTo] = React.useState(TimeTTT);

  const handleClose = () => {
    setOpenEditPage(false);
  };
  const handleSave = (values, { resetForm }) => {
    console.log("save", values.fromEdit);
    axios
      .patch(
        `/times/editTime/${time.timeid}`,
        {
          from: values.fromEdit,
          to: values.toEdit,
          volunteerName: time.volunteerName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        resetForm();
        setOpenEditPage(false);
        if (reload != undefined) {
          console.log("reload");
          setReload(!reload);
        } else {
          resubmit(time.volunteerName);
        }
      });
  };

  useEffect(() => {
    console.log(fromTT.hour(), toTT.minute());
    console.log(fromTT);
    console.log(toTT);

    let HH = fromTT.hour();
    if (fromTT.hour() < 10) {
      HH = `0${fromTT.hour()}`;
    }

    let MM = fromTT.minute();
    if (fromTT.minute() < 10) {
      MM = `0${fromTT.minute()}`;
    }

    let HHH = toTT.hour();
    if (toTT.hour() < 10) {
      HHH = `0${toTT.hour()}`;
    }
    let MMM = toTT.minute();
    if (toTT.minute() < 10) {
      MMM = `0${toTT.minute()}`;
    }

    let datestart = new Date(`2024-01-01T${HH}:${MM}:00.000Z`);
    let dateend = new Date(`2024-01-01T${HHH}:${MMM}:00.000Z`);

    let diff = dateend.getTime() - datestart.getTime();
    let diffdate = new Date(diff);
    setNNduration(diffdate.getUTCHours() + ":" + diffdate.getUTCMinutes());
  }, [fromTT, toTT]);

  const initialValues = {
    fromEdit: time.from,
    toEdit: time.to,
  };
  const validationSchema = Yup.object({
    fromEdit: Yup.string().required("Required"),
    toEdit: Yup.string().required("Required"),
  });

  return (
    <Box
      style={{
        backgroundColor: "#00c8ff",
        width: "50vw",
        height: "50vh",
        position: "absolute",
        top: "50%",
        border: "3px solid blue",
        borderRadius: "9px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px 15px",
        textAlign: "center",
        zIndex: 2,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid red",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "inline-block", fontSize: "20px" }}>
            Edit Time
          </div>
          <div style={{ display: "inline-block", fontSize: "20px" }}>
            Edit Time for:{"  "}
            {time.volunteerName ? time.volunteerName : "there is no name"}
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              handleClose();
            }}
            style={{
              cursor: "pointer",
              backgroundColor: "#FF0000",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            x
          </button>
        </div>
      </header>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "15px",
          borderTop: "1px solid red",
          padding: " 20px 10px",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {(form) => {
            return (
              <Form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    name="fromEdit"
                    // value={name == "from" ? valuefrom : valueto}
                    // render
                    onChange={(value) => {
                      if (value) {
                        setFrom(value);
                        let v = `${value.hour()}:${value.minute()}`;
                        console.log(v);
                        form.setFieldValue("fromEdit", v);
                      }
                    }}
                    value={fromTT}
                    ampm={false}
                    label={"from"}
                  />
                  <TimePicker
                    name="toEdit"
                    // value={name == "from" ? valuefrom : valueto}
                    // render
                    onChange={(value) => {
                      if (value) {
                        setTo(value);
                        let v = `${value.hour()}:${value.minute()}`;
                        console.log(v);
                        form.setFieldValue("toEdit", v);
                      }
                    }}
                    value={toTT}
                    ampm={false}
                    label={"to"}
                  />
                </LocalizationProvider>
                <br />
                <Button
                  disabled={
                    fromTT.hour() == TimeFFF.hour() &&
                    fromTT.minute() == TimeFFF.minute() &&
                    toTT.minute() == TimeTTT.minute() &&
                    toTT.hour() == TimeTTT.hour()
                  }
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <div>
        {" "}
        past duration : {time.duration} new duration : {NNduration}
      </div>
    </Box>
  );
}

export default EditTimePage;
