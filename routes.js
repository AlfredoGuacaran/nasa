const express = require('express');
const router = express.Router();
const { renderHTML } = require('./helpersFunctions.js');
const { postUser, getUser } = require('./db.js');
const req = require('express/lib/request');

router.get('/:page', renderHTML);
router.get('/', renderHTML);

router.post('/signin', async (req, res) => {
  try {
    const { name, email, password, password_confirm } = req.body;

    if (password != password_confirm) {
      req.flash('errors', 'Contraseñas no coinciden');
      return res.redirect('/');
    }

    const newUser = await postUser(name, email, password);

    if (!newUser.ok) {
      req.flash('errors', newUser.error);
      return res.redirect('/');
    }

    req.flash('success', 'Usuario creado con exito');
    res.redirect('/');
  } catch (error) {
    console.log(error);
    req.flash('errors', error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await getUser(email);

    if (!user.ok) {
      req.flash('errors', user.error);
      return res.redirect('/login');
    }

    if (user.data.password == !password) {
      req.flash('errors', 'Contraseña o usuario incorrecto');
      return res.redirect('/login');
    }

    req.session.user = user.data;
    res.redirect('/evidencias');
  } catch (error) {
    console.log(error);
    req.flash('errors', error.message);
    res.redirect('/login');
  }
});

module.exports = router;
