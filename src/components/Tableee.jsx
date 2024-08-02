/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useState } from "react";
import EditTimePage from "./EditTimePage";
import DeleteTimeBage from "./DeleteTimeBage";
import { VolumeUpOutlined } from "@mui/icons-material";
function Tableee({ time, volunteer, setReload, reload, token, resubmit }) {
  const [OpenEditPage, setOpenEditPage] = useState(false);
  const [OpenDeletePage, setOpenDeletePage] = useState(false);
  const [TimeforEdit, setTimeforEdit] = useState(null);
  const [TimeforDelete, setTimeforDelete] = useState(null);

  let durations = [];

  return (
    <>
      {" "}
      {time ? (
        <Box>
          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            Time: {time.from} - {time.to}
            <br />
            duration : {time.duration}
            <br />
            Admin : {time.adminName ? time.adminName : time.admin}
            <br />
            date : {time.day} / {time.month} / {time.year}
            <br />
            record date : {time.date}
            <br />
            <Button
              onClick={() => {
                setOpenEditPage(true);
                console.log(time._id);
                setTimeforEdit(time);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                // alert("are you sure you want to delete");
                setOpenDeletePage(true);
                setTimeforDelete(time);
              }}
            >
              delete
            </Button>
          </div>
          {OpenEditPage ? (
            <EditTimePage
              setReload={setReload}
              reload={reload}
              resubmit={resubmit}
              token={token}
              time={TimeforEdit}
              setOpenEditPage={setOpenEditPage}
            />
          ) : (
            <></>
          )}
          {OpenDeletePage ? (
            <DeleteTimeBage
              setReload={setReload}
              reload={reload}
              token={token}
              resubmit={resubmit}
              time={TimeforDelete}
              setOpenDeletePage={setOpenDeletePage}
            />
          ) : (
            <></>
          )}
        </Box>
      ) : (
        //   <br />
        // </div>
        <div
          style={{
            padding: "15px 10px",
            border: "1px solid black",
            margin: "10px 0",
          }}
        >
          Name: {volunteer.name ? volunteer.name : volunteer._id}
          <br />
          times:{" "}
          {volunteer.times.map((time, index) => {
            durations.push(time.duration);
            return (
              <Box key={index}>
                <div
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                  // key={index}
                >
                  Time: {time.from} - {time.to}
                  <br />
                  duration : {time.duration}
                  <br />
                  Admin : {time.adminName ? time.adminName : time.admin}
                  <br />
                  date : {time.day} / {time.month} / {time.year}
                  <br />
                  record date : {time.date}
                  <br />
                  <Button
                    onClick={() => {
                      setOpenEditPage(true);
                      console.log(time._id);
                      setTimeforEdit(time);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      // alert("are you sure you want to delete");
                      setOpenDeletePage(true);
                      setTimeforDelete(time);
                    }}
                  >
                    delete
                  </Button>
                </div>
                {OpenEditPage ? (
                  <EditTimePage
                    setReload={setReload}
                    reload={reload}
                    resubmit={resubmit}
                    token={token}
                    time={TimeforEdit}
                    setOpenEditPage={setOpenEditPage}
                  />
                ) : (
                  <></>
                )}
                {OpenDeletePage ? (
                  <DeleteTimeBage
                    setReload={setReload}
                    reload={reload}
                    token={token}
                    resubmit={resubmit}
                    time={TimeforDelete}
                    setOpenDeletePage={setOpenDeletePage}
                  />
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
          total : {volunteer.totalTImes}
          <br />
          days count : {volunteer.times.length}
        </div>
      )}
    </>

    // <div
    //   style={{
    //     padding: "15px 10px",
    //     border: "1px solid black",
    //     margin: "10px 0",
    //   }}
    // >

    //   Name: {volunteer.name ? volunteer.name : volunteer._id}
    //   <br />
    //   times:{" "}
    //   {volunteer.times.map((time, index) => {
    //     durations.push(time.duration);
    //     return (
    //       <Box key={index}>
    //         <div
    //           style={{
    //             border: "1px solid black",
    //             padding: "10px",
    //             margin: "10px 0",
    //           }}
    //           // key={index}
    //         >
    //           Time: {time.from} - {time.to}
    //           <br />
    //           duration : {time.duration}
    //           <br />
    //           Admin : {time.adminName ? time.adminName : time.admin}
    //           <br />
    //           date : {time.day} / {time.month} / {time.year}
    //           <br />
    //           record date : {time.date}
    //           <br />
    //           <Button
    //             onClick={() => {
    //               setOpenEditPage(true);
    //               console.log(time._id);
    //               setTimeforEdit(time);
    //             }}
    //           >
    //             Edit
    //           </Button>
    //           <Button
    //             onClick={() => {
    //               // alert("are you sure you want to delete");
    //               setOpenDeletePage(true);
    //               setTimeforDelete(time);
    //             }}
    //           >
    //             delete
    //           </Button>
    //         </div>
    //         {OpenEditPage ? (
    //           <EditTimePage
    //             setReload={setReload}
    //             reload={reload}
    //             resubmit={resubmit}
    //             token={token}
    //             time={TimeforEdit}
    //             setOpenEditPage={setOpenEditPage}
    //           />
    //         ) : (
    //           <></>
    //         )}
    //         {OpenDeletePage ? (
    //           <DeleteTimeBage
    //             setReload={setReload}
    //             reload={reload}
    //             token={token}
    //             resubmit={resubmit}
    //             time={TimeforDelete}
    //             setOpenDeletePage={setOpenDeletePage}
    //           />
    //         ) : (
    //           <></>
    //         )}
    //       </Box>
    //     );
    //   })}
    //   total : {calculateTotalDuration(durations)}
    //   <br />
    //   days count : {volunteer.times.length}
    // </div>
  );
}

export default Tableee;
