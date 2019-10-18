export default (err, req, res, next) => {
  if (!err) return next()
  const status = err.status ? err.status : 500
  const message = err.message ? err.message : 'Server Error'
  return res.status(status).json({ message })
}
