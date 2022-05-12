const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tutition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  review: {
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
    required: true,
  },
})

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (reviewId) {
  const arr = await this.aggregate([
    {
      $match: { review: reviewId },
    },
    {
      $group: {
        _id: '$review',
        averageCost: { $avg: '$tuition' },
      },
    },
  ])

  try {
    await this.model('Review').findByIdAndUpdate(reviewId, {
      averageCost: Math.round(arr[0].averageCost),
    })
  } catch (err) {
    console.log(err)
  }
}

// Call getAverageCost after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.review)
})

// Call getAverageCost after save
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.review)
})

module.exports = mongoose.model('Course', CourseSchema)
