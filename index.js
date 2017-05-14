const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const host = 'localhost';

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});