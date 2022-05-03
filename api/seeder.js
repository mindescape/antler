const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })
const URI = process.env.MONGO_URI || null

// Load models
const Review = require('./src/models/Review')

// Connect to DB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Read JSON files
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'))

// Import into DB
const importData = async () => {
  try {
    await Review.create(reviews)

    console.log('Data imported'.green.inverse)
    process.exit()
  } catch (err) {
    console.log(err.red)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Review.deleteMany()

    console.log('Data destroyed'.red.inverse)
    process.exit()
  } catch (err) {
    console.log(err.red)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
