import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductDetailsModal from '../components/ProductDetailsModal';
import './Home.css';

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="page">
      <header className="header">
        <h1>Product Showcase</h1>
        <p className="subtitle">Browse products — view details — send enquiries</p>
      </header>

      <main>
        <ProductList onView={id => setSelectedProductId(id)} />
      </main>

      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}

      <footer className="footer">
        <small>Demo app • Product Showcase & Enquiry</small>
      </footer>
    </div>
  );
}
