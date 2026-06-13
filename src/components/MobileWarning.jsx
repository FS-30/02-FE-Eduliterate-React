import React, { useState, useEffect } from 'react';
import logoImg from '../assets/img/logo.png';

const PHONE_MAX = 768;

export default function MobileWarning({ children }) {
  const [isPhone, setIsPhone] = useState(() => window.innerWidth < PHONE_MAX);

  useEffect(() => {
    const onResize = () => setIsPhone(window.innerWidth < PHONE_MAX);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!isPhone) return <>{children}</>;

  return (
    <div className="mob-wall" role="alertdialog" aria-modal="true" aria-labelledby="mob-wall-title">
      {/* Decorative background circles */}
      <div className="mob-wall-circle mob-wall-circle-1" aria-hidden="true" />
      <div className="mob-wall-circle mob-wall-circle-2" aria-hidden="true" />
      <div className="mob-wall-circle mob-wall-circle-3" aria-hidden="true" />

      <div className="mob-wall-card">
        {/* Brand row */}
        <div className="mob-wall-brand">
          <img src={logoImg} alt="" aria-hidden="true" className="mob-wall-logo" />
          <span className="mob-wall-brand-name">EDULITERATE</span>
        </div>

        {/* Phone ✕  →  Desktop ✓ */}
        <div className="mob-wall-graphic">
          <div className="mob-wall-device mob-wall-device-bad">
            <svg
              width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="#ef4444" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span className="mob-wall-badge mob-wall-badge-no" aria-hidden="true">✕</span>
          </div>

          <svg
            className="mob-wall-arrow"
            width="26" height="26" viewBox="0 0 24 24"
            fill="none" stroke="#d1d5db" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>

          <div className="mob-wall-device mob-wall-device-good">
            <svg
              width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="#22c55e" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span className="mob-wall-badge mob-wall-badge-yes" aria-hidden="true">✓</span>
          </div>
        </div>

        <h1 id="mob-wall-title" className="mob-wall-title">Open on a Larger Screen</h1>
        <p className="mob-wall-body">
          Eduliterate is designed for tablets and desktops. Please open this site on a device
          with a screen at least&nbsp;<strong>768 px wide</strong> for the best reading
          and learning experience.
        </p>

        <div className="mob-wall-hint">
          <svg
            width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Recommended: iPad, tablet, or desktop
        </div>
      </div>
    </div>
  );
}
