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

/* Read Accounts and Users Data*/
const accountData= fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'),{encoding: 'utf8'});
const accounts = JSON.parse(accountData);

const userData= fs.readFileSync(path.join(__dirname, 'json', 'users.json'),{encoding: 'utf8'});
const users = JSON.parse(userData);



app.get('/', (req, res) => {
  res.render('index', {'title': 'Account Summary', 'accounts': accounts});
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
app.get('/transfer', (req, res) => {
  res.render('transfer', {'title': 'Transfer', 'user': users[0]});
  return;
});
app.post('/transfer', (req, res) => {
  const {from, to, amount} = req.body;
  accounts[from].balance = accounts[from].balance - parseInt(amount);
  accounts[to].balance = accounts[to].balance + parseInt(amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');
  return res.render('transfer', {'message': 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', {'title': 'Payment', 'account': accounts['credit']});
  return;
});
app.post('/payment', (req, res) => {
  const {amount} = req.body;
  accounts['credit'].balance = accounts['credit'].balance - parseInt(amount);
  accounts['credit'].available = accounts['credit'].available + parseInt(amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON,'utf8');
  return res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
