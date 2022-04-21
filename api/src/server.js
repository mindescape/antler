const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('../config/db')

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV

connectDB()

const reviews = require('./routes/reviews')

const app = express()

if (ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/reviews', reviews)

const server = app.listen(PORT, console.log(`Server is running in ${ENV} on ${PORT}`.yellow.bold))

// Handle rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
