const axios = require('axios');

const home = (req, res) => {
  let loginError = '';
  if (typeof (req.session.loginError) !== 'undefined') {
    loginError = req.session.loginError;
    console.log(loginError);
    delete req.session.loginError;
  }
  res.render('login', { loginError });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await axios.post(
      'http://pereaperformance.local/api/auth/login',
      {
        username,
        password,
      },
    );

    // TODO complete login
    console.log(response);
    res.send('trying to login');
  } catch (e) {
    let errMsg = `Unexpected error occured: ${e.message}`;
    if (e.response.status === 401) {
      errMsg = 'Wrong username or password';
    }

    req.session.loginError = errMsg;
    res.redirect('/');
  }
};

module.exports = {
  home,
  login,
};
