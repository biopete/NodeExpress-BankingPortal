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
/*app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
*/

/* Read Accounts and Users Data*/
const accountsInit = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'),{encoding: 'utf8'});
const accounts = JSON.parse(accountsInit);
console.log(accounts);

const usersInit = fs.readFileSync(path.join(__dirname, 'json', 'users.json'),{encoding: 'utf8'});
const users = JSON.parse(usersInit);
console.log(users);



app.get('/', (req, res) => {
  res.render('index', {'title': 'Accounts Summary', 'accounts': accounts});
  return;
});
app.get('/savings', (req, res) => {
  res.render('account', {'title': 'Savings Summary', 'account': accounts.savings});
  return;
});
app.get('/checking', (req, res) => {
  res.render('account', {'title': 'Checking Summary', 'account': accounts.checking});
  return;
});
app.get('/credit', (req, res) => {
  res.render('account', {'title': 'Credit Summary', 'account': accounts.credit});
  return;
});

app.get('/profile', (req, res) => {
  res.render('profile', {'title': 'Profile', 'user': users[0]});
  return;
});
app.listen(port, () => {
console.log(`Listening on ${port}`);
});
