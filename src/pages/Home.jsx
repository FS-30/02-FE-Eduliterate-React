import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import image1Img from "../assets/img/image1.png";
import image2Img from "../assets/img/image2.png";
import ficon1 from "../assets/img/ficon1.png";
import ficon2 from "../assets/img/ficon2.png";
import ficon3 from "../assets/img/ficon3.png";
import avatarsImg from "../assets/img/avatars.png";

const HomePage = () => {
  return (
    <div>
      <div className="row">
        <div className="col text-center">
          <img src={image1Img} className="image-center mt-3" alt="Image 1" />
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h1>
            Eduliterate: Empowering Minds through Literacy in Indonesia!
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center text-secondary">
          <p className="sub-heading">
            Discover the World of Learning Online! Join us to Expand Your
            Literacy, Sharpen Your Skills, and Cultivate Lasting Confidence,
            All While Engaging in a Dynamic Learning Community.
          </p>
        </div>
      </div>
      <div className="full-width-bg">
        <div className="row mt-5 bg-custom-secondary">
          <Row>
            <Col sm={8} style={{paddingLeft:'50px'}}>
              <h1 className="heading2">WHAT WE DO?</h1>
              <p className="text-secondary">
                At Eduliterate, we're passionately committed to fostering your
                educational and personal growth through literacy. We provide a
                rich variety of literacy courses and resources, immersive
                learning environments, a supportive community of fellow
                learners, and personalized learning experiences. Our dedication
                to continuous improvement ensures you gain the finest literacy
                education, propelling you toward knowledge, skill development,
                and personal transformation. Come join us today and embark on a
                journey into the world of literacy possibilities with
                Eduliterate.
              </p>
            </Col>
            <Col sm={4}>
              <img
                className="img-fluid img-fullscreen"
                src={image2Img}
                alt="Image 2"
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="row m-5">
        <div className="col text-center">
          <h1 className="heading3">WHY CHOOSE US?</h1>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <img className="img-ficon" src={ficon1} alt="Icon 1" />
          <h4>Comprehensive Catalog</h4>
          <p>
            Explore a rich collection of E-books, from foundational literacy
            skills to advanced subjects
          </p>
        </div>
        <div className="col">
          <img className="img-ficon" src={ficon2} alt="Icon 2" />
          <h4>Subscription Benefit</h4>
          <p>
            Unlock access to read all books by subscribing to our platform and
            broadening your literary horizons
          </p>
        </div>
        <div className="col">
          <img className="img-ficon" src={ficon3} alt="Icon 3" />
          <h4>Accessible Learning Tools</h4>
          <p>
            We offer text-to-speech features to enhance accessibility and
            cater to diverse learning needs
          </p>
        </div>
      </div>
      <div className="container-fluid bottom-section py-5">
        <div className="row">
          <div className="col text-center pt-4 pb-4">
            <h4 className="mb-3">
              Join us today and unlock a world of knowledge at your
              fingertips!
            </h4>
            <p className="mb-5">
              Support our mission to spread knowledge and empower minds by
              subscribing to our platform and enjoy unlimited access to a
              wealth of books and educational resources
            </p>
            <div className="pt-5">
              <a
                href="/payment"
                className="btn button-orange text-white"
                id="subscribe"
              >
                SUBSCRIBE
              </a>
            </div>
            <p className="mt-3" style={{ fontSize: "10px" }}>
              Make sure you are already logged in.
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
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
    </div>
  );
};

export default HomePage;
