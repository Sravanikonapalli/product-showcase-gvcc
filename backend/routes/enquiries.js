const express = require('express');
const router = express.Router();
const { run, all } = require('../db');

function validateEnquiry(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) errors.push('name required');
  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) errors.push('valid email required');
  if (!body.message || !body.message.trim()) errors.push('message required');
  return errors;
}

// /api/enquiries
router.post('/', async (req, res) => {
  try {
    const { product_id = null, name, email, phone = '', message } = req.body;
    const errors = validateEnquiry({ name, email, message });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const sql = `INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
    const result = await run(sql, [product_id, name.trim(), email.trim(), phone.trim(), message.trim()]);
    res.status(201).json({ id: result.id, message: 'Enquiry submitted' });
  } catch (err) {
    console.error('POST /api/enquiries error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/enquiries
router.get('/', async (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    if (adminToken) {
      const provided = req.headers['x-admin-token'];
      if (!provided || provided !== adminToken) {
        return res.status(401).json({ error: 'Unauthorized: missing or invalid admin token' });
      }
    }

    const rows = await all(
      `SELECT e.id, e.product_id, p.name as product_name, e.name, e.email, e.phone, e.message, e.created_at
       FROM enquiries e
       LEFT JOIN products p ON p.id = e.product_id
       ORDER BY e.created_at DESC`
    );

    res.json({ enquiries: rows });
  } catch (err) {
    console.error('GET /api/enquiries error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
