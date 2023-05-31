import { db } from "../database/database.connections.js";
import bcrypt from "bcrypt";
import { createCompanyDB, createSessionDB } from "../repositories/companies.repository.js";

export async function createCompany(req, res) {
	const { company, email, password } = req.body;
	const hash = bcrypt.hashSync(password, 10);
	try {
		await createCompanyDB({ company, email, hash });
		res.sendStatus(201);
	} catch (err) {
		if (err.code === "23505") return res.sendStatus(409);
		res.status(500).send(err.message);
	}
}

export async function loginCompany(req, res) {
	try {
		const { id, token, company } = res.locals.infos;
		await createSessionDB({ id, token });
		res.status(200).send({ token: token, company: company });
	} catch (err) {
		res.status(500).send(err.message);
	}
}
