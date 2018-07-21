const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3040;

app.use('/app', express.static(__dirname + '/app'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(morgan('dev'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function() {
  console.log("server started on port: "+port);
});