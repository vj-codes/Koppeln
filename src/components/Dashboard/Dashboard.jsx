import React, { useEffect, useState } from "react";
import Header from "./Header";
import countries from "../../constants/location";
import categories from "../../constants/categories";
import hashtags from "../../constants/hashtags";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import BrandCard from "./BrandCard";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Fade from "react-reveal/Fade";

function Dashboard() {
  const { currentUser } = useAuth();
  const [brands, setBrands] = useState([]);
  const [currentBrands, setCurrentBrands] = useState([]);

  useEffect(() => {
    db.collection("brands")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data, "data");
        setBrands(data);
        setCurrentBrands(data);
      });
  }, []);

  return (
    <div style={{ marginTop: "90px" }}>
      <Fade>
        <Header
          countries={countries}
          allbrands={brands}
          setCurrentBrands={setCurrentBrands}
          categories={categories}
          hashtags={hashtags}
        />
      </Fade>
      <Fade bottom>
        <Container>
          <Grid container justify="center">
            {currentBrands.map((data, i) => {
              return <BrandCard key={i} data={data} />;
            })}
          </Grid>
        </Container>
      </Fade>
    </div>
  );
}

export default Dashboard;
