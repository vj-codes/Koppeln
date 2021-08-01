import React, { useEffect } from "react";
import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  makeStyles,
  FormGroup,
  Button,
  Switch,
  AppBar,
  Toolbar,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AccountCircle, MenuRounded } from "@material-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
}));
function Navbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [auth, setAuth] = React.useState(currentUser ? true : false);
  useEffect(() => {
    setAuth(currentUser ? true : false);
  }, [currentUser]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const commonLinks = [
    {
      title: "Find A Brand",
      link: "/dashboard",
    },

  ];
  const authLinks = [
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Logout",
      link: "/",
      onclick: logout,
    },
  ];
  const unauthLinks = [
    {
      title: "Signup",
      link: "/signup",
    },
  ];

  const links = [...commonLinks, ...(auth ? authLinks : unauthLinks)];
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/"
            style={{ textDecoration: "null" }}
          >
            Koppeln
          </Typography>

          {!matches && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuRounded />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {links.map((elem, i) => (
                  <MenuItem
                    key={i}
                    component={Link}
                    to={elem.link}
                    onClick={elem.onclick ? elem.onclick : ""}
                  >
                    {elem.title}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
          {matches &&
            links.map((elem, i) => (
              <Button
                key={i}
                className={classes.menuButton}
                component={Link}
                onClick={elem.onclick ? elem.onclick : ""}
                to={elem.link}
              >
                {elem.title}
              </Button>
            ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
