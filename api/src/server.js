const express = require('express')
const dotenv = require('dotenv')

// Load env
dotenv.config({ path: './config/config.env' })

// Route files
const reviews = require('./routes/reviews')

const app = express()

// Mount routers
app.use('/api/v1/reviews', reviews)

const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`Server is running in ${ENV} on ${PORT}`))
