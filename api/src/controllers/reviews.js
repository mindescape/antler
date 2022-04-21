// @desc Get all reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = (req, res, next) => {
  res.status(200).json({ success: true, data: 'List all reviews' })
}

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = (req, res, next) => {
  res.status(200).json({ success: true, data: `Get review ${req.params.id}` })
}

// @desc Create review
// @route POST /api/v1/reviews/
// @access Private
exports.createReview = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Create new review' })
}

// @desc Update review
// @route PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = (req, res, next) => {
  res.status(200).json({ success: true, data: `Update review ${req.params.id}` })
}

// @desc Delete review
// @route DELETE /api/v1/reviews/:id
// @access Private
exports.deleteReview = (req, res, next) => {
  res.status(200).json({ success: true, data: `Delete review ${req.params.id}` })
}
