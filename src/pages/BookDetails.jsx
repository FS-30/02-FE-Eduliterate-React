import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import "../assets/styles/book_details.css";

const API_BASE = import.meta.env.VITE_API_URL || 'https://03-be-eduliterate-express.vercel.app';

const ReadingMode = ({ content, isSpeaking, currentParagraphIndex, onClose }) => {
  const paragraphs = content?.split('\n').filter(p => p.trim()) || [];
  const activeParagraphRef = useRef(null);

  useEffect(() => {
    if (activeParagraphRef.current) {
      activeParagraphRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentParagraphIndex]);

  return (
    <div className="reading-overlay" role="dialog" aria-modal="true" aria-label="Reading mode">
      <div className="reading-toolbar">
        <span className="reading-progress">
          {isSpeaking && currentParagraphIndex >= 0
            ? `Paragraph ${currentParagraphIndex + 1} / ${paragraphs.length}`
            : 'Reading Mode'}
        </span>
        <button className="reading-close-btn" onClick={onClose} aria-label="Close reading mode">
          ✕ Close
        </button>
      </div>
      <div className="reading-content" role="article">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            ref={idx === currentParagraphIndex ? activeParagraphRef : null}
            className={`reading-paragraph ${idx === currentParagraphIndex && isSpeaking ? 'reading-active' : ''}`}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAudioBook, setIsAudioBook] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(-1);
  const [showReadingMode, setShowReadingMode] = useState(false);
  const [ttsTarget, setTtsTarget] = useState('content');

  const utteranceRef = useRef(null);
  const paragraphsRef = useRef([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/data/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401 || response.status === 403) {
          navigate('/auth/login');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch book details');

        const data = await response.json();
        setBookData(data);
        setIsAudioBook(data?.type === "Audio-Book");
        paragraphsRef.current = data?.content?.split('\n').filter(p => p.trim()) || [];
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [id, navigate]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentParagraphIndex(-1);
  }, []);

  const speakFrom = useCallback((paragraphs, startIndex, rate) => {
    window.speechSynthesis.cancel();
    setCurrentParagraphIndex(startIndex);

    const speakParagraph = (index) => {
      if (index >= paragraphs.length) {
        setIsSpeaking(false);
        setCurrentParagraphIndex(-1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(paragraphs[index]);
      utterance.rate = rate;
      utteranceRef.current = utterance;

      utterance.onstart = () => setCurrentParagraphIndex(index);
      utterance.onend = () => speakParagraph(index + 1);
      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          setIsSpeaking(false);
          setCurrentParagraphIndex(-1);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    speakParagraph(startIndex);
  }, []);

  const handleTTS = useCallback((target) => {
    const text = target === 'description' ? bookData?.description : bookData?.content;
    const paragraphs = text?.split('\n').filter(p => p.trim()) || [text];

    if (isSpeaking) {
      stopSpeaking();
      if (ttsTarget === target) return;
    }

    setTtsTarget(target);
    speakFrom(paragraphs, 0, speechRate);
    if (target === 'content') setShowReadingMode(true);
  }, [isSpeaking, ttsTarget, bookData, speechRate, stopSpeaking, speakFrom]);

  const handlePauseResume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  const handleRateChange = useCallback((newRate) => {
    setSpeechRate(newRate);
    if (isSpeaking) {
      const paragraphs = ttsTarget === 'description'
        ? [bookData?.description]
        : paragraphsRef.current;
      speakFrom(paragraphs, Math.max(0, currentParagraphIndex), newRate);
    }
  }, [isSpeaking, ttsTarget, bookData, currentParagraphIndex, speakFrom]);

  if (loading) {
    return (
      <div className="body-book-details">
        <div className="book-details-container">
          <div className="loading-state">
            <div className="loading-spinner" aria-label="Loading..." role="status" />
            <p>Loading book details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="body-book-details">
        <div className="book-details-container">
          <div className="error-state" role="alert">
            <p>Failed to load book: {error}</p>
            <button className="speak-button" onClick={() => navigate('/digital-collection')}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body-book-details">
      <Helmet>
        <title>{bookData?.title ? `${bookData.title} — Eduliterate` : 'Book Details — Eduliterate'}</title>
        <meta name="description" content={bookData?.description?.slice(0, 160)} />
      </Helmet>

      {showReadingMode && (
        <ReadingMode
          content={bookData?.content}
          isSpeaking={isSpeaking}
          currentParagraphIndex={currentParagraphIndex}
          onClose={() => { setShowReadingMode(false); stopSpeaking(); }}
        />
      )}

      <div className="book-details-container">
        <div className="book-details">
          <div className="book-image">
            <img src={bookData?.image} alt={`Cover of ${bookData?.title}`} />
          </div>
          <div className="book-info">
            <h1>{bookData?.title}</h1>
            <p className="book-meta author">by {bookData?.author}</p>
            <span className={`price-badge ${bookData?.price === 'Free' ? 'free' : 'premium'}`}>
              {bookData?.price}
            </span>
            <span className="type-badge">{bookData?.type}</span>
          </div>
        </div>

        <div className="book-description-section">
          <h2 className="section-label">Description</h2>
          <p className="book-description-text">{bookData?.description}</p>

          {isAudioBook && (
            <button
              className={`speak-button speak-desc-btn ${isSpeaking && ttsTarget === 'description' ? 'active' : ''}`}
              onClick={() => handleTTS('description')}
              aria-pressed={isSpeaking && ttsTarget === 'description'}
              aria-label={isSpeaking && ttsTarget === 'description' ? 'Stop reading description' : 'Read description aloud'}
            >
              {isSpeaking && ttsTarget === 'description' ? '⏹ Stop Reading' : '🔊 Read Description'}
            </button>
          )}
        </div>

        <div className="book-content-section">
          <h2 className="section-label">Content</h2>
          <div className="book-content-text">
            {bookData?.content?.split('\n').filter(p => p.trim()).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {isAudioBook && (
          <div className="tts-controls" aria-label="Text-to-Speech controls">
            <div className="tts-buttons">
              <button
                className={`speak-button ${isSpeaking && ttsTarget === 'content' ? 'active' : ''}`}
                onClick={() => handleTTS('content')}
                aria-pressed={isSpeaking && ttsTarget === 'content'}
                aria-label={isSpeaking && ttsTarget === 'content' ? 'Stop reading content' : 'Read content aloud in reading mode'}
              >
                {isSpeaking && ttsTarget === 'content' ? '⏹ Stop' : '📖 Read Aloud'}
              </button>

              {isSpeaking && (
                <button
                  className="speak-button pause-btn"
                  onClick={handlePauseResume}
                  aria-label={isPaused ? 'Resume' : 'Pause'}
                >
                  {isPaused ? '▶ Resume' : '⏸ Pause'}
                </button>
              )}
            </div>

            <div className="tts-rate-control">
              <label htmlFor="speech-rate" className="rate-label">
                Speed: {speechRate}×
              </label>
              <input
                id="speech-rate"
                type="range"
                min="0.5"
                max="2"
                step="0.25"
                value={speechRate}
                onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                className="rate-slider"
                aria-label="Speech rate"
              />
              <div className="rate-ticks">
                <span>0.5×</span><span>1×</span><span>1.5×</span><span>2×</span>
              </div>
            </div>

            {isSpeaking && (
              <p className="tts-status" aria-live="polite" role="status">
                {isPaused ? '⏸ Paused' : `🔊 Reading${ttsTarget === 'content' && currentParagraphIndex >= 0 ? ` paragraph ${currentParagraphIndex + 1}` : '...'}`}
              </p>
            )}
          </div>
        )}
      </div>

      <button className="go-back-btn" onClick={() => navigate('/digital-collection')}>
        ← Back to Collection
      </button>
    </div>
  );
};

export default BookDetails;
