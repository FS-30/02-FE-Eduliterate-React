import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import "../assets/styles/book_details.css";

const BookDetails = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});
  const [showSpeakButton, setShowSpeakButton] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesizer, setSpeechSynthesizer] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://03-be-eduliterate-express.vercel.app//data/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }

        const data = await response.json();
        setBookData(data);
        setShowSpeakButton(data?.type === "Audio-Book");
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    setSpeechSynthesizer(synth);
    return () => {
      synth.cancel();
    };
  }, []);

  const speakDescription = () => {
    const bookDescription = bookData?.description;
    const speakButton = document.getElementById("speak-button");

    if (speechSynthesizer && bookDescription) {
      if (isSpeaking) {
        speechSynthesizer.cancel();
        setIsSpeaking(false);
        speakButton.innerHTML = `<box-icon name='user-voice' color='#ffffff'></box-icon>Read Description`;
      } else {
        const speechUtterance = new SpeechSynthesisUtterance(bookDescription);
        speechSynthesizer.speak(speechUtterance);
        setIsSpeaking(true);
        speakButton.innerHTML = `<box-icon name='user-voice' color='#ffffff'></box-icon>Stop Reading`;
      }
    }
  };

  return (
    <div className="body-book-details">
      <Helmet>
        <title>Book Details</title>
        <link rel="icon" href="https://imgur.com/CdWfCDS.png" />
      </Helmet>
      <div className="book-details-container">
        <div className="book-details">
          <div className="book-image">
            <img src={bookData?.image} id="book-image" alt="Book Image" />
          </div>
          <div className="book-info">
            <h1 id="book-title">{bookData?.title}</h1>
            <p id="book-author">{bookData?.author}</p>
            <p id="book-price">{bookData?.price}</p>
          </div>
        </div>
        <p id="book.contents" style={{ textAlign: "justify" }}>{bookData?.content}</p>
        <div className="button-container-details">
          {showSpeakButton && (
            <button id="speak-button" className="speak-button" onClick={speakDescription}>
              <box-icon name='user-voice' color='#ffffff'></box-icon>
              {isSpeaking ? "Stop Reading" : "Read Description"}
            </button>
          )}
        </div>
      </div>
      <Link to="/digital-collection" className="go-back-link">Go Back</Link>
    </div>
  );
};

export default BookDetails;
