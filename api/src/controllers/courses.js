const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')

// @desc Get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/reviews/:id/courses
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query

  if (req.params.reviewId) {
    query = Course.find({ review: req.params.reviewId })
  } else {
    query = Course.find().populate({
      path: 'review',
      select: 'bandName albumName',
    })
  }

  const courses = await query

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  })
})
