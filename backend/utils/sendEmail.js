const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: smtp.gmail.com,
			service: gmail,
			port: Number(587),
			secure: Boolean(true),
			auth: {
				user: "shailjajoshi59@gmail.com",
				pass: process.env.PASS
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};