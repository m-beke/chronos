import React from 'react';
import "../styles/aboutus.css";

function AboutUs() {
  return (
    <>
      <div className="about-us">
        <h2 className="about-us-heading">About Us</h2>
      </div>
      <div className='card-display'>
      <div className="about-us-card">
        <h2>Matthew Beke</h2>
        <a href="https://github.com/m-beke">GitHub</a>
        <a href="https://mbeke.netlify.app/">Portfolio</a>
        <a href="https://www.linkedin.com/in/matt-beke-a3679740/">LinkedIn</a>
      </div>
      <div className="about-us-card">
        <h2>Kevin Hunt</h2>
        <a href="https://github.com/kvnhunt">GitHub</a>
        <a href="https://kvnhunt.netlify.app/">Portfolio</a>
        <a href="http://www.linkedin.com/in/kevin-hunt-6752ab2ab">LinkedIn</a>
      </div>
      <div className="about-us-card">
        <h2>Shawki Haifa</h2>
        <a href="https://github.com/Shawki45/">GitHub</a>
        <a href="https://guileless-choux-0adb76.netlify.app/">Portfolio</a>
        <a href="https://www.linkedin.com/in/shawki-haifa-ab02b32ab/">LinkedIn</a>
      </div>
      <div className="about-us-card">
        <h2>Daniel Desta</h2>
        <a href="https://github.com/DDesta25/">GitHub</a>
        <a href="https://destadanielportfolio.netlify.app/">Portfolio</a>
        <a href="http://www.linkedin.com/in/daniel-desta-4117b2212">LinkedIn</a>
      </div>
      </div>
    </>
  );
};

export default AboutUs;