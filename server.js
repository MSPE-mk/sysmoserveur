const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');


// create express app
const app = express();
// use Upload Module
app.use(fileUpload());
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

app.post('/upload', function(req, res) {
  console.log(req.files.uploadedImg.name);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.uploadedImg;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+'/uploads/climatiseurs/'+req.files.uploadedImg.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
// Require produit routes
const produitRoutes = require('./src/routes/produit.routes')
// using as middleware
app.use('/api/v1/produits', produitRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});