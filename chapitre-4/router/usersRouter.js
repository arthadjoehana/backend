const express = require("express");
const router = express.Router();

// ici, on est dans /users

router.get("/", (_req, res) => {
	res.json({
		status: "OK",
		message: "No users yet",
	});
});

module.exports = router;