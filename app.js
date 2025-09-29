require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const todosRouter = require('./routes/todos');``
const indexRouter = require('./routes/index');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// If deploy behind a proxy (Render/Heroku/Nginx), keep this:
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sid',
  store: new SQLiteStore({
    dir: './var',            // where to put the DB file
    db: 'sessions.sqlite',   // file name; auto-created if missing
  }),
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,               // don’t rewrite unchanged sessions
  saveUninitialized: true,    // only create session when used
  cookie: {
    httpOnly: true,            // JS can’t read the cookie
    sameSite: 'lax',           // good default vs CSRF
    secure: false,             // set true when you serve over HTTPS
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
}));

app.use('/', indexRouter);
app.use('/todos', todosRouter);

// Serve everything in /public at the root path (e.g., /stylesheets/style.css)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',          // cache static files for 1 day (tune as needed)
  etag: true,
  lastModified: true
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
