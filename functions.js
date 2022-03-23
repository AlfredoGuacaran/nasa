const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  noCache: false,
  watch: true,
});
