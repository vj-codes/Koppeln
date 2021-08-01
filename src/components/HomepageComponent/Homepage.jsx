import React from "react";
import { Link } from "react-router-dom";
import ExampleBrands from "./ExampleBrands";
import Jumbotron from "./Jumbotron";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Fade from "react-reveal/Fade";

function Homepage() {
  return (
    <div>
      <Fade bottom>
        <Jumbotron />
        <ExampleBrands />
        <Section3 />
        <Section4 />
      </Fade>
    </div>
  );
}

export default Homepage;
