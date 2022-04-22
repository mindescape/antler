const Review = require('../models/Review')

// @desc Get all reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()

    res.status(200).json({
      success: true,
      data: reviews,
      count: reviews.length,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({
      success: true,
      data: review,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc Create review
// @route POST /api/v1/reviews/
// @access Private
exports.createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body)

    res.status(201).json({
      success: true,
      data: review,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc Update review
// @route PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!review) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({
      success: true,
      data: review,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc Delete review
// @route DELETE /api/v1/reviews/:id
// @access Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)

    if (!review) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}
