export default (req, res, next) => {
  console.log(req);
  if (req.headers.user === 'admin') {
    return next();
  }
  return next('access error');
}
