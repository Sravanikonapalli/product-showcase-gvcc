const express = require('express');
const router = express.Router();
const { all, get } = require('../db');

//api/products
router.get('/', async (req, res) => {
  try {
    let { search = '', category = '', page = 1, limit = 8 } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 8;
    if (limit < 1) limit = 8;
    const offset = (page - 1) * limit;

    const params = [];
    let where = 'WHERE 1=1';
    if (search) {
      where += ' AND (name LIKE ? OR short_desc LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      where += ' AND category = ?';
      params.push(category);
    }

    // total count
    const countRow = await all(`SELECT COUNT(*) as count FROM products ${where}`, params);
    const total = countRow && countRow[0] ? countRow[0].count : 0;

    // fetch page
    const rows = await all(
      `SELECT id, name, category, short_desc, price, image_url FROM products ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      products: rows,
      meta: {
        total,
        page,
        limit,
        pages: Math.max(1, Math.ceil(total / limit))
      }
    });
  } catch (err) {
    console.error('GET /api/products error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const row = await get('SELECT * FROM products WHERE id = ?', [id]);
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: row });
  } catch (err) {
    console.error('GET /api/products/:id error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
