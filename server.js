import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import routes from './routes/routes.js'
import expressWinston from 'express-winston'
import errorHandler from './middleware/errorHandler.js'
import { transportToFile, transportToConsole } from './utils/logging.js'

/**
 * set environment variables
 */
const config = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
dotenv.config({ path: `./config/${config}.env` })
const { ENVIRONMENT, GATEWAY_PORT, GATEWAY_HOST, MONGODB_DBNAME, MONGODB_HOST, MONGODB_PORT } = process.env

const app = express()
app.use(express.json())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * middleware logger info
 */
app.use(expressWinston.logger(transportToConsole))
app.use(expressWinston.logger(transportToFile))

/**
 * set routes to be exp
 */
routes(app)

/**
 * api error handling
 */
app.use(errorHandler)

/**
 * create mongodb database connection
 */
mongoose.Promise = global.Promise
const mongoDBUrl = `${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(`Successfully connected to mongo database ${mongoDBUrl}`)
    /**
     * server start, database connection dependent
     */
    app.listen(GATEWAY_PORT, () => {
      console.log(`listening to ${GATEWAY_HOST}:${GATEWAY_PORT} using ${ENVIRONMENT}.env`)
    })
  })
  .catch(error => console.log(`Encountered error while connecting to database: ${error}`))

export default app
