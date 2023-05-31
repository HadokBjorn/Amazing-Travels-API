import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
	deleteTokenFromSessionDB,
	companyByEmailDB,
} from "../repositories/companies.repository.js";

dotenv.config();

export async function validateLogin(req, res, next) {
	const { email, password } = req.body;
	try {
		const agency = await companyByEmailDB(email);
		if (agency.rowCount === 0) return res.sendStatus(401);
		const correctPassword = bcrypt.compareSync(password, agency.rows[0].password);
		if (!correctPassword) return res.sendStatus(401);
		const { id, company } = agency.rows[0];
		const oneHour = 3600; //seconds
		const token = jwt.sign({ id, company }, process.env.JWT_SECRET, { expiresIn: oneHour });
		await deleteTokenFromSessionDB(id, token);

		res.locals.infos = { id, token, company };

		next();
	} catch (err) {
		res.status(500).send(err.message);
	}
}
