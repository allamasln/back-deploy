const { Movie } = require('../models/movie')
const cloudinary = require('../utils/cloudinary')

const mongoose = require('mongoose')
const getAll = async (req, res) => {
	let { page = 1, search, order } = req.query

	const query = {}
	let sort = {}

	const pageSize = 20
	const offset = (page - 1) * pageSize

	if (search) query.title = { $regex: search }

	if (order) sort[order] = 1

	const movies = await Movie.find(query).sort(sort).limit(pageSize).skip(offset)

	res.json(movies)
}

const getById = async (req, res) => {
	const movie = await Movie.findById(req.params.movieId)

	res.json(movie)
}

const create = async (req, res) => {
	const { path: image, filename: imageCloudinaryId } = req.file
	const newMovie = await Movie.create({
		...req.body,
		image,
		imageCloudinaryId,
	})

	res.json(newMovie)
}

const update = async (req, res) => {
	const { path: image, filename: imageCloudinaryId } = req.file

	const movie = await Movie.findByIdAndUpdate(req.params.movieId, {
		...req.body,
		image,
		imageCloudinaryId,
	})

	await cloudinary.uploader.destroy(movie.imageCloudinaryId, {
		invalidate: true,
	})

	res.json(movie)
}

const remove = async (req, res) => {
	const movie = await Movie.findByIdAndDelete(req.params.movieId)

	await cloudinary.uploader.destroy(movie.imageCloudinaryId, {
		invalidate: true,
	})

	res.json(movie)
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
}
