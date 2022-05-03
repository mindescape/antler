const mongoose = require('mongoose')

const connectDB = async (uri) => {
  const { connection } = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB connected: ${connection.host}`.cyan.underline)
}

module.exports = connectDB
