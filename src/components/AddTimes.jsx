import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "@mui/material";
import TimePpicker from "./TimePicker";
import ChooseTheVlunteer from "./ChooseTheVlunteer";
import { TextField } from "@mui/material";
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
function AddTimes({ token }) {
  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("/times/addtime", values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          console.log(formik.values);
          return (
            <Form>
              <TimePpicker name="from" formik={formik} />

              <TimePpicker name="to" formik={formik} />

              {/* <TextField label="volunteer name" variant="outlined">
                <Field name="volunteer" id="volunteer" type="text" />
              </TextField> */}

              <ChooseTheVlunteer formik={formik} token={token} />
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddTimes;
