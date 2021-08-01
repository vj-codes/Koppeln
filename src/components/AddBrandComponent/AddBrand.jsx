import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
  CircularProgress 
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import categories from "../../constants/categories";
import hashtags from "../../constants/hashtags";
import locations from "../../constants/location";
import { Fade } from "react-reveal";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),

      width: "25ch",
      flexGrow: 1,
    },
  },
  brandFormHeader: {
    textAlign: "center",
    marginTop: "35px",
    fontSize: "28px",
    ["@media (min-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      textAlign: "left",
      marginTop: "0px",

      marginLeft: "8%",
    },
  },
  TextField: {
    fullWidth: true,
  },
  brandForm: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // minWidth: '350px',
    width: "85%",
  },
  brandButton: {
    marginTop: "10px",
  },
}));

function AddBrand() {
  const classes = useStyles();

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/doc",
    "application/msword",
  ];

  const { currentUser } = useAuth();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [loading,setLoading] = useState(false);
  const [state, setState] = useState({
    title: "",
    category: "",
    hashtags: "",
    location: "",
    availability: "",
    price: "0",
    information: "",
  });

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (currentUser) {
      db.collection("accounts")
        .doc(currentUser.uid)
        .onSnapshot(function (doc) {
          const data = doc.data();
          setProfile(data);
        });
    }
  });

  function handleChangeFile(event) {
    const fileUpload = event.target.files[0];
    if (fileUpload && fileTypes.includes(fileUpload.type)) {
      setFile(event.target.files[0]);
    } else {
      alert("This file is not supported");

      setFile(null);
    }
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);

    if (currentUser) {
      setLoading(true)
      //   // If submittion successful without file
      if (!file) {
        db.collection("brands")
          .add(
            state,
            (state.uid = currentUser.uid),
            (state.fullname = profile.fullname)
          )
          .then(() => {
          //   db.collection("accounts")
          //     .doc(currentUser.uid)
          //     .update({
          //       serviceId: profile.serviceId
          //         ? [...profile.serviceId, docRef.id]
          //         : [docRef.id],
          //     })
          //     .then(() => {
          //       alert("Form submitted without file successfully");
          setLoading(false);
                history.push("/profile");
          //     });
          });
      }
      // If submittion successful with file
      else {
        //     setLoading(
        //       <div className="inputGroup progressBar">
        //         <Progress animated color="info" value={100}>
        //           Uploading...
        //         </Progress>
        //       </div>
        //     );
        await storage.ref(`/brands/${file.name}`).put(file);

        storage
          .ref("brands")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("brands")
              .add(
                state,
                (state.url = url),
                (state.filename = file.name),
                (state.date = new Date()),
                (state.uid = currentUser.uid)
              )
              .then(
                function (docRef) {
                  console.log("Document written with ID: ", docRef);
          setLoading(false);

                }

                //             () => {

                //             db.collection("accounts").doc(currentUser.uid).set({
                //               serviceId:
                //             });

                //             alert("Form submitted with file successfully");
                //             history.push('/profile')
                //             // console.log("data successfully uploaded")
                // //             setURL(""),
                // //               setFile(null),

                //           }
              );
          });
      }
    } else {
      console.log("no user found");
    }
  };

  return (
    <Fade bottom>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography
              component="h2"
              className={classes.brandFormHeader}
              gutterBottom
            >
              Add Brand
            </Typography>
          </Grid>
          <Grid item sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ width: "85%" }}
              label="Title"
              placeholder="Title"
              variant="outlined"
              name="title"
              type="text"
              value={state.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-category-native-simple">
                Category
              </InputLabel>
              <Select
                native
                value={state.category}
                onChange={handleChange}
                label="Category"
                inputProps={{
                  name: "category",
                  id: "outlined-category-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-category-native-simple">
                Hashtag
              </InputLabel>
              <Select
                native
                value={state.hashtags}
                onChange={handleChange}
                label="Hashtag"
                inputProps={{
                  name: "#Hashtag",
                  id: "outlined-category-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {hashtags.map((hashtag, i) => (
                  <option key={i} value={hashtag}>
                    {hashtag}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-location-native-simple">
                Location
              </InputLabel>
              <Select
                native
                value={state.location}
                onChange={handleChange}
                label="Location"
                inputProps={{
                  name: "location",
                  id: "outlined-location-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-availability-native-simple">
                Availability
              </InputLabel>
              <Select
                native
                value={state.availability}
                onChange={handleChange}
                label="Availability"
                inputProps={{
                  name: "availability",
                  id: "outlined-availability-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Online"}>Online</option>
                <option value={"Offline"}>Offline</option>
                <option value={"Both"}>Both</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-secondary"
              label="Approx Price"
              placeholder="Price"
              type="Number"
              style={{ width: "85%" }}
              variant="outlined"
              color="secondary"
              value={state.price}
              name="price"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-full-width"
              placeholder="Placeholder"
              helperText="Only .pdf .doc .word files are supported"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              label="Upload File"
              type="file"
              style={{ width: "85%" }}
              color="secondary"
              value={state.file}
              name="file"
              onChange={handleChangeFile}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Additional Information"
              // margin="normal"
              label="Additional Information"
              multiline
              rows={4}
              variant="outlined"
              name="information"
              value={state.information}
              onChange={handleChange}
              style={{ width: "90%" }}
            />
          </Grid>
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              style={{ marginBottom: "35px", width: "50%" }}
              type="submit"
              color="primary"
              disabled={loading}
            >
              Add Brand 
            </Button>
          </Grid>

          <Grid item sm={3}></Grid>
          <Grid item style={{margin: 'auto'}}>


      {  loading ?  <CircularProgress disableShrink /> : ""}
          </Grid>

        </Grid>
      </form>
    </Fade>
  );
}

export default AddBrand;
