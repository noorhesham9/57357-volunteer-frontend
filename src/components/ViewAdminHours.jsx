import React, { useEffect, useState } from "react";
import axios from "axios";
function ViewAdminHours({ token }) {
  const [times, setTiems] = useState([]);

  useEffect(() => {
    if (token) {
      console.log("object");
      axios
        .get("/admin/getTimes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data.Alltimes.timeid);
          setTiems(response.data.data.Alltimes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return (
    <div>
      {times.map((time, index) => {
        return <div key={index}>{time.timeid}</div>;
      })}
    </div>
  );
}

export default ViewAdminHours;
