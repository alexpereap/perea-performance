/**
 * It will verify if the token is valid against the backend service
 */
const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    await axios.post(
      `${process.env.BACKEND_URL}/api/auth/isauthorized`,
      {},
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      },
    );

    res.locals.cmsError = null;
    res.locals.cmsSuccess = null;

    // shows temporal error message on CMS
    if (typeof (req.session.cmsError) !== 'undefined') {
      res.locals.cmsError = req.session.cmsError;
      delete req.session.cmsError;
      return req.session.save(() => next());
    }

    // shows temporal success message on CMS
    if (typeof (req.session.cmsSuccess) !== 'undefined') {
      res.locals.cmsSuccess = req.session.cmsSuccess;
      delete req.session.cmsSuccess;
      return req.session.save(() => next());
    }

    next();
  } catch (e) {
    req.session.loginError = e.message;
    if (e.hasOwnProperty('response') && e.response.status === 401) {
      req.session.loginError = 'You are not authorized to visit this page';
    }

    // goes to dashboard
    req.session.save(() => res.redirect('/'));
  }
};
