const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Models
const Apartment = require('./models/apartment');
const Sublease = require('./models/sublease');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup sessions (needed before flash)
app.use(session({
  secret: 'housifyu_secret', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Setup flash
app.use(flash());

// Middleware to pass flash messages to all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.userId = req.session.userId || null; 
  next();
});

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import route files
const loginRoutes = require('./routes/loginRoutes');
const subleaseRoutes = require('./routes/subleaseRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes'); 

// --- Routes ---

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Apartments page + detail
app.use('/apartments', apartmentRoutes);

// Sublet forum pages
app.use('/sublet', subleaseRoutes);

// Login & Register
app.use('/login', loginRoutes);

// --- End Routes ---

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});