import { createMuiTheme } from "@material-ui/core";
import { orange, purple, green, blue } from "@material-ui/core/colors";
/*
#5F9595
#FFB7A2
#AAB8BB
*/

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
  palette: {
    primary: {
      main: "#d63230",
    },
    secondary: {
      main: "#1c77c3",
    },
    buttons: {
      main: "#38b000",
    },
  },
});

export default theme;
