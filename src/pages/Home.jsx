import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Footer from "../components/Footer";

import image1Img from "../assets/img/image1.png";
import image2Img from "../assets/img/image2.png";
import ficon1 from "../assets/img/ficon1.png";
import ficon2 from "../assets/img/ficon2.png";
import ficon3 from "../assets/img/ficon3.png";

const HomePage = () => {
  const isSubscribed = localStorage.getItem('is_subscribed') === 'true';
  const isLoggedIn = localStorage.getItem('isloggedin') !== null;
  const isButtonDisabled = isSubscribed || !isLoggedIn;

  return (
    <>
      <Helmet>
        <title>Eduliterate — Empowering Minds through Literacy</title>
        <meta name="description" content="Eduliterate is an online platform dedicated to promoting literacy in Indonesia. Browse free and premium e-books and audio books." />
      </Helmet>

      {/* ── Hero ── */}
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <img src={image1Img} className="image-center mt-3" alt="Students reading and learning together" />
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <h1>Eduliterate: Empowering Minds through Literacy in Indonesia!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col text-center text-secondary">
            <p className="sub-heading">
              Discover the World of Learning Online! Join us to Expand Your Literacy,
              Sharpen Your Skills, and Cultivate Lasting Confidence, All While Engaging
              in a Dynamic Learning Community.
            </p>
          </div>
        </div>
      </div>

      {/* ── What We Do ── */}
      <div className="full-width-bg">
        <Row className="bg-custom-secondary align-items-center">
          <Col md={8}>
            <h2 className="heading2">WHAT WE DO?</h2>
            <p className="text-secondary">
              At Eduliterate, we&apos;re passionately committed to fostering your educational
              and personal growth through literacy. We provide a rich variety of literacy
              courses and resources, immersive learning environments, a supportive community
              of fellow learners, and personalized learning experiences. Our dedication to
              continuous improvement ensures you gain the finest literacy education, propelling
              you toward knowledge, skill development, and personal transformation. Come join
              us today and embark on a journey into the world of literacy possibilities with
              Eduliterate.
            </p>
          </Col>
          <Col md={4}>
            <img
              className="img-fluid img-fullscreen"
              src={image2Img}
              alt="Library with books"
            />
          </Col>
        </Row>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="container">
        <div className="row" style={{ marginTop: '3rem' }}>
          <div className="col text-center">
            <h2 className="heading3">WHY CHOOSE US?</h2>
          </div>
        </div>
        <div className="row text-center" style={{ marginBottom: '1rem' }}>
          <div className="col">
            <img className="img-ficon" src={ficon1} alt="Comprehensive catalog icon" />
            <h3>Comprehensive Catalog</h3>
            <p>
              Explore a rich collection of E-books, from foundational literacy
              skills to advanced subjects.
            </p>
          </div>
          <div className="col">
            <img className="img-ficon" src={ficon2} alt="Subscription benefit icon" />
            <h3>Subscription Benefit</h3>
            <p>
              Unlock access to read all books by subscribing to our platform and
              broadening your literary horizons.
            </p>
          </div>
          <div className="col">
            <img className="img-ficon" src={ficon3} alt="Accessibility tools icon" />
            <h3>Accessible Learning Tools</h3>
            <p>
              We offer text-to-speech features to enhance accessibility and
              cater to diverse learning needs.
            </p>
          </div>
        </div>
      </div>

      {/* ── Subscribe CTA ── */}
      <div className="container-fluid bottom-section py-5">
        <div className="row">
          <div className="col text-center pt-4 pb-4">
            <h4 className="mb-3">
              Join us today and unlock a world of knowledge at your fingertips!
            </h4>
            <p className="mb-4">
              Support our mission to spread knowledge and empower minds by subscribing
              to our platform and enjoy unlimited access to a wealth of books and
              educational resources.
            </p>
            <div className="pt-3">
              <Link
                to="/payment"
                className={`button-orange text-white text-decoration-none ${isButtonDisabled ? 'disabled-button' : ''}`}
                id="subscribe"
                aria-disabled={isButtonDisabled}
                tabIndex={isButtonDisabled ? -1 : 0}
              >
                SUBSCRIBE
              </Link>
            </div>
            <p className="mt-3" style={{ fontSize: "0.8rem" }}>
              {!isLoggedIn
                ? "Please log in first to subscribe."
                : isSubscribed
                ? "You are already subscribed!"
                : "Click the button above to subscribe."}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
