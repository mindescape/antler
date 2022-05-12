const express = require('express')
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  uploadCover,
} = require('../controllers/reviews')

// Include other resource routers
const courseRouter = require('./courses')

const router = express.Router()

// Re-route into other resource routers
router.use('/:reviewId/courses', courseRouter)
router.route('/:id/cover').put(uploadCover)
router.route('/').get(getReviews).post(createReview)
router.route('/:id').get(getReview).put(updateReview).delete(deleteReview)

module.exports = router
