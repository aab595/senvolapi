const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
			if (err) res.status(403).json("Jeton non valide !");
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json("Vous n'êtes pas authentifié !");
	}
};

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("Action non autorisée !");
		}
	});
};

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("Action non autorisée !");
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
