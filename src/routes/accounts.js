const express = require('express');
const router = express.Router();

const { accounts } = require('../data');

// middleware that is specific to this router
/*router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
})*/

router.get('/savings', (req, res) => {
  res.render('account', {'title': 'Savings Summary', 'account': accounts.savings});
  return;
});
router.get('/checking', (req, res) => {
  res.render('account', {'title': 'Checking Summary', 'account': accounts.checking});
  return;
});
router.get('/credit', (req, res) => {
  res.render('account', {'title': 'Credit Summary', 'account': accounts.credit});
  return;
});

module.exports = router;

