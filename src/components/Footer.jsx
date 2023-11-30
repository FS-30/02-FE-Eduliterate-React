import React from "react";
import avatarsImg from "../assets/img/avatars.png";

export default function Footer() {
  return (
      <div className="container-fluid footer pt-5 px-5">
        <div className="row mb-5">
          <div className="col-auto">
            <img className="img-fluid" src={avatarsImg} alt="Avatars" />
          </div>
          <div className="col-lg-6 mt-2">
            <p className="text-white" style={{ fontWeight: "100" }}>
              Eduliterate is an innovative online platform dedicated to
              promoting literacy and fostering a culture of continuous
              learning. Our mission is to empower individuals through
              education, providing a diverse array of literacy-focused
              courses, resources, and a supportive learning community.
            </p>
          </div>
          <div className="col-lg-auto text-white ms-auto me-5">
            <div className="social-media-container">
              <box-icon name="github" type="logo" color="#ffffff"></box-icon>
              <a
                className="social-media"
                href="https://github.com/FS-30/01-Front-End-Website"
              >
                Github
              </a>
            </div>
          </div>
        </div>
        <hr
          style={{ backgroundColor: "white", height: "2px", border: "none" }}
        />
        <div className="row">
          <div className="col text-left text-white">
            <p className="footer">
              © 2023 Fullstack Development 30. All rights reserved.
            </p>
          </div>
        </div>
      </div>
  );
}
