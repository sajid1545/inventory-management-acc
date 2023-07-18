const nodemailer = require("nodemailer");

exports.sendEmailWithGmail = async (data) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.SENDER_MAIL,
			pass: process.env.APP_PASS,
		},
	});

	const mailOptions = {
		from: process.env.SENDER_MAIL,
		to: data.to,
		subject: data.subject,
		text: data.text,
    };
    
	const result = await transporter.sendMail(mailOptions);
	
	return result;
};
