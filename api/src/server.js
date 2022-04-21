const express = require('express')
const dotenv = require('dotenv')

// Load env
dotenv.config({ path: './config/config.env' })

const app = express()

app.get('/api/v1/reviews', (req, res) => {
  res.status(200).json({ success: true, data: 'List all reviews' })
})

app.get('/api/v1/reviews/:id', (req, res) => {
  res.status(200).json({ success: true, data: `Get review ${req.params.id}` })
})

app.post('/api/v1/reviews', (req, res) => {
  res.status(200).json({ success: true, data: 'Create new review' })
})

app.put('/api/v1/reviews/:id', (req, res) => {
  res.status(200).json({ success: true, data: `Update review ${req.params.id}` })
})

app.delete('/api/v1/reviews/:id', (req, res) => {
  res.status(200).json({ success: true, data: `Delete review ${req.params.id}` })
})

const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`Server is running in ${ENV} on ${PORT}`))
