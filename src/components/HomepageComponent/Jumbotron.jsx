import {
  Button,
  Grid,
  Icon,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import background from "./bg3.jpg";
const useStyles = makeStyles({
  root: {
    height: "100vh",

    backgroundImage: `linear-gradient(rgba(255, 0, 0, 0.2),rgba(0, 0, 0, 0.4)) ,url(${background})`,
    backdropFilter: "blur",
    backgroundSize: "cover",
  },

  innerContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    marginTop: "50px",
    marginBottom: "30px",
    color: "#fff",
    fontWeight: "700",
  },
});

const Jumbotron = () => {
  const classes = useStyles();

  return (
    <Grid container xs={12} justify="center" className={classes.root}>
      <Grid item xs={10} md={6} className={classes.innerContainer}>
        <IconButton color="primary">
          <PlayCircleFilledRoundedIcon
            style={{ width: "100px", height: "100px" }}
          />
        </IconButton>

        <Typography variant="h4" className={classes.heading} align="center">
          Find Influencers From Everywhere
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
        >
          Find Brands
        </Button>
      </Grid>
    </Grid>
  );
};

export default Jumbotron;
