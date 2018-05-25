const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

const listen = app.listen(PORT);
console.log(`Application started on port: ${listen.address().port}`);
