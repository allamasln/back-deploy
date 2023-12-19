const cron = require('node-cron')

const { sendDailyEmail } = require('../utils/nodemailer')

const { User } = require('../models/user')
const { Movie } = require('../models/movie')

module.exports = () => {
	cron.schedule('*/5 * * * * *', async () => {
		const users = await User.find({ notification: true })
		const movies = await Movie.find()

		users.forEach((user) => sendDailyEmail(user.email, user.username, movies))
	})
}
