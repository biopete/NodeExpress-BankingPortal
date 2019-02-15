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

app.get('/', (req, res) => {
  res.render('index', {'title': 'Index'});
  return;
});

app.listen(port, () => {
console.log(`Listening on ${port}`);
});
