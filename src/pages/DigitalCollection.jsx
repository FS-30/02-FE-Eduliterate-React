import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import "../assets/styles/books.css";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";

const API_BASE = import.meta.env.VITE_API_URL || 'https://03-be-eduliterate-express.vercel.app';

const DigitalCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const paymentSuccess = localStorage.getItem('paymentSuccess');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/data/books`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || book.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="books-body">
      <Helmet>
        <title>Digital Collection — Eduliterate</title>
        <meta name="description" content="Browse our digital collection of free and premium e-books and audio books." />
      </Helmet>

      {/* Sidebar */}
      <aside
        className={`category-section ${isSidebarOpen ? 'open' : ''}`}
        aria-label="Filter and search"
        style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-95%)' }}
      >
        <button
          className="toggle-button"
          onClick={() => setIsSidebarOpen(v => !v)}
          aria-label={isSidebarOpen ? 'Close filter panel' : 'Open filter panel'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? '←' : '→'}
        </button>

        <div className="sidebar-content">
          <div>
            <h3 className="sidebar-heading">Category</h3>
            <ul>
              {['All', 'E-Book', 'Audio-Book'].map(type => (
                <li key={type}>
                  <button
                    className={`category-btn ${activeFilter === type ? 'category-active' : ''}`}
                    onClick={() => setActiveFilter(type)}
                    aria-pressed={activeFilter === type}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="sidebar-heading">Search</h3>
            <div className="search-container" role="search">
              <label htmlFor="search-input" className="sr-only">Search books</label>
              <input
                id="search-input"
                type="search"
                placeholder="Title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search books by title or author"
              />
              {searchQuery && (
                <p className="search-count" aria-live="polite">
                  {filteredBooks.length} result{filteredBooks.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>

      {loading ? (
        <div className="collection-loading" role="status" aria-label="Loading books">
          <div className="collection-spinner" />
          <p>Loading collection...</p>
        </div>
      ) : error ? (
        <div className="collection-error" role="alert">
          <p>Failed to load books: {error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <>
          <BookItem books={filteredBooks} paymentSuccess={paymentSuccess} />
          {filteredBooks.length === 0 && searchQuery && (
            <div className="no-results" role="status">
              <p>No books found for &ldquo;{searchQuery}&rdquo;</p>
            </div>
          )}
        </>
      )}

      {!loading && !error && (
        <div className="col text-center text-white">
          <p className="more-ebooks">MORE E-BOOKS COMING SOON</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DigitalCollection;
