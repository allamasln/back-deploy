const mongoose = require('mongoose')
const { body } = require('express-validator')

const createUploader = require('../utils/multer')

const movieSchema = new mongoose.Schema({
	title: { type: String, required: true },
	sinopsis: { type: String, required: true },
	image: { type: String, require: true },
	imageCloudinaryId: { type: String, require: true },
})

const Movie = mongoose.model('Movie', movieSchema)

const movieValidation = [body('title').notEmpty(), body('sinopsis').notEmpty()]

const TYPES = {
	'image/jpeg': 'jpeg',
	'image/gif': 'gif',
	'image/png': 'png',
}

exports.Movie = Movie
exports.movieValidation = movieValidation
exports.uploadImage = createUploader(TYPES).single('image')
