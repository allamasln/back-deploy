const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

const sendRegisterEmail = (to, username) =>
	transporter.sendMail({
		from: '"Cuenta movies.com" <4nt0n10ll4m4s@gmail.com>',
		to,
		subject: 'Bienvenido a movies.com',
		html: `
		<b>Hola ${username}</b>
		<br>
		<p>Eres el mejor usuario de la historia. Te queremos.</p>
		`,
	})

const sendDailyEmail = (to, username, movies) => {
	transporter.sendMail({
		from: '"Cuenta movies.com" <4nt0n10ll4m4s@gmail.com>',
		to,
		subject: 'Películas recomendadas del día',
		html: `
		<b>Hola ${username}</b>
		<br>
		<p>Hoy te recomendamos esta lista de películas:</p>
		<ul>
			${movies.map((movie) => `<li>${movie.title}</li>`).join('')}
		</ul>
		`,
	})
}

exports.sendRegisterEmail = sendRegisterEmail
exports.sendDailyEmail = sendDailyEmail
