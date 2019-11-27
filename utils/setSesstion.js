const setSession = (user, res) => {
  let auth_user = `${user.userName}`;
  res.cookie('Auth_cookie', auth_user, {
    path: '/',
    signed: true,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}