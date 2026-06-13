import React from "react";
import avatarsImg from "../assets/img/avatars.png";

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="white"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 6.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.922.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="container-fluid footer pt-5 px-5">
      <div className="row mb-5">
        <div className="col-auto">
          <img className="footer-avatars" src={avatarsImg} alt="Team avatars" />
        </div>
        <div className="col-lg-6 mt-2">
          <p className="text-white" style={{ fontWeight: 300 }}>
            Eduliterate is an innovative online platform dedicated to promoting
            literacy and fostering a culture of continuous learning. Our mission
            is to empower individuals through education, providing a diverse
            array of literacy-focused courses, resources, and a supportive
            learning community.
          </p>
        </div>
        <div className="col-lg-auto text-white ms-auto me-5 mt-2">
          <div className="social-media-container">
            <GitHubIcon />
            <a
              className="social-media"
              href="https://github.com/FS-30/02-FE-Eduliterate-React"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <hr style={{ backgroundColor: "white", height: "2px", border: "none" }} />
      <div className="row">
        <div className="col text-start text-white">
          <p className="footer-copyright">
            &copy; {year} Fullstack Development 30. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
