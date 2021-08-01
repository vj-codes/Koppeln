import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import clx from "classnames";
const useStyles = makeStyles({
  root: {
    marginTop: "100px",
    flexDirection: "column",
    minHeight: "59vh",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const { resetPassword } = useAuth();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      window.alert("Check your inbox");
    } catch {
      window.alert("failed to reset password");
    }
  };

  return (
    <>
      <Grid style={{ marginTop: "100px", marginLeft: "50px" }}>
        <Typography variant="h4">Forgot Password</Typography>
      </Grid>
      <Grid className={clx(classes.root, classes.center)}>
        <Grid align="center" justify="center">
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className={classes.center}
          >
            <Box mx={2}>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </Box>
            <Button variant="outlined" color="primary" onclick={handleSubmit}>
              Reset Password
            </Button>
          </form>
        </Grid>
        <Grid justify="center" align="center">
          <Button
            onClick={() => history.push("/login")}
            variant="outlined"
            size="large"
            color="secondary"
            style={{ margin: "50px" }}
          >
            Go to Login Page
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPassword;
