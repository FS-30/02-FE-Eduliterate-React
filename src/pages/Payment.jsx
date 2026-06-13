import React, { useState } from "react";
import { Modal, Collapse, Row, Col } from "react-bootstrap";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import "../assets/styles/payment.css";
import paymentImg from "../assets/img/payment.png";
import arrowImg from "../assets/img/arrow.png";
import bankBcaImg from "../assets/img/bank-bca.png";
import bankBriImg from "../assets/img/bank-bri.png";
import bankMandiriImg from "../assets/img/bank-mandiri.png";
import loadingImg from "../assets/img/loading.gif";
import qrCodeImg from "../assets/img/qr-code.png";
import transfer1Img from "../assets/img/transfer1.png";
import wallet1Img from "../assets/img/wallet1.png";

const API_BASE = import.meta.env.VITE_API_URL || 'https://03-be-eduliterate-express.vercel.app';

const BANK_ACCOUNTS = [
  { img: bankBriImg, name: 'BRI', number: '0779-1768-9000' },
  { img: bankMandiriImg, name: 'Mandiri', number: '088-1792-0222' },
  { img: bankBcaImg, name: 'BCA', number: '031-789-0020' },
];

export default function Payment() {
  const navigate = useNavigate();
  const [openBankTransfer, setOpenBankTransfer] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleProofUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFile(null);
      setPreviewImage(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      Swal.fire({ icon: 'error', title: 'Invalid file type', text: 'Please upload an image file (JPG, PNG, etc.).' });
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({ icon: 'error', title: 'File too large', text: 'Maximum file size is 5 MB.' });
      e.target.value = '';
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmitProof = async () => {
    if (!imageFile || isSubmitting) return;

    setShowUploadModal(false);
    setIsSubmitting(true);
    setShowProcessingModal(true);

    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_BASE}/data/payment/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload payment proof');
      }

      // Explicitly activate subscription in DB.
      // The payment endpoint handles this on the current backend, but an explicit
      // PUT call ensures it also works when running against an older deployment.
      const userId = localStorage.getItem('id');
      if (userId) {
        try {
          await fetch(`${API_BASE}/data/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ is_subscribed: true }),
          });
        } catch {
          // Non-fatal: payment endpoint already handled activation
        }
      }

      localStorage.setItem('is_subscribed', 'true');
      localStorage.setItem('paymentSuccess', 'true');

      setTimeout(() => {
        setShowProcessingModal(false);
        navigate('/digital-collection');
      }, 2000);
    } catch (error) {
      setShowProcessingModal(false);
      setIsSubmitting(false);
      Swal.fire({
        icon: 'error',
        title: 'Submission failed',
        text: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const resetModal = () => {
    setShowUploadModal(false);
    setImageFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="payment-page">
      <Helmet>
        <title>Payment — Eduliterate</title>
      </Helmet>

      <div className="payment-wrapper animate">
        {/* Back nav */}
        <div className="payment-back-row">
          <a href="/" className="payment-back-link" aria-label="Go back to home">
            <img src={arrowImg} alt="" aria-hidden="true" className="payment-back-arrow" />
            Home
          </a>
        </div>

        {/* Hero banner */}
        <div className="payment-hero">
          <img className="payment-hero-img" src={paymentImg} alt="Subscribe to Eduliterate" />
          <div className="payment-hero-text">
            <h2>Subscribe Now!</h2>
            <p>Unlock access to all available e-books and audio books</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-section-label">Payment Method</div>

        {/* Bank Transfer */}
        <div className="payment-method-block">
          <button
            className="payment-method-toggle"
            onClick={() => setOpenBankTransfer(v => !v)}
            aria-controls="bank-transfer-panel"
            aria-expanded={openBankTransfer}
          >
            <img src={transfer1Img} alt="" aria-hidden="true" className="payment-method-icon" />
            Bank Transfer
            <span className="payment-method-chevron" aria-hidden="true">
              {openBankTransfer ? '▲' : '▼'}
            </span>
          </button>
          <Collapse in={openBankTransfer}>
            <div id="bank-transfer-panel">
              <div className="bank-panel">
                <p className="bank-panel-instruction">
                  Transfer exactly <strong>Rp 100,000</strong> to one of the accounts below, then upload your transfer screenshot.
                </p>
                <div className="bank-accounts-grid">
                  {BANK_ACCOUNTS.map(({ img, name, number }) => (
                    <div key={name} className="bank-account-card">
                      <img src={img} alt={name} className="bank-logo" />
                      <div className="bank-name">{name}</div>
                      <div className="bank-number">{number}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Collapse>
        </div>

        {/* E-Wallet */}
        <div className="payment-method-block">
          <button
            className="payment-method-toggle"
            onClick={() => setOpenQR(v => !v)}
            aria-controls="ewallet-panel"
            aria-expanded={openQR}
          >
            <img src={wallet1Img} alt="" aria-hidden="true" className="payment-method-icon" />
            E-Wallet (QRIS)
            <span className="payment-method-chevron" aria-hidden="true">
              {openQR ? '▲' : '▼'}
            </span>
          </button>
          <Collapse in={openQR}>
            <div id="ewallet-panel">
              <div className="bank-panel text-center">
                <p className="bank-panel-instruction">
                  Scan the QR code below with your preferred e-wallet app, then upload your payment screenshot.
                </p>
                <img className="qr-code" src={qrCodeImg} alt="QRIS payment QR code" />
              </div>
            </div>
          </Collapse>
        </div>

        {/* Order Summary */}
        <div className="payment-section-label" style={{ marginTop: '1.5rem' }}>Order Summary</div>
        <div className="payment-summary">
          <div className="payment-summary-row">
            <span>Lifetime Subscription</span>
            <span>Rp 100,000</span>
          </div>
          <div className="payment-summary-divider" />
          <div className="payment-summary-row payment-summary-total">
            <span>Total</span>
            <span>Rp 100,000</span>
          </div>
        </div>

        {/* Pay button */}
        <button
          className="btn-pay-now"
          onClick={() => setShowUploadModal(true)}
          disabled={isSubmitting}
          aria-label="Upload payment proof"
        >
          Pay Now — Upload Proof
        </button>
      </div>

      {/* Upload Proof Modal */}
      <Modal show={showUploadModal} onHide={resetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>Upload Payment Proof</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '0.875rem', color: '#555', marginBottom: '1rem' }}>
            Upload a clear screenshot or photo of your transfer confirmation. Accepted formats: JPG, PNG, WEBP (max 5 MB).
          </p>
          <label htmlFor="proofUpload" className="proof-upload-label">
            {previewImage ? 'Change screenshot' : 'Select screenshot'}
          </label>
          <input
            type="file"
            id="proofUpload"
            accept="image/*"
            className="proof-upload-input"
            onChange={handleProofUploadChange}
          />
          {previewImage && (
            <div className="proof-preview-wrapper">
              <img src={previewImage} alt="Payment proof preview" className="proof-preview-img" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ flexDirection: 'column', gap: '0.5rem' }}>
          <button
            className="btn-submit-proof"
            onClick={handleSubmitProof}
            disabled={!imageFile || isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit Proof'}
          </button>
          <button className="btn-cancel-proof" onClick={resetModal}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      {/* Processing Modal */}
      <Modal show={showProcessingModal} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center processing-modal-body">
          <img src={loadingImg} alt="" aria-hidden="true" width="160" />
          <p className="processing-text">Processing your payment…</p>
          <p style={{ fontSize: '0.8rem', color: '#999' }}>You will be redirected shortly.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
