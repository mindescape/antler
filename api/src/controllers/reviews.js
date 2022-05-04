const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Review = require('../models/Review')

// @desc Get all reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query }

  const fieldsToRemove = ['select', 'sort', 'page', 'limit']
  fieldsToRemove.forEach((param) => {
    delete reqQuery[param]
  })

  let queryStr = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
  let query = Review.find(JSON.parse(queryStr))

  if (req.query.select) {
    const fields = req.query.select.replace(/\,/, ' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.replace(/\,/, ' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10
  const startInd = (page - 1) * limit

  query = query.skip(startInd).limit(limit)

  const reviews = await query

  res.status(200).json({
    success: true,
    data: reviews,
    count: reviews.length,
  })
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
  const review = await Review.findByIdAndDelete(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`Review with id ${req.params.id} has not been found`, 404))
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})
