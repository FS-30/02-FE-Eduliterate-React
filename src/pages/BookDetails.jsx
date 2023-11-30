import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import "../assets/styles/book_details.css";

const BookDetails = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});
  const [showSpeakButton, setShowSpeakButton] = useState(false);

  useEffect(() => {
    // Fetch books data
    const fetchData = async () => {
      try {
        const response = await fetch("../src/assets/data/books.json");
        const data = await response.json();
        const bookById = data.books.find(book => book.id === id);
        setBookData(bookById);
        setShowSpeakButton(bookById?.type === "Audio-Book");
      } catch (error) {
        console.error("Error loading book data:", error);
      }
    };

    fetchData();
  }, [id, bookData]);

  const speakDescription = () => {
    const bookDescription = bookData.contents;
    const speechSynthesis = window.speechSynthesis;
    const speakButton = document.getElementById("speak-button");

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      speakButton.innerHTML = `<box-icon name='user-voice' color='#ffffff'></box-icon>Read Description`;
    } else {
      if (bookDescription) {
        const speechUtterance = new SpeechSynthesisUtterance(bookDescription);
        speechSynthesis.speak(speechUtterance);
        speakButton.innerHTML = `<box-icon name='user-voice' color='#ffffff'></box-icon>Stop Reading`;
      }
    }
  };

  return (
    <div className="body-book-details">
        <Helmet>
          <title>Book Details</title>
          <link rel="icon" href="../src/assets/img/icon.png" />
        </Helmet>
        <div className="book-details-container">
            <div className="book-details">
                <div className="book-image">
                    <img src={"../src/assets/img/" + bookData.image} id="book-image" alt="Book Image" />
                </div>
                <div className="book-info">
                    <h1 id="book-title">{ bookData.title }</h1>
                    <p id="book-author">{ bookData.author }</p>
                    <p id="book-price">{ bookData.price }</p>
                </div>
            </div>
            <p id="book.contents" style={{ textAlign: "justify" }}>{ bookData.contents }</p>
            <div className="button-container-details">
              {showSpeakButton && (
                <button id="speak-button" className="speak-button" onClick={speakDescription}>
                  <box-icon name='user-voice' color='#ffffff'></box-icon>
                  Read Description
                </button>
              )}
            </div>
        </div>
        
        <Link to="/digital-collection" className="go-back-link">Go Back</Link>
    </div>
  );
};

export default BookDetails;
