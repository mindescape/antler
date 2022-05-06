const mongoose = require('mongoose')
const slugify = require('slugify')

const ReviewSchema = new mongoose.Schema(
  {
    bandName: {
      type: String,
      required: [true, 'Please fill a band name'],
      trim: true,
      maxlength: [50, 'Band name cannot be more than 50 characters :('],
    },
    slug: String,
    albumName: {
      type: String,
      required: [true, 'Please fill an album name'],
      trim: true,
      maxlength: [50, 'Album name cannot be more than 50 characters :('],
    },
    reviewBody: {
      type: String,
      required: [true, 'Please tell us a few words about the record'],
      minlength: [10, 'Review cannot be that small!'],
    },
    genres: {
      type: [String],
      required: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    descriptors: {
      type: [String],
      required: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    cover: {
      type: String,
      default: 'no-cover.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Create review slug from the name
ReviewSchema.pre('save', function (next) {
  console.log('Slugify ran', this)
  const slugSource = this.bandName.concat(' ', this.albumName)
  this.slug = slugify(slugSource, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })
  next()
})

// Cascade deletes courses when a review is deleted
ReviewSchema.pre('remove', async function (next) {
  console.log(`Courses being remove from review ${this._id}`)
  await this.model('Course').deleteMany({ review: this._id })
  next()
})

// Reverse populate with virtuals
ReviewSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'review',
  justOne: false,
})

module.exports = mongoose.model('Review', ReviewSchema)
