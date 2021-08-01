import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function ExampleBrand({ title, content }) {
  return (
    <Grid justify="center">
      <Typography variant="body1" style={{ fontWeight: "700" }}>
        {title}
      </Typography>
      <Box my={2}>
        <Typography variant="body2" align="justify">
          {content}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ExampleBrand;
