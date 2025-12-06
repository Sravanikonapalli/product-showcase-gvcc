import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onView }) {
  const img = product.image_url || '/images/placeholder.png';
  return (
    <article className="card">
      <div className="card-image">
        <img src={img} alt={product.name} />
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.short_desc}</p>
        <div className="card-meta">
          <strong>₹{product.price}</strong>
          <button className="btn" onClick={onView}>View</button>
        </div>
      </div>
    </article>
  );
}
