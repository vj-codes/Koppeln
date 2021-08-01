import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "./defaultBrandCardImage.png";

import PersonIcon from "@material-ui/icons/Person";
import RoomIcon from "@material-ui/icons/Room";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    position: "relative",
    height: 450,
    margin: "30px",
  },
  media: {
    height: 140,
  },
  bottom: {
    position: "absolute",
    bottom: "5px",
  },
  useIcons: {
    alignItems: "center",
    display: "flex",
  },
});

function BrandCard({ data }) {
  const classes = useStyles();
  return (
    <Grid xs={12} sm={6} lg={4}>
      <Card className={classes.root} raised>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={defaultImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Box mb={2} fontWeight="600" color="text.primary">
              <Typography
                variant="body1"
                component="p"
                className={classes.useIcons}
              >
                <PersonIcon /> &nbsp; {data?.fullname} &nbsp;&nbsp;&nbsp;
                <LocalOfferOutlinedIcon /> {data?.price} (approx)
              </Typography>
              <Typography
                className={classes.useIcons}
                variant="body1"
                color="textSecondary"
                component="p"
              >
                <RoomIcon /> {data?.availability} / {data?.location}
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" component="p">
              {data.information.substr(0, 200)}
              {data.information.length > 200 ? "..." : ""}
            </Typography>
            <Box my={2}>
              <Typography
                variant="body1"
                component="p"
                className={classes.useIcons}
              >
                <CategoryOutlinedIcon /> &nbsp;
                {data?.category?.toUpperCase()}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>

        <CardActions className={classes.bottom}>
          <Button
            to={`/contact/${data.uid}/${data.title}`}
            component={Link}
            size="medium"
            color="secondary"
          >
            Contact Us
          </Button>
          <Button size="medium" color="secondary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default BrandCard;
