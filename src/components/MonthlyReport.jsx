/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios, { all } from "axios";

import Tableee from "./Tableee";
function MonthlyReport({ year, month, token }) {
  const [allmonthlyVolunteer, setallmonthlyVolunteer] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (token) {
      axios
        .get(
          "volunteer/getmonthlyvolunteers",
          {
            params: {
              year: year,
              month: month,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setallmonthlyVolunteer(res.data.data.monthlyVolunteer);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reload, token]);

  // useEffect(() => {
  //   const arr = allmonthlyVolunteer;
  //   console.log(arr);
  //   setallmonthlyVolunteer([]);
  //   setallmonthlyVolunteer(arr);
  // }, [allmonthlyVolunteer]);
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <h1>
        Monthly Report for {month} / {year}
      </h1>
      <button
        onClick={() => {
          setallmonthlyVolunteer([]);
          setTimeout(() => {
            console.log(allmonthlyVolunteer);

            setallmonthlyVolunteer(
              allmonthlyVolunteer.sort((a, b) => {
                const timeA = a.totalTImes;
                const timeB = b.totalTImes;
                const AHours = +timeA.split(":")[0];
                const BHours = +timeB.split(":")[0];
                const AMinutes = +timeA.split(":")[1];
                const BMinutes = +timeB.split(":")[1];
                if (AHours > BHours) {
                  return -1;
                } else if (AHours < BHours) {
                  return 1;
                } else {
                  if (AMinutes > BMinutes) {
                    return -1;
                  }
                  if (AMinutes < BMinutes) {
                    return 1;
                  }
                  return 0;
                }
              })
            );
          }, 100);
          console.log(allmonthlyVolunteer);
        }}
      >
        sort by total
      </button>
      <button
        onClick={() => {
          setallmonthlyVolunteer([]);
          setTimeout(() => {
            setallmonthlyVolunteer(
              allmonthlyVolunteer.sort((a, b) => {
                const lengthA = a.times.length;
                const lengthB = b.times.length;

                if (lengthA > lengthB) {
                  return -1;
                }
                if (lengthA < lengthB) {
                  return 1;
                } else {
                  if (lengthA > lengthB) {
                    return -1;
                  }
                  if (lengthA < lengthB) {
                    return 1;
                  }
                  return 0;
                }
              })
            );
          }, 100);
        }}
      >
        sort by days counts
      </button>
      <button onClick={() => {}}> </button>
      {allmonthlyVolunteer.map((volunteer) => {
        return (
          // <div
          //   style={{
          //     border: "1px solid black",
          //     padding: "10px",
          //     margin: "10px 0",
          //   }}
          //   key={index}
          // >
          //   Name: {time.volunteerName ? time.volunteerName : time.volunteer}{" "}
          //   <br />
          //   Time: {time.from} - {time.to}
          //   <br />
          //   duration : {time.duration}
          //   <br />
          //   Admin : {time.adminName ? time.adminName : time.admin}
          //   <br />
          //   date : {time.day} / {time.month} / {time.year}
          //   <br />
          //   record date : {time.date}
          //   <Button
          //     onClick={() => {
          //       setOpenEditPage(true);
          //       console.log(time._id);
          //       setTimeforEdit(time);
          //     }}
          //   >
          //     Edit
          //   </Button>
          //   <Button
          //     onClick={() => {
          //       // alert("are you sure you want to delete");
          //       setOpenDeletePage(true);
          //       setTimeforDelete(time);
          //     }}
          //   >
          //     delete
          //   </Button>
          // </div>

          <Tableee
            token={token}
            reload={reload}
            setReload={setReload}
            key={volunteer._id}
            volunteer={volunteer}
          />
        );
      })}
      monthly volunteers counter : {allmonthlyVolunteer.length}
    </div>
  );
}

export default MonthlyReport;
