import { db } from "../database/database.connections.js";

export function createCompanyDB(body) {
	const { company, email, hash } = body;
	return db.query(`INSERT INTO companies (company, email, password) VALUES ($1, $2, $3)`, [
		company,
		email,
		hash,
	]);
}

export function createSessionDB(body) {
	const { id, token } = body;
	return db.query(`INSERT INTO sessions (company_id, token) VALUES ($1,$2)`, [id, token]);
}

export function deleteTokenFromSessionDB(id, token) {
	return db.query(`DELETE FROM sessions WHERE company_id=$1 AND token !=$2 ;`, [Number(id), token]);
}

export function companyByEmailDB(email) {
	return db.query(`SELECT * FROM companies WHERE email=$1;`, [email]);
}
