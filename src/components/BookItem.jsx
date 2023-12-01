import React from "react";

const isSubscribed = localStorage.getItem("is_subscribed");

export default function BookItem({ books, paymentSuccess }) {
  return (
    <section className="product" id="product">
      <h1 className="heading">
        Digital<span>Collection</span>
      </h1>
      <div className="product-slider">
        <div className="wrapper">
          {books.map((book) => {
            const isSubscribeNeeded = book.price === "SUBSCRIBE NEEDED";
            const isSubscribedValue = isSubscribed === 'true';

            return (
              <div
                key={book._id}
                className={`box ${book.type}`}
                id={book.type}
                style={{
                  border: isSubscribeNeeded
                    ? (paymentSuccess === 'true' || isSubscribedValue ? "2px solid green" : "2px solid red")
                    : "none",
                  pointerEvents:
                    isSubscribeNeeded && !(paymentSuccess === 'true' || isSubscribedValue)
                      ? "none"
                      : "auto",
                }}
                onClick={() => {
                  const bookDetailsUrl = `/book-details/${book._id}`;
                  window.location.href = bookDetailsUrl;
                }}
              >
                <img src={book.image} alt={book.title} />
                {book.type === "Audio-Book" && (
                  <img
                    src={book.icon}
                    className="lock-icon"
                    alt="Audio Book"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                <h3>{book.title}</h3>
                <div className="price">{book.price}</div>
                <div className="description">
                  <span>{book.description}</span>
                </div>
                <a href={`#${book._id}`} className="btn btn-books">
                  Read
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
