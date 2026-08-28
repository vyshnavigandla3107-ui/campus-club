const express = require('express');
const router = express.Router();
const clubsData = require('../data/clubs.json');
const { processRecommendations } = require('../services/recommendationEngine');

router.get('/clubs', (req, res) => {
  res.json(clubsData);
});

router.post('/recommend', (req, res) => {
  try {
    const studentProfile = req.body;
    
    // Server-side validation
    if (!studentProfile.interests || studentProfile.interests.length === 0) {
      return res.status(400).json({ error: 'Please select at least one interest.' });
    }
    if (!studentProfile.availableDays || studentProfile.availableDays.length === 0) {
      return res.status(400).json({ error: 'Please select at least one available day.' });
    }

    const result = processRecommendations(studentProfile, clubsData);
    return res.json(result);
  } catch (error) {
    console.error("Recommendation engine error:", error);
    return res.status(500).json({ error: 'Internal recommendation engine error.' });
  }
});

module.exports = router;
