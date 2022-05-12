const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')
const Review = require('../models/Review')

// @desc Get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/reviews/:id/courses
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.reviewId) {
    const courses = await Course.find({ review: req.params.reviewId })

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc Get single course
// @route GET /api/v1/courses/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'review',
    select: 'name description',
  })

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
  }

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc Add course
// @route POST /api/v1/reviews/:reviewId/courses
// @access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.review = req.params.reviewId

  const review = await Review.findById(req.params.reviewId)

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.reviewId}`), 404)
  }

  const course = await Course.create(req.body)

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc Update course
// @route PUT /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id)

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc Delete course
// @route DELETE /api/v1/courses/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
  }

  await course.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})
