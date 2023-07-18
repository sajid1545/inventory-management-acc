const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
	try {
		const token = req.headers?.authorization.split(" ")?.[1];
		if (!token) {
			return res.status(401).json({
				status: "fail",
				error: "You are not logged in",
			});
		}

		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		req.user = decoded;

		next();
    } catch (error) {
        return res.status(401).json({
            status: "fail",
            error: "Invalid Token",
        });
    }
};
