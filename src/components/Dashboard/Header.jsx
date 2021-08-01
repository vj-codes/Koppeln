import { Container, Grid, makeStyles, TextField } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import clx from "classnames";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    marginBottom: "30px",
  },
  remStyle: {
    border: "none",
    boxShadow: "none",
    outline: "none",
    display: "flex",
    alignItems: "center",
  },
  locationbar: {
    borderRight: "1px solid gray",
    paddingRight: "10px",
  },
  searchBox: {
    padding: "8px",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
});
function Header({ countries, categories,hashtags, setCurrentBrands, allbrands }) {
  const classes = useStyles();
  const [searched, setSearched] = useState();
  const [currBrands, setCurrBrand] = useState(allbrands);
  const requestSearch = (searchedVal) => {
    const filteredRows = allbrands.filter((row) => {
      return (
        row.information
          .toLowerCase()
          .includes(searchedVal ? searchedVal.toLowerCase() : "") ||
        row.title
          .toLowerCase()
          .includes(searchedVal ? searchedVal.toLowerCase() : "")
      );
    });
    setCurrentBrands(filteredRows);
  };

  const handleLocationChange = (name) => {
    const filteredRows = allbrands.filter((row) => {
      return row.location
        .toLowerCase()
        .includes(name ? name.toLowerCase() : "");
    });
    setCurrentBrands(filteredRows);
  };

  const handleCategoryChange = (name) => {
    const filteredRows = allbrands.filter((row) => {
      return row.category
        .toLowerCase()
        .includes(name ? name.toLowerCase() : "");
    });
    setCurrentBrands(filteredRows);
  };

  const handleHashtagChange = (name) => {
    const filteredRows = allbrands.filter((row) => {
      return row.category
        .toLowerCase()
        .includes(name ? name.toLowerCase() : "");
    });
    setCurrentBrands(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  return (
    <Container>
      <Grid
        container
        justify="center"
        align="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid xs={12} md={8} container className={classes.searchBox}>
          <Grid xs={5} md={3}>
            <Autocomplete
              id="combo-box-demo"
              options={countries}
              className={clx(classes.remStyle, classes.locationbar)}
              autoSelect
              onChange={(e) => handleLocationChange(e.target.innerText)}
              renderInput={(params) => (
                <>
                  <LocationOnIcon />
                  <TextField
                    className={classes.remStyle}
                    {...params}
                    placeholder="Location"
                    margin="dense"
                  />
                </>
              )}
            />
          </Grid>
          <Grid xs={7} md={9}>
            <SearchBar
              className={classes.remStyle}
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              placeholder="Search a Brand"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        align="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid xs={6} md={2}>
          <Autocomplete
            id="combo-box-demo"
            onChange={(e) => handleCategoryChange(e.target.innerText)}
            options={categories}
            autoSelect
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                variant="outlined"
                margin="dense"
              />
            )}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <Autocomplete
            id="combo-box-demo"
            onChange={(e) => handleHashtagChange(e.target.innerText)}
            options={hashtags}
            autoSelect
            renderInput={(params) => (
              <TextField
                {...params}
                label="#Hashtags"
                variant="outlined"
                margin="dense"
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
