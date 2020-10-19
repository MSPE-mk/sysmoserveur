const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// create express app
const app = express();
// Access-Control-Allow-Origin
app.use(cors());
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require produit routes
const produitRoutes = require('./src/routes/produit.routes')
// using as middleware
app.use('/api/v1/produits', produitRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});