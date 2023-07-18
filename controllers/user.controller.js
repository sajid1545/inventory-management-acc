const { signupService, findUserByEmail } = require("../services/user.services");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
	try {
		const user = await signupService(req.body);

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
