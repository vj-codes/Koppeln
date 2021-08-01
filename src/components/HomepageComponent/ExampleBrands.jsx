import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ExampleBrand from "./exampleBrandComponents/ExampleBrand";

const localdb = [
  {
    title: "",
    content:
      "",
  },
];
const useStyles = makeStyles({
  root: {
    minHeight: "10vh",
  },
});
export default function ExampleBrands() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} align="center">
      <Grid xs={12}>
        <Box m={2}>
          <Typography m={2} variant="h4">
            Are you a influencer or a small business? Find brands near you!
          </Typography>
          <Typography m={2} variant="h6">
            Brand sponsorships can take your online presence to the moon 🚀
          </Typography>
        </Box>
        <Grid xs={12} container spacing={10} justify="center">
          {localdb.map((elem, i) => (
            <Grid xs={10} key={i} item lg={5} justify="left" align="left">
              <Box my={4}>
                <ExampleBrand title={elem.title} content={elem.content} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
