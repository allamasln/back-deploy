const { movieValidation, uploadImage } = require('../models/movie')
const movieController = require('../controllers/movies')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const validate = require('../middlewares/validate')

const { Router } = require('express')

const router = Router()

const { query } = require('express-validator')

router.get(
	'/',
	query('page').isInt().optional(),
	query('order').isIn(['date', 'title']).optional(),
	validate,
	movieController.getAll
)

router.get(
	'/:movieId',
	mongoIdFromParamValidation('movieId'),
	movieController.getById
)

router.post('/', uploadImage, movieValidation, validate, movieController.create)
router.put(
	'/:movieId',
	uploadImage,
	mongoIdFromParamValidation('movieId'),
	movieValidation,
	validate,
	movieController.update
)
router.delete(
	'/:movieId',
	mongoIdFromParamValidation('movieId'),
	movieController.remove
)

module.exports = router
