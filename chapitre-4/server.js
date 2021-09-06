const express = require("express");
const app = express();
const PORT = 3000;
// Libraries
const expressValidator = require("express-validator");
const passwordValidator = require("password-validator");

app.use(express.json());

app.post(
	"/users",
	expressValidator.body("email").isEmail(),
	expressValidator.body("password").custom((value) => {
		const schema = new passwordValidator();

		schema
        .is().min(8) // Minimum length 8
        .is().max(100) // Maximum length 100
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits(2) // Must have at least 2 digits
        .has().not().spaces() // Should not have spaces

		return schema.validate(value);
	}),
	(req, res) => {
		const errors = expressValidator.validationResult(req);

		if (errors.isEmpty()) {
			res.json({
				status: "OK",
				message: "Utilisateur créé avec succès !",
				data: {
					email: req.body.email,
				},
			});
		} else {
			res.json({
				status: "error",
				message: "Le formulaire n'est pas correct",
			});
		}
	}
);

app.listen(PORT, () => {
	console.log("Server listening...");
});