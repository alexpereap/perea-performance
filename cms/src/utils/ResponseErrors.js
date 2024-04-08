const cmsError = (req, res, message) => {
  req.session.cmsError = message;
  // goes to dashboard
  return req.session.save(() => res.redirect('/cms'));
};

module.exports = {
  cmsError,
};
