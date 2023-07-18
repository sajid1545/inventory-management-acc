const { signupService, findUserByEmail, findUserByToken } = require("../services/user.services");
const { sendEmailWithGmail } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
	try {
		const user = await signupService(req.body);

		const token = user.generateConfirmationToken();

		await user.save({ validateBeforeSave: false });

		const mailData = {
			to: user.email,
			subject: "Verify your account",
			text: `Hi ${user.firstName}, welcome to our app. Please verify your account from : ${
				req.protocol
			}://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
		};

		const result = await sendEmailWithGmail(mailData);

		
		res.status(200).json({
			status: "success",
			message: "Successfully signed up",
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				status: "fail",
				message: "Please provide credentials",
			});
		}

		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(400).json({
				status: "fail",
				message: "User not found",
			});
		}

		const isPasswordValid = user.comparePassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid credentials",
			});
		}

		if (user.status !== "active") {
			return res.status(403).json({
				status: "failed",
				error: "Your account is not active yet.",
			});
		}

		const token = generateToken(user);

		const { password: pwd, ...others } = user.toObject();

		res.status(200).json({
			status: "success",
			data: {
				others,
				token,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error,
		});
	}
};

exports.getMe = async (req, res) => {
	try {
		const user = await findUserByEmail(req.user?.email);
		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error,
		});
	}
};

exports.confirmEmail = async (req, res) => {
	try {
		const { token } = req.params;

		const user = await findUserByToken(token);

		user.status = "active";
		user.confirmationToken = undefined;
		user.confirmationTokenExpires = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(200).json({
			status: "success",
			message: "Successfully verified your email",
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error,
		});
	}
};
