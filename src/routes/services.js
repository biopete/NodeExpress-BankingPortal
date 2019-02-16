const express = require('express');
const router = express.Router();

const {accounts} = require('../data');

router.get('/transfer', (req, res) => {
  res.render('transfer', {'title': 'Transfer', 'user': users[0]});
  return;
});
router.post('/transfer', (req, res) => {
  const {from, to, amount} = req.body;
  accounts[from].balance = accounts[from].balance - parseInt(amount);
  accounts[to].balance = accounts[to].balance + parseInt(amount);
  writeJSON();
  return res.render('transfer', {'message': 'Transfer Completed' });
});

router.get('/payment', (req, res) => {
  res.render('payment', {'title': 'Payment', 'account': accounts['credit']});
  return;
});
router.post('/payment', (req, res) => {
  const {amount} = req.body;
  accounts['credit'].balance = accounts['credit'].balance - parseInt(amount);
  accounts['credit'].available = accounts['credit'].available + parseInt(amount);
  writeJSON();
  return res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;