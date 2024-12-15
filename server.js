const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Commit data URL
const DATA_URL = 'https://snk-one.vercel.app/api/github-user-contribution/';

// Generate SVG with animation
const generateSVG = (commitData, duration = 1, isDark) => {
  const squares = commitData.map(
    (commit, index) => {
      const delay = (index * 0.005).toFixed(1); // Delay for animation
      const emptyBlockColor = isDark == true ? "hsl(120, 1.80%, 32.00%)" : "hsl(120, 1.80%, 80.00%)";
      const cellColor = commit.level == 0 ? emptyBlockColor :  `hsl(130, 70%, ${(commit.level * 10) + 10}%)`;
      const animationClass = commit.level == 0 ? "" : `animation: pop ${duration}s ${delay}s infinite;`
      const sizeFactor = 1.7
      return `
        <rect
          x="${(commit.x * 12) * sizeFactor}" y="${(commit.y * 12) * sizeFactor}"
          width="${10 * sizeFactor}" height="${10 * sizeFactor}"
          fill="${cellColor}"
          opacity="1"
          style="${animationClass}"
        />`;
    }
  );

  return `
    <svg xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;" viewBox="-5 -5 1100 150">
      <style>
        @keyframes pop {
          0% { opacity: .8; filter: blur(0px) saturate(1) drop-shadow(0px 0px 0px black); }
          50% { opacity: 1; filter: blur(0px) saturate(0) drop-shadow(1px 2px 2px black); }
          100% { opacity: .8; filter: blur(0px) saturate(1) drop-shadow(0px 0px 0px black); }
        }
      </style>
      ${squares.join('\n')}
    </svg>
  `;
};

// Route to serve the animated SVG
app.get('/animated-commits', async (req, res) => {
  try {
    const username = req.query.username;

    if(!username){
      return res.status(400).send('Username is required'); 
    }

    const style = req.query.style;
    if(!style){
      return res.status(400).send('Style is required'); 
    }

    const isDark = req.query.isDark && JSON.parse(req.query.isDark.toLowerCase()) || false;
    const duration = req.query.duration || 2;

    const { data: commitData } = await axios.get(DATA_URL+username);
    // Generate the SVG content
    const svg = generateSVG(commitData,duration,isDark);

    // Set the content type to SVG
    res.set('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error fetching commit data:', error);
    res.status(500).send('Failed to generate SVG.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
