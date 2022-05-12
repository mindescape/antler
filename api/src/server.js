const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const colors = require('colors')
const path = require('path')

const errorHandler = require('./middleware/error')
const connectDB = require('../config/db')
const reviews = require('./routes/reviews')
const courses = require('./routes/courses')

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV
const MONGO_URI = process.env.MONGO_URI || null

if (MONGO_URI) connectDB(MONGO_URI)

const app = express()

// Middlewares
if (ENV === 'development') app.use(morgan('dev'))
app.use(express.json())
app.use(fileupload())
app.use('/api/v1/reviews', reviews)
app.use('/api/v1/courses', courses)
app.use(errorHandler)

app.use(express.static(path.join(__dirname, '../public')))

const server = app.listen(PORT, console.log(`Server is running in ${ENV} on ${PORT}`.yellow.bold))

// Handle rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
