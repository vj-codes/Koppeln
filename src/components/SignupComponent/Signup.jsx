import {
  Typography,
  Grid,
  Box,
  CssBaseline,
  TextField,
  Button,
  Avatar,
  Paper,
  makeStyles,
  Icon,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import googleLogo from "../../assets/googleLogo.png";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import background from "./bg3.jpg";

// contexts
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
  },
  image: {
    backgroundImage: "url(${background})",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "15px",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
  },
}));

function Signup() {
  const classes = useStyles();

  // routers
  const history = useHistory();

  // fields defined
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [brandsProvider, setBrandsProvider] = useState(false);

  // auth contexts callings
  const { signup, signupWithGoogle } = useAuth();

  // Form submition
  // Form Submition with Email and Password
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, fullname, brandsProvider);
      history.push("/profile");
    } catch {
      window.alert("Signup Failed");
    }
  };

  // Form submition with google login
  const handleSubmitWithGoogle = async (e) => {
    e.preventDefault();

    try {
      await signupWithGoogle();
      history.push("/profile");
    } catch {
      window.alert("Signup with google failed");
    }
  };

  return (
    <div style={{ marginTop: "70px", marginBottom: "10px" }}>
      <Fade>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form
                className={classes.form}
                onSubmit={handleSignupSubmit}
                noValidate
              >
                <TextField
                  autoComplete="fname"
                  name="fullname"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  onChange={(e) => setFullname(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setBrandsProvider(e.target.checked)}
                    />
                  }
                  label="I am representing a brand"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
              <Box mt={5}>
                <Button
                  variant="outlined"
                  color="#fff"
                  onClick={handleSubmitWithGoogle}
                  startIcon={
                    <Icon>
                      <img
                        src={googleLogo}
                        style={{ height: "100%", marginBottom: "10px" }}
                      />
                    </Icon>
                  }
                >
                  Continue With Google
                </Button>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Fade>
    </div>
  );
}

export default Signup;
