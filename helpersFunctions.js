const renderHTML = (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    const user = req.session.user;
    if (!req.params.page) req.params.page = 'signin';
    if (req.params.page == 'favicon.ico') return;
    let page = req.params.page.toLocaleLowerCase();
    page = page.charAt(0).toUpperCase() + page.slice(1) + '.html';
    res.render(page, { errors, success, user });
  } catch (error) {
    throw error.message;
  }
};

module.exports = { renderHTML };
