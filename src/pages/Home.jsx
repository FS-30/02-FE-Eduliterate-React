import React from "react";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from "../components/Footer";

import image1Img from "../assets/img/image1.png";
import image2Img from "../assets/img/image2.png";
import ficon1 from "../assets/img/ficon1.png";
import ficon2 from "../assets/img/ficon2.png";
import ficon3 from "../assets/img/ficon3.png";

const HomePage = () => {

  const isSubscribed = localStorage.getItem('is_subscribed') === 'true';
  const isLoggedIn = localStorage.getItem('isloggedin') === null;
  
  return (
    <>
      <Helmet>
        <title>Eduliterate</title>
        <link rel="icon" href="src/assets/img/logo.png" />
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <img src={image1Img} className="image-center mt-3" alt="Image 1" />
          </div>
        </div>
      </div>
      <div className="container">
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
      </div>
      <div className="full-width-bg">
        <div className="row mt-5 bg-custom-secondary">
          <Row>
            <Col sm={8} style={{paddingLeft:'50px'}}>
              <h1 className="heading2">WHAT WE DO?</h1>
              <p className="text-secondary">
                At Eduliterate, we&apos;re passionately committed to fostering your
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
      <div className="container">
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
                className={`btn button-orange text-white ${
                  (isSubscribed || isLoggedIn) ? 'disabled-button' : ''
                }`}
                id="subscribe"
                style={{
                  pointerEvents: (isSubscribed || isLoggedIn) ? 'none' : 'auto',
                }}
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
      <Footer/>
    </>
  );
};

export default HomePage;
