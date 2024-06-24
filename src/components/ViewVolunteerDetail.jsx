import React, { useEffect } from "react";
import axios from "axios";
function ViewVolunteerDetail() {
  useEffect(() => {
    axios
      .get("/volunteer/getTImes")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div>ViewVolunteerDetail</div>;
}

export default ViewVolunteerDetail;
