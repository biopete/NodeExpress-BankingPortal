const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
/* Views template set up */
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

/* Static public */
app.use(express.static(path.join(__dirname, '/public/')));

/* Middleware */
app.use(express.urlencoded({extended: true}));

/* require data repo */
const { accounts, users, writeJSON } = require('./data');

/* Routes */
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
  res.render('index', {'title': 'Account Summary', 'accounts': accounts});
  return;
});

app.get('/profile', (req, res) => {
  res.render('profile', {'title': 'Profile', 'user': users[0]});
  return;
});


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
