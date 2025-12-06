import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from './ProductCard';
import './productList.css';

export default function ProductList({ onView }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, pages: 1 });
  const limit = 6;

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        const res = await api.get('/api/products', { params: { search, category, page, limit } });
        if (!mounted) return;
        setProducts(res.data.products || []);
        setMeta(res.data.meta || { page: 1, pages: 1 });
      } catch (err) {
        console.error('Failed to load products', err);
      }
    }
    fetchProducts();
    return () => { mounted = false; };
  }, [search, category, page]);

  return (
    <section className="products-section">
      <div className="controls">
        <input
          className="search"
          placeholder="Search products..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}>
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
          <option value="Stationery">Stationery</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="grid">
        {products.length
          ? products.map(p => <ProductCard key={p.id} product={p} onView={() => onView(p.id)} />)
          : <div className="empty">No products found.</div>}
      </div>

      <div className="pagination">
        <button onClick={() => page > 1 && setPage(page - 1)} disabled={page <= 1}>Prev</button>
        <span>Page {meta.page} / {meta.pages}</span>
        <button onClick={() => page < meta.pages && setPage(page + 1)} disabled={page >= meta.pages}>Next</button>
      </div>
    </section>
  );
}
