import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookItem({ books, paymentSuccess }) {
  const navigate = useNavigate();
  const isSubscribed = localStorage.getItem("is_subscribed") === 'true';
  const hasAccess = isSubscribed || paymentSuccess === 'true';

  return (
    <section className="product" id="product" aria-label="Digital Collection">
      <h1 className="heading">
        Digital<span>Collection</span>
      </h1>
      <div className="product-slider">
        <div className="wrapper">
          {books.map((book) => {
            const isSubscribeNeeded = book.price === "SUBSCRIBE NEEDED";
            const isLocked = isSubscribeNeeded && !hasAccess;

            return (
              <div
                key={book._id}
                className={`box ${book.type}${isLocked ? ' locked' : ''}`}
                role="article"
                aria-label={`${book.title} — ${isLocked ? 'Subscription required' : 'Available'}`}
                tabIndex={isLocked ? -1 : 0}
                style={{
                  border: isSubscribeNeeded
                    ? (hasAccess ? "2px solid green" : "2px solid red")
                    : "none",
                  pointerEvents: isLocked ? "none" : "auto",
                  opacity: isLocked ? 0.65 : 1,
                }}
                onClick={() => !isLocked && navigate(`/book-details/${book._id}`)}
                onKeyDown={(e) => e.key === 'Enter' && !isLocked && navigate(`/book-details/${book._id}`)}
              >
                <img src={book.image} alt={`Cover of ${book.title}`} />
                {book.type === "Audio-Book" && book.icon && (
                  <img
                    src={book.icon}
                    className="lock-icon"
                    alt="Audio Book"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                <h3>{book.title}</h3>
                <p className="book-author-name">{book.author}</p>
                <div className="price">{isLocked ? "🔒 Subscribe to Read" : book.price}</div>
                <div className="description">
                  <span>{book.description}</span>
                </div>
                <button
                  className="btn btn-books"
                  disabled={isLocked}
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
