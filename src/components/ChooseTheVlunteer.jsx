import axios from "axios";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
const filter = createFilterOptions();

function ChooseTheVlunteer({ token, formik }) {
  const [volunteers, setvolunteers] = useState([]);
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [regetTheVOlunteer, setregetTheVOlunteer] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    name: "",
    phone: "",
  });

  const initialValues = {
    name: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phone: Yup.string(),
  });

  useEffect(() => {
    if (token) {
      axios
        .get("/volunteer/getvolunteers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          let names = response.data.data.volunteers.map((obj) => obj.name);
          setvolunteers(names.sort());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [regetTheVOlunteer]);

  const handleSubmit = (values, { resetForm }) => {
    // event.preventDefault();

    axios
      .post("/volunteer/addvolunteer", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toggleOpen(false);
        resetForm({ values: initialValues });
        setregetTheVOlunteer(!regetTheVOlunteer);
        setValue(res.data.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <div>
      <>
        <FormControl
          sx={{
            width: "400px",
          }}
        >
          <Autocomplete
            onChange={(event, newValue) => {
              if (volunteers.includes(newValue)) {
                formik.setFieldValue("volunteer", newValue);
                setValue(newValue);
              } else if (typeof newValue === "string") {
                setTimeout(() => {
                  toggleOpen(true);
                  setDialogValue({
                    name: newValue.split('"')[1],
                    phone: "",
                  });
                });
              } else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setDialogValue({
                  name: newValue.inputValue,
                  phone: "",
                });
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
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== "") {
                filtered.push(`Add "${params.inputValue}"`);
              }

              return filtered;
            }}
            clearOnBlur
            renderInput={(params) => (
              <TextField {...params} label="choose the volunteer" />
            )}
          />

          <Dialog open={open} onClose={handleClose}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formm) => {
                return (
                  <Form>
                    <DialogTitle>Add a new Volunteer</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        did the volunteer you want is not in the choose the
                        volunteer box?
                      </DialogContentText>
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="name"
                        id="name"
                        value={dialogValue.name}
                        onChange={(event) =>
                          // setDialogValue({
                          //   ...dialogValue,
                          //   name: event.target.value,
                          // })
                          formm.setFieldValue("name", event.target.value)
                        }
                        sx={{
                          width: "100%",
                        }}
                        label="name of the volunteer"
                        type="text"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        name="phone"
                        id="phone"
                        // value={dialogValue.phone}
                        sx={{
                          width: "100%",
                        }}
                        onChange={(event) =>
                          // setDialogValue({
                          //   ...dialogValue,
                          //   phone: event.target.value,
                          // })
                          formm.setFieldValue("phone", event.target.value)
                        }
                        label="phone number"
                        type="number"
                        variant="standard"
                      />

                      <DialogContentText
                        sx={{
                          color: "#ff5b5b",
                          textAlign: "right",
                          marginTop: "5px",
                        }}
                      >
                        * is required
                      </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Add</Button>
                    </DialogActions>
                  </Form>
                );
              }}
            </Formik>
          </Dialog>
        </FormControl>
      </>
    </div>
  );
}

export default ChooseTheVlunteer;
