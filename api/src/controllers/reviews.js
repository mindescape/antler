const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Review = require('../models/Review')

// @desc Get all reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`Review with id ${req.params.id} has not been found`, 404))
  }

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc Create review
// @route POST /api/v1/reviews/
// @access Private
exports.createReview = asyncHandler(async (req, res, next) => {
  const review = await Review.create(req.body)

  res.status(201).json({
    success: true,
    data: review,
  })
})

// @desc Update review
// @route PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!review) {
    return next(new ErrorResponse(`Review with id ${req.params.id} has not been found`, 404))
  }

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc Delete review
// @route DELETE /api/v1/reviews/:id
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`Review with id ${req.params.id} has not been found`, 404))
  }

  review.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc Upload album cover
// @route PUT /api/v1/reviews/:id
// @access Private
exports.uploadCover = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`Review with id ${req.params.id} has not been found`, 404))
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.file

  // Validation
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image`, 400))
  }
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(new ErrorResponse(`Image is too large`, 400))
  }

  file.name = `cover_${review._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 400))
    }

    await Review.findByIdAndUpdate(req.params.id, {
      cover: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
