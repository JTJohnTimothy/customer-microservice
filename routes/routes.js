import jwt from 'jsonwebtoken'
import customerRoutes from './customer.js'
// import occupationRoutes from './occupation.js'

export default function (app) {
  const root = '/api/v1'

  /**
   * jwt token validation using environment service secret key
   */
  app.use((req, res, next) => {
    const token = req.headers.authorization
    if (!token) throw res.status(401).json({ message: 'No access credentials provided' })

    return jwt.verify(token.replace('Bearer ', ''), process.env.SERVICE_KEY, (err, decoded) => {
      if (err) res.status(401).json({ message: err })
      next()
    })
  })

  app.use(root + '/customers', customerRoutes())
  // include other possible routers here...
}
