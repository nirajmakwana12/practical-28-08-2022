import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const FristPageStyle = styled.div({
  display: "flex",
  backgroundColor: "lightblue",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  "& .MainHeading": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .Inputs": {
    "& > div": {
      margin: "10px 0",
    },
  },
});

const FristPage = () => {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    date: "",
  });
  const [alretPOP, setAlertPOP] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");
  const dataStore = (e) => {
    const localdata = localStorage.getItem("UserData")
      ? localStorage.getItem("UserData")
      : [];
    const parseData = JSON.parse(localdata);
    let add = parseData.concat(UserData);
    console.log(UserData, "---< state");
    const find = parseData.find((item) => item.email === UserData.email);
    if (
      UserData.name !== "" &&
      UserData.email !== "" &&
      UserData.lastName !== "" &&
      UserData.date !== ""
    ) {
      if (
        UserData.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        if (find) {
          alert("email alredy exit");
        } else {
          setAlertmsg("Please wait");
          setAlertPOP(true);
          localStorage.setItem("UserData", JSON.stringify(add));
          setTimeout(() => {
            setAlertPOP(false);
            navigate("/2");
          }, 3000);
        }
      }
    }
  };

  return (
    <FristPageStyle>
      <Snackbar
        open={alretPOP}
        autoHideDuration={6000}
        onClose={() => setAlertPOP(false)}
        message={`${alertmsg}`}
      />

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="MainHeading">Enter Your Date Here</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dataStore();
              }}
              className="Inputs"
            >
              <div>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  value={UserData.name}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  value={UserData.lastName}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  value={UserData.email}
                  required
                  type="email"
                  fullWidth
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <TextField
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      date: moment(e.target.value).format("MM/DD/YYYY"),
                    }))
                  }
                  fullWidth
                  type="datetime-local"
                  required
                  variant="outlined"
                />
              </div>
              <div>
                <Button fullWidth variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Box>
    </FristPageStyle>
  );
};
export default FristPage;
