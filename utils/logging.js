import fs from 'fs'
import winston from 'winston'

// create log/app on server start if does not exist
const logFileName = 'logfile.log'
const logPath = ['log', 'app']
let fullLogPath = ''
logPath.forEach((dir) => {
  if (fullLogPath === '') fullLogPath = dir
  else fullLogPath = fullLogPath + '/' + dir

  if (!fs.existsSync(fullLogPath)) {
    fs.mkdirSync(fullLogPath)
  }
})

export const transportToConsole = {
  transports: [new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
    )
  })],
  meta: false,
  msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
  level: (req, res) => {
    const { statusCode } = res
    let level = ''

    if (statusCode < 400) {
      level = 'info'
    } else if (statusCode > 400 && statusCode < 500) {
      level = 'warn'
    } else {
      level = 'error'
    }

    return level
  }
}

export const transportToFile = {
  transports: [
    new winston.transports.File({
      filename: fullLogPath + '/' + logFileName,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    })
  ],
  level: (req, res) => {
    const { statusCode } = res
    let level = ''

    if (statusCode < 400) {
      level = 'info'
    } else if (statusCode > 400 && statusCode < 500) {
      level = 'warn'
    } else {
      level = 'error'
    }

    return level
  }
}
