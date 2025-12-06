import React, { useEffect, useState } from 'react';
import api from '../api';
import EnquiryForm from './EnquiryForm';
import './ProductDetailsModal.css';

export default function ProductDetailsModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    api.get(`/api/products/${productId}`)
      .then(res => { if (mounted) setProduct(res.data.product); })
      .catch(err => { console.error(err); if (mounted) setProduct(null); });
    return () => { mounted = false; };
  }, [productId]);

  if (!product) return <div className="modal-backdrop"><div className="modal">Loading product...</div></div>;

  function onEnquirySuccess() {
    setShowForm(false);
    setStatusMsg('Enquiry submitted successfully.');
    setTimeout(() => setStatusMsg(''), 3500);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.image_url || '/images/placeholder.png'} alt={product.name} />
          </div>

          <div className="modal-content">
            <h2>{product.name}</h2>
            <p className="muted">{product.category}</p>
            <p>{product.long_desc || product.short_desc}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>

            {!showForm && (
              <div className="modal-actions">
                <button className="btn" onClick={() => setShowForm(true)}>Enquire</button>
                <button className="btn ghost" onClick={onClose}>Close</button>
              </div>
            )}

            {showForm && <EnquiryForm productId={product.id} onSuccess={onEnquirySuccess} />}
            {statusMsg && <div className="success">{statusMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
