import { Box } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
function DeleteTimeBage({
  token,
  time,
  setOpenDeletePage,
  setReload,
  reload,
  resubmit,
}) {
  console.log(resubmit);
  console.log(reload);

  const handleDeleteTime = async () => {
    try {
      await axios.delete(`times/deleteTime/${time.timeid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenDeletePage(false);
      if (reload != undefined) {
        console.log("reload");
        setReload(!reload);
      } else {
        resubmit(time.volunteerName);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          delete Time
        </div>
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          delete record from volunteer :{" "}
          {time.volunteerName ? time.volunteerName : "there is no name"}
        </div>
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          time :{time.from} - {time.to}
        </div>

        <div style={{ display: "inline-block", fontSize: "20px" }}>
          this record is created at : {time.date}
        </div>
        <div style={{ display: "inline-block", fontSize: "20px" }}>
          this record is created by : {time.adminName}
        </div>
        <div
          style={{
            marginTop: "30px",
            fontSize: "20px",
            border: "1px solid blue",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            // backgroundColor: "red",
          }}
        >
          are you sure you want to delete this record ?
          <div
            style={{
              marginTop: "12px",
            }}
          >
            <Button
              onClick={handleDeleteTime}
              sx={{
                color: "white",
                marginRight: "10px",
                border: "1px solid blue",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setOpenDeletePage(false);
              }}
              sx={{
                color: "white",
                border: "1px solid blue",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default DeleteTimeBage;
