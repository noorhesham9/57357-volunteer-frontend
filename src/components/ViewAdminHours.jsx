import React, { useEffect, useState } from "react";
import axios from "axios";
function ViewAdminHours({ token }) {
  const [times, setTiems] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/getTimes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setTiems(response.data.times);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {times.map((time, index) => {
        return <div key={index}>{time}</div>;
      })}
    </div>
  );
}

export default ViewAdminHours;
