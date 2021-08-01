import React from "react";

import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import bg2 from "./bg2.jpg";
import bg4 from "./bg4.jpg";
import bg1 from "./bg1.jpg";
const useStyles = makeStyles({
  image: {
    width: "80%",
    miHeight: "300px",
  },
  section3: {
    minHeight: "50vh",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
function Section3() {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid container spacing={2} className={classes.section3}>
          <Grid item xs={12} sm={6}>
            <img src={bg2} className={classes.image}></img>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.center}>
            <Typography variant="h5" align="justify" style={{ fontWeight: "400" }}>
              Why Koppeln for your small business?
            </Typography>
            <Box my={2} mx={4}>
              <Typography variant="body 2" align="justify">
              To attract consumers in a crowded marketplace, your target audience needs to know why they should choose your business over someone else’s. This is where brands and sponserships come in to educate current and potential customers about your business and how it serves a need they have. It also deals with boosting sales, advertisements, public relations and promotions. The most fundamental importance of marketing to an organization is that it helps build reputation.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <img src={bg4} className={classes.image}></img>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.center}>
            <Typography variant="h5" align="justify" style={{ fontWeight: "400" }}>
              Why Koppeln as a social media influencer?
            </Typography>
            <Box my={2} mx={4}>
              <Typography variant="body 2" align="justify">
              Influencers build good networks. Their contacts engage in conversations or discussions on the various subjects the influencers post about, which can lead to more brand building. Not just that, they share or retweet these posts which means that your audience multiplies, increasing your visibility. Also, through them you can identify other influential people as well, who are a part of their audience. They can in turn influence their own audience’s opinion of your brand.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <img src={bg1} className={classes.image}></img>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.center}>
            <Typography variant="h5" align="justify" style={{ fontWeight: "400" }}>
              Why Koppeln as a brand representative?
            </Typography>
            <Box my={2} mx={4}>
              <Typography variant="body 2" align="justify">
              Think of a brand as a person, each individual has their own personality, way of dressing, communicating, their own values, friends, characteristics, and story to tell. It is this that makes up who we are and it is also these characteristics that make a brand. It helps you build trust with many different stakeholders. Allows you to be clear with your organization’s strategy and stay focused. Branding is more than a design on a product, a logo, or a strapline.  It is about all of these things and more, customer experience, brand promises, company philosophy, and culture.  It is all of the characteristics of what makes you, you.  Going back to the human example, every individual is different, unique, and has something different to offer.  It is this difference that sets us apart, how this is portrayed and marketed is what makes companies leaders in their industry.
              </Typography>
            </Box>
          </Grid>
          
        </Grid>
      </Container>

    </>
  );
}

export default Section3;
