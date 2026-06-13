import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookItem({ books, isSubscribed }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <section className="product" id="product" aria-label="Digital Collection">
      <h1 className="heading">
        Digital<span>Collection</span>
      </h1>
      <div className="product-slider">
        <div className="wrapper">
          {books.map((book) => {
            const needsSubscription = book.price === "SUBSCRIBE NEEDED";
            const isLocked = needsSubscription && !isSubscribed;

            const cardBorder = needsSubscription
              ? isSubscribed
                ? '2px solid #28a745'
                : '2px solid #dee2e6'
              : 'none';

            if (isLocked) {
              return (
                <div
                  key={book._id}
                  className="box locked"
                  role="article"
                  aria-label={`${book.title} — Subscription required`}
                  style={{ border: cardBorder }}
                >
                  <img src={book.image} alt={`Cover of ${book.title}`} loading="lazy" />
                  <h3>{book.title}</h3>
                  <p className="book-author-name">{book.author}</p>
                  <div className="price locked-price">🔒 Subscription Required</div>
                  <div className="description">
                    <span>{book.description}</span>
                  </div>
                  <button
                    className="btn btn-books btn-subscribe"
                    onClick={() => navigate('/payment')}
                    disabled={!isLoggedIn}
                    title={!isLoggedIn ? 'Please log in or register first' : undefined}
                    aria-label={!isLoggedIn ? 'Log in to subscribe' : `Subscribe to read ${book.title}`}
                  >
                    {!isLoggedIn ? 'Log in to Subscribe' : 'Subscribe to Read'}
                  </button>
                </div>
              );
            }

            return (
              <div
                key={book._id}
                className="box"
                role="article"
                aria-label={book.title}
                tabIndex={0}
                style={{ border: cardBorder }}
                onClick={() => navigate(`/book-details/${book._id}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/book-details/${book._id}`)}
              >
                <img src={book.image} alt={`Cover of ${book.title}`} loading="lazy" />
                {book.type === "Audio-Book" && book.icon && (
                  <img
                    src={book.icon}
                    alt="Audio Book"
                    className="audiobook-icon"
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
                <h3>{book.title}</h3>
                <p className="book-author-name">{book.author}</p>
                <div className="price">
                  {needsSubscription
                    ? <span className="price-subscribed">✓ Included in Subscription</span>
                    : book.price}
                </div>
                <div className="description">
                  <span>{book.description}</span>
                </div>
                <button
                  className="btn btn-books"
                  aria-label={`Read ${book.title}`}
                  onClick={(e) => { e.stopPropagation(); navigate(`/book-details/${book._id}`); }}
                >
                  Read
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
