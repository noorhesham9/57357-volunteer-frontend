import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Stack, Snackbar } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import { useAnimate } from "framer-motion";

const initialValues = {
  name: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    console.log(values.name, values.password);
    axios
      .post("/admin/login", values, {
        withCredentials: true,

        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        resetForm({ values: initialValues });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(form) => {
        // console.log(form.errors, form.values);
        // const { errors, touched, isSubmitting } = this.props;
        // console.log(errors);
        return (
          <Form>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={2}>
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" id="name" />
                </Stack>
                <Stack direction="column" spacing={2}>
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" id="password" />
                </Stack>
              </Stack>
              <Button type="submit">Submit</Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Login;
