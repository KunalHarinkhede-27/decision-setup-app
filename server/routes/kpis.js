const express = require('express');
const router = express.Router();
const KPI = require('../models/KPI');

// CREATE new KPI
router.post('/create', async (req, res) => {
  const { title, value, category } = req.body;

  // Validate input
  if (!title || typeof value !== 'number' || !category) {
    return res.status(400).json({ message: 'All fields (title, value, category) are required and valid.' });
  }

  try {
    const newKpi = new KPI({ title, value, category });
    await newKpi.save();
    res.status(201).json(newKpi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all or filtered KPIs
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    const kpis = category
      ? await KPI.find({ category })
      : await KPI.find();
    res.json(kpis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
