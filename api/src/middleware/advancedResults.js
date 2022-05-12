const advancedResults = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query }

  const fieldsToRemove = ['select', 'sort', 'page', 'limit']
  fieldsToRemove.forEach((param) => {
    delete reqQuery[param]
  })

  let queryStr = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
  let query = model.find(JSON.parse(queryStr))

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

  if (populate) {
    query = query.populate(populate)
  }

  const result = await query

  res.advancedResults = {
    success: true,
    count: result.length,
    data: result,
  }

  next()
}

module.exports = advancedResults
