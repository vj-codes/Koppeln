import React from "react";
import {
  Accordion,
  makeStyles,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
  },
  brandList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    width: "450px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ["@media (max-width:850px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "200px",
    },
    // white-space: nowrap;
    // width: 100px;
    // overflow: hidden;
    // text-overflow: ellipsis;
  },
  logoutButton: {
    backgroundColor: "#ff0000",
    "&:hover": {
      backgroundColor: "#ed8366",
    },
  },
}));

function ProfileContent(props) {
  const classes = useStyles();

  return (
    <div>
      <Accordion style={{ margin: "5px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {props.data.title}
          </Typography>

          <Typography className={classes.secondaryHeading}>
            {props.data.information ? props.data.information : "N/A"}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <List className={classes.brandList}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Information"
                secondary={
                  props.data.information ? props.data.information : "N/A"
                }
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Price"
                secondary={
                  props.data.price || props.data.price == "0"
                    ? props.data.price
                    : "Not Provide"
                }
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="File Name"
                secondary={
                  props.data.filename ? props.data.filename : "Not Available"
                }
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Category"
                secondary={props.data.category}
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Availability"
                secondary={props.data.availability}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ProfileContent;
