const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', recommendationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', agent: 'Campus Agent API Active' });
});

app.listen(PORT, () => {
  console.log(`[Campus Agent Backend] Running locally at http://localhost:${PORT}`);
});
