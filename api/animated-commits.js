const express = require('express');
const axios = require('axios');
const app = express();


// Commit data URL
const DATA_URL = 'https://snk-one.vercel.app/api/github-user-contribution/';

const STYLES = [
  {
    name: "hue-ripple",
    styles: "",
    keyframes: `@keyframes pop {
  0% { opacity: .8; filter: hue-rotate(0deg); }
  50% { opacity: 1; filter: hue-rotate(180deg); }
  100% { opacity: .8; filter: hue-rotate(360deg); }
}`
  },
  {
    name: "blur-ripple",
    styles: "",
    keyframes: `@keyframes pop {
  0% { opacity: .8; filter: blur(0px) saturate(1) drop-shadow(0px 0px 0px black); }
  50% { opacity: 1; filter: blur(0px) saturate(0) drop-shadow(1px 2px 2px black); }
  100% { opacity: .8; filter: blur(0px) saturate(1) drop-shadow(0px 0px 0px black); }
}`
  },
  {
    name: "scale-ripple",
    isInverted: false,
    styles: "",
    keyframes: `@keyframes pop {
  0% { opacity: .8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
  100% { opacity: .8; transform: scale(1); }
}`
  },
  {
    name: "rotate",
    isInverted: false,
    styles: "",
    keyframes: `@keyframes pop {
  0% { opacity: .8; transform: rotate(0deg); }
  100% { opacity: 1; transform: rotate(360deg); }
}`
  },
  {
    name: "fall",
    isInverted: false,
    styles: "",
    keyframes: `@keyframes pop {
  20% { opacity: 1; transform: translateY(0px) }
  30% { opacity: 1; transform: translateY(200px)}
  31% { opacity: 0; transform: translateY(200px)}
  50% { opacity: 0; transform: translateY(-200px)}
  90% { opacity: 0; transform: translateY(-200px) }
}`
  },
  {
    name: "fall-invert",
    isInverted: true,
    styles: "",
    keyframes: `@keyframes pop {
  20% { opacity: 1; transform: translateY(0px) }
  30% { opacity: 1; transform: translateY(200px)}
  31% { opacity: 0; transform: translateY(200px)}
  50% { opacity: 0; transform: translateY(-200px)}
  90% { opacity: 0; transform: translateY(-200px) }
}`
  },
];

const resolveStyle = (style) => {
  const keyframe = STYLES.find(st => st.name == style) ?? STYLES.find(st => st.name == "blur-ripple");
  return keyframe;
}

const resolveRectStyles = (style, duration, delay, commit) => {
  if (style.isInverted) {
    return commit.level == 0 ? `animation: pop ${duration}s ${delay}s infinite;` : ""
  }
  return commit.level == 0 ? "" : `animation: pop ${duration}s ${delay}s infinite;`
}

const generateSVG = (commitData, styleStr = "hue-ripple", duration = 1, isDark) => {
  const style = resolveStyle(styleStr);

  const squares = commitData.map(
    (commit, index) => {
      const delay = (index * 0.005).toFixed(1);
      const emptyBlockColor = isDark == true ? "hsl(215, 21%, 11%)" : "hsl(120, 1.80%, 80.00%)";
      const cellColor = commit.level == 0 ? emptyBlockColor : `hsl(130, 70%, ${(commit.level * 10) + 10}%)`;

      const animationClass = resolveRectStyles(style, duration, delay, commit);
      const sizeFactor = 1.7
      return `
        <rect
          x="${(commit.x * 12) * sizeFactor}" 
          y="${(commit.y * 12) * sizeFactor}"
          width="${10 * sizeFactor}" 
          height="${10 * sizeFactor}"
          fill="${cellColor}"
          opacity="1"
          style="${animationClass}"
          rx="4" 
          ry="4"
        />`;
    }
  );

  return `
    <svg xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;" viewBox="-5 -5 1100 150">
      <style>
        rect{
          transform-origin: center;
          transform-box: border-box;
        }
        ${style.keyframes}
      </style>
      ${squares.join('\n')}
    </svg>
  `;
};

// Route to serve the animated SVG
app.get('/api/animated-commits', async (req, res) => {
  try {
    const username = req.query.username;

    if (!username) {
      return res.status(400).send('Username is required');
    }

    const style = req.query.style;
    if (!style) {
      return res.status(400).send('Style is required');
    }

    const isDark = req.query.isDark && JSON.parse(req.query.isDark.toLowerCase()) || false;
    const duration = req.query.duration || 2;

    const { data: commitData } = await axios.get(DATA_URL + username);
    // Generate the SVG content
    const svg = generateSVG(commitData, style, duration, isDark);

    // Set the content type to SVG
    res.set('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error fetching commit data:', error);
    res.status(500).send('Failed to generate SVG.');
  }
});

module.exports = app;