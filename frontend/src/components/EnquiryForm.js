import React, { useState } from 'react';
import api from '../api';
import './EnquiryForm.css';
export default function EnquiryForm({ productId = null, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      await api.post('/api/enquiries', { product_id: productId, ...form });
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      const serverErr = err?.response?.data?.errors || err?.response?.data?.error;
      setErrors({ submit: serverErr || 'Failed to send enquiry' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} aria-label="Enquiry form">
      <div className="field">
        <label htmlFor="name">Name*</label>
        <input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      <div className="field">
        <label htmlFor="email">Email*</label>
        <input id="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>

      <div className="field">
        <label htmlFor="message">Message*</label>
        <textarea id="message" rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        {errors.message && <small className="error">{errors.message}</small>}
      </div>

      {errors.submit && <div className="error">{Array.isArray(errors.submit) ? errors.submit.join(', ') : errors.submit}</div>}

      <div className="form-actions">
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Sending...' : 'Send Enquiry'}</button>
      </div>
    </form>
  );
}
