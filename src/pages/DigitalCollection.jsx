import React, { useEffect, useState, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import "../assets/styles/books.css";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";

const DigitalCollection = () => {
  const [books, setBooks] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState('');

  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const categorySectionRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const isCategorySectionVisibleRef = useRef(false);
  const currentSearchQueryRef = useRef("");

  const handleToggleCategorySection = () => {
    const categorySection = categorySectionRef.current;
    if (categorySection) {
      if (isCategorySectionVisibleRef.current) {
        categorySection.style.transform = "translateX(-95%)";
      } else {
        categorySection.style.transform = "translateX(0)";
      }

      isCategorySectionVisibleRef.current = !isCategorySectionVisibleRef.current;
    }
  };

  const handleSearchInput = () => {
    const searchInput = searchInputRef.current;
    const searchResults = searchResultsRef.current;
    const currentSearchQuery = currentSearchQueryRef.current;

    if (searchInput && searchResults) {
      const searchQuery = searchInput.value.toLowerCase().trim();

      if (searchQuery !== currentSearchQuery) {
        currentSearchQueryRef.current = searchQuery;

        const bookTitles = document.querySelectorAll(".box h3");

        searchResults.innerHTML = "";

        if (searchQuery === "") {
          searchResults.style.display = "none";
        } else {
          bookTitles.forEach((title, index) => {
            const titleText = title.textContent.toLowerCase();
            if (titleText.includes(searchQuery)) {
              const resultItem = document.createElement("a");
              resultItem.href = "#";
              resultItem.textContent = title.textContent;
              resultItem.addEventListener("click", (event) => {
                event.preventDefault();
                scrollToBook(index);
              });
              searchResults.appendChild(resultItem);
            }
          });

          if (searchResults.children.length === 0) {
            const noResults = document.createElement("div");
            noResults.textContent = "No results found";
            searchResults.appendChild(noResults);
          }

          searchResults.style.display = "block";
        }
      }
    }
  };

  const scrollToBook = (index) => {
    const books = document.querySelectorAll(".box");
    if (index >= 0 && index < books.length) {
      books[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://eduliterate.cyclic.app/data/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data); 
      } catch (error) {
        console.error('Error loading book data:', error);
      }
    };
  
    fetchData();
  
    const storedPaymentSuccess = localStorage.getItem('paymentSuccess');
    if (storedPaymentSuccess) {
      setPaymentSuccess(storedPaymentSuccess);
    }
  }, []);  

  return (
    <div className="books-body">
        <Helmet>
          <title>Digital Collection</title>
          <link rel="icon" href="https://imgur.com/CdWfCDS.png" />
        </Helmet>
        <div className="category-section" ref={categorySectionRef} id="categorySection" style={{ transform: "translateX(-95%)"}}>
          <button onClick={handleToggleCategorySection} className="toggle-button" ref={toggleButtonRef}>
            &rarr;
          </button>
          <ul>
            <h4>
              <span>Category</span>
            </h4>
            <li><a href="#E-Book">E-Books</a></li>
            <li><a href="#Audio-Book">Audio Books</a></li>
            <h4>
              <span>Search</span>
            </h4>
            <div className="search-container">
              <input
                type="text"
                id="search-input"
                placeholder="Search..."
                ref={searchInputRef}
                onInput={handleSearchInput}
              />
              <div id="search-results" ref={searchResultsRef}></div>
            </div>
          </ul>
        </div>

        <BookItem books={books} paymentSuccess={paymentSuccess}/>

        <div className="col text-center text-white">
            <p className="more-ebooks">MORE E-BOOKS COMING SOON</p>
        </div>

        <Footer/>
    </div>
  );
};

export default DigitalCollection;
