const axios = require('axios');

const home = (req, res) => {
  let loginError = '';

  // sets flash error
  if (typeof (req.session.loginError) !== 'undefined') {
    loginError = req.session.loginError;
    delete req.session.loginError;
    req.session.save();
  }
  // goes to dashboard if an access token is available
  if (typeof req.session.accessToken !== 'undefined') {
    return res.redirect('/dashboard');
  }

  res.render('login', { loginError });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/login`,
      {
        username,
        password,
      },
    );

    // stores access token into the session
    const { accessToken } = response.data;
    req.session.accessToken = accessToken;
    // goes to dashboard
    req.session.save(() => res.redirect('/dashboard'));
  } catch (e) {
    let errMsg = `Unexpected error occured: ${e.message}`;
    if (e.hasOwnProperty('response') && e.response.status === 401) {
      errMsg = 'Wrong username or password';
    }

    req.session.loginError = errMsg;
    // goes to dashboard
    req.session.save(() => res.redirect('/'));
  }
};

module.exports = {
  home,
  login,
};
