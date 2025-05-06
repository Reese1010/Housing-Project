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

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(session({
  secret: 'housifyu_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.userId = req.session.userId || null;
  next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const subleaseRoutes = require('./routes/subleaseRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- NEW

// Pages
app.get('/', (req, res) => {
  res.render('home');
});

app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/sublet', subleaseRoutes);
app.use('/apartments', apartmentRoutes);
app.use('/', authRoutes); // <-- Register logout route

// Resources Page
app.get('/resources', (req, res) => {
  res.render('resources');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});