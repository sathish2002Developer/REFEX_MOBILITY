require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const history = require("connect-history-api-fallback");
const status = require("./helpers/response");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-openidconnect");

const app = express();

app.set('trust proxy', 1);

const CORS_ORIGINS = (
  process.env.CORS_ORIGINS ||
  'http://localhost:5173,http://127.0.0.1:5173,https://refexmobility.com,https://www.refexmobility.com'
)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return CORS_ORIGINS.includes(origin);
}

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.header('Access-Control-Allow-Origin', origin || CORS_ORIGINS[0]);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma'
  );
  res.header('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'Pragma',
    ],
    optionsSuccessStatus: 200,
  })
);

// Middleware to parse incoming JSON data ==================================
app.use(express.json({  }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));







// Routes
app.use("/auth", require("./routes/auth"));

// CMS routes (home page content — public read/write for admin panel)
app.use("/api/cms", require("./routes/cms"));

// Admin routes - protected endpoints for admin panel
app.use("/api/admin", require("./routes/admin"));

// Investor routes - public endpoints for displaying files and protected endpoints for admin
app.use("/api/investor", require("./routes/investor"));

// Business commute routes
app.use("/api/business-commute", require("./routes/businessCommute"));

// Contact form route (email + Kissflow webhook queue)
app.use("/api", require("./routes/contactForm"));






// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running well",
    timestamp: new Date().toISOString()
  });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Test POST endpoint for CORS
app.post("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "POST CORS is working!",
    body: req.body,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// // simple route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Backend is running well",
//   });
// });

// app.use("/auth", require("./src/routes/auth"));

// app.use(
//   "/api",
//   require("./src/routes/user"),
//   require("./src/routes/dashboard"),
//   require("./src/routes/sales_management/customer"),
//   require("./src/routes/sales_management/lead"),
//   require("./src/routes/sales_management/quotation"),
//   require("./src/routes/sales_management/nsop_quotation"),
//   require("./src/routes/sales_management/proforma_invoice"),
//   require("./src/routes/sales_management/brief_sheet"),
//   require("./src/routes/trip_management/masters/operator"),
//   require("./src/routes/trip_management/masters/airport"),
//   require("./src/routes/trip_management/masters/aircraft"),
//   require("./src/routes/trip_management/masters/aircraft_model"),
//   require("./src/routes/trip_management/masters/country"),
//   require("./src/routes/trip_management/masters/city"),
//     require("./src/routes/trip_management/masters/zone"),
//   require("./src/routes/trip_management/masters/designation"),
//   require("./src/routes/trip_management/masters/crew"),
//   require("./src/routes/sales_management/quotation_download")
// );

// Image upload endpoint - MUST be before the catch-all API route
const uploadImage = require('./middlewares/uploadImage');
app.post('/api/upload/image', uploadImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Return the file path relative to the server
    const imageUrl = `/uploads/images/${req.file.filename}`;
    res.json({ 
      success: true, 
      imageUrl: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.all("/api/*", (req, res) => {
  return status.responseStatus(res, 404, "Endpoint Not Found");
});

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, "./dist")));
app.use(history());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

const PORT = Number(process.env.APP_PORT || 3007);

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

if (process.env.SKIP_DB_SYNC === 'true') {
  console.warn('SKIP_DB_SYNC=true — starting API without database sync');
  startServer();
} else {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Database synced successfully');
      startServer();
    })
    .catch((err) => {
      console.error('Error syncing database:', err);
      if (process.env.START_WITHOUT_DB === 'true') {
        console.warn('START_WITHOUT_DB=true — starting API despite DB error');
        startServer();
      }
    });
}
