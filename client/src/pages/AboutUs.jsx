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
        <a href="">Portfolio</a>
        <a href="">LinkedIn</a>
      </div>
      <div className="about-us-card">
        <h2>Kevin Hunt</h2>
        <a href="https://github.com/kvnhunt">GitHub</a>
        <a href="">Portfolio</a>
        <a href="">LinkedIn</a>
      </div>
      <div className="about-us-card">
        <h2>Shawki Haifa</h2>
        <a href="https://github.com/Shawki45/">GitHub</a>
        <a href="">Portfolio</a>
        <a href="">LinkedIn</a>
      </div>
      <div className="about-us-card">
        <h2>Daniel Desta</h2>
        <a href="https://github.com/DDesta25/">GitHub</a>
        <a href="">Portfolio</a>
        <a href="">LinkedIn</a>
      </div>
      </div>
    </>
  );
};

export default AboutUs;