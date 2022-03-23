const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.listen(3000, () => console.log('Servidor en puerto 3000'));

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  noCache: false,
  watch: true,
});

//renderiza las pagina
app.get('/:page', (req, res) => {
  let page = req.params.page.toLocaleLowerCase();
  page = page.charAt(0).toUpperCase() + page.slice(1);
  res.render(`${page}.html`);
});
