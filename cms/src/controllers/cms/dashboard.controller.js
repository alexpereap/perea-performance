// cms home
const dashboard = (req, res) => {
  res.render('cms/dashboard');
};

// sign out
const signOut = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

module.exports = {
  dashboard,
  signOut,
};
