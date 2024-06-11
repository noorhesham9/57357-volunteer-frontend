import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function ChooseTheVlunteer({ token }) {
  const [volunteers, setvolunteers] = useState([]);
  useEffect(() => {
    axios
      .get("/volunteer/getvolunteers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.data.volunteers);
        setvolunteers(response.data.data.volunteers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <FormControl
        sx={{
          width: "400px",
        }}
      >
        <InputLabel id="demo-simple-select-label">
          choose the volunteer
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="choose the volunteer"
        >
          {volunteers.map((volunteer, index) => {
            return <MenuItem key={index}>{volunteer.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default ChooseTheVlunteer;
