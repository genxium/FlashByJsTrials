const baseAbsPath = __dirname + '/';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

// To allow API access from CDN distributed webpages.
const corsOptions = {
  origin: function(origin, callback) {
    // Temporarily allowing all CORS access.
    callback(null, true)
  }
};
app.use(cors(corsOptions));

// Mount static resource entry, reference http://expressjs.com/en/api.html
app.use('/', express.static(baseAbsPath + './static'));

// Body parser middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: '*/*' }));

// Pug template. Reference http://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'pug');
app.set('views', baseAbsPath + './pugs');

const portToListen = 8080;
http.listen(portToListen, function() {
  console.info('auth_server listening at ' + portToListen);
});

process.on('uncaughtException', function (err) {
  console.error(err.stack);
})
