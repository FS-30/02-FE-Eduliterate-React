import React, { useState } from "react";
import { Modal, Collapse } from "react-bootstrap";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "bootstrap/dist/css/bootstrap.min.css";

import paymentImg from "../assets/img/payment.png";
import arrowImg from "../assets/img/arrow.png";
import bankBcaImg from "../assets/img/bank-bca.png";
import bankBriImg from "../assets/img/bank-bri.png";
import bankMandiriImg from "../assets/img/bank-mandiri.png";
import loadingImg from "../assets/img/loading.gif";
import qrCodeImg from "../assets/img/qr-code.png";
import transfer1Img from "../assets/img/transfer1.png";
import wallet1Img from "../assets/img/wallet1.png";

export default function Payment() {
  const [openPaymentList, setOpenPaymentList] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitProofModal, setShowSubmitProofModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleCloseModalPayment = () => setShowModal(false);
  const handleShowModalPayment = () => setShowModal(true);
  const handleCloseSubmitProofModal = () => setShowSubmitProofModal(false);

  const handleProofUploadChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      const reader = new FileReader();

      reader.onload = function (event) {
        setPreviewImage(event.target.result);
      };

      reader.readAsDataURL(file);
      setIsSubmitButtonDisabled(false);
    } else {
      setImageFile(null);
      setIsSubmitButtonDisabled(true);
      setPreviewImage(null);
    }
  };

  const handleSubmitProof = async () => {
    handleCloseModalPayment();
  
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
  
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await fetch(`https://03-be-eduliterate-express.vercel.app//data/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_subscribed: true }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setShowSubmitProofModal(true);
  
        localStorage.setItem('paymentSuccess', 'true');
        localStorage.setItem('is_subscribed', 'true');
  
        setTimeout(() => {
          window.location.href = '../#success';
        }, 3000);
      } else {
        throw new Error('Failed to update subscription status');
      }
    } catch (error) {
      console.error('Error updating subscription status:', error);
    }
  };  

  return (
    <div>
      <Helmet>
        <title>Payment</title>
        <link rel="icon" href="https://imgur.com/DKrU9n8.png" />
      </Helmet>
      <div className="content container-fluid custom-padding">
        <div className="row mb-5">
          <div className="col" style={{paddingTop: "50px"}}>
            <a
              href="/"
              className="flex items-center btn btn-light fw-bold fs-5 transparent-background"
            >
              <img src={arrowImg} className="img-fluid me-4" />
              Home
            </a>
          </div>
        </div>
        <div className="animate">
          <div className="bg-payment-container text-center">
            <img
              className="bg-payment img-payment"
              src={paymentImg}
              alt="Payment Image"
            />
            <div
              className="bg-payment-text"
              style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.3)" }}
            >
              <h2 className="text-white">Subscribe Now!</h2>
              <p className="text-white">
                Unlock access to all available e-books
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <div className="bg-orange text-start text-white fs-5 rounded p-2 mb-3 w-100">
                Payment Method
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <button
                className="flex items-center btn btn-light w-100 fw-bold fs-5 text-start"
                type="button"
                onClick={() => setOpenPaymentList(!openPaymentList)}
                aria-controls="payment-list-collapse"
                aria-expanded={openPaymentList}
              >
                <img src={transfer1Img} alt="Transfer Bank" className="mr-2" />
                Transfer Bank
              </button>
              <Collapse in={openPaymentList}>
                <div id="payment-list-collapse">
                  <div className="card bg-img-pill mt-2">
                    <div className="card-body">
                      <div className="flex flex-wrap justify-center">
                        <Row className="text-center mx-24"> 
                          <Col>
                            <img
                              src={bankBriImg}
                              alt="BRI"
                              className="img-bank mt-3"
                            />
                            <p className="bank-details">BRI - 07791768900</p>
                          </Col>
                          <Col>
                            <img
                              src={bankMandiriImg}
                              alt="Mandiri"
                              className="img-bank mt-4"
                            />
                            <p className="bank-details">Mandiri - 0881792022</p>
                          </Col>
                          <Col>
                            <img
                              src={bankBcaImg}
                              alt="BCA"
                              className="img-bank mt-4"
                            />
                            <p className="bank-details">BCA - 031789002</p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <button
                className="flex items-center btn btn-light w-100 fw-bold fs-5 text-start"
                type="button"
                onClick={() => setOpenQR(!openQR)}
                aria-controls="qr-collapse"
                aria-expanded={openQR}
              >
                <img src={wallet1Img} alt="E-Wallet" />
                E-Wallet
              </button>
              <Collapse in={openQR}>
                <div id="qr-collapse">
                  <div className="card bg-img-pill">
                    <div className="card-body text-center">
                      <p>
                        Scan the QR code below to make a payment using your
                        preferred E-Wallet:
                      </p>
                      <img
                        className="qr-code img-img-payment"
                        src={qrCodeImg}
                        alt="QR Code"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="bg-orange text-start text-white fs-5 rounded p-2 mb-3 w-100">
                Total Payment
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="col">Langganan Selamanya</div>
            </div>
            <div className="col-auto ms-auto">
              <div>100.000-</div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <div className="col">Subtotal</div>
            </div>
            <div className="col-auto ms-auto">
              <div>Rp100.000,00-</div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container container-fluid custom-padding">
        <div className="row">
          <div className="col">
            <button
              className="bg-orange btn-bayar text-center text-white fs-5 rounded p-2 mb-3 w-100"
              onClick={handleShowModalPayment}
            >
              Bayar
            </button>
          </div>
        </div>

        {/* Main Modal */}
        <Modal show={showModal} onHide={handleCloseModalPayment} centered>
          <Modal.Body className="text-center">
            <label htmlFor="proofUpload" className="form-label">
              Select Screenshot of Transfer:
            </label>
            <input
              type="file"
              className="form-control"
              id="proofUpload"
              onChange={handleProofUploadChange}
            />
            <div id="preview" style={{ marginTop: "20px" }}>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-preview"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="bg-orange btn-bayar-submit text-center text-white fs-5 rounded p-2 w-100"
              onClick={handleSubmitProof}
              disabled={isSubmitButtonDisabled}
            >
              Submit
            </button>
          </Modal.Footer>
        </Modal>

        {/* Submit Proof Modal */}
        <Modal
          show={showSubmitProofModal}
          onHide={handleCloseSubmitProofModal}
          centered
          backdrop="static"
        >
          <Modal.Body className="text-center d-flex flex-column align-items-center justify-content-center">
            <img src={loadingImg} alt="Loading..." width="200" />
            <p className="mt-3">Validating...</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
