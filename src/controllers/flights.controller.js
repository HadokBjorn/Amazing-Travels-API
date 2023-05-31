import { db } from "../database/database.connections.js";

export async function createFlight(req, res) {
	const { id } = req.params;
	const { from_city_id, to_city_id, image, price, date, arrive_date } = req.body;
	try {
		await db.query(
			`INSERT INTO flights (
			company_id,
			from_city_id,
			to_city_id,
			image,
			price,
			date,
			arrive_date
		) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
			[Number(id), from_city_id, to_city_id, image, price, date, arrive_date]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getFlightsByCity(req, res) {
	const { id } = req.params;
	try {
		const flights = await db.query(
			`SELECT flights.image, flights.price, flights.date, flights.arrive_date, companies.company, cities.city 
			FROM flights 
            JOIN cities ON cities.id=$1
			JOIN companies ON companies.id=flights.company_id
			WHERE flights.to_city_id=$1`,
			[Number(id)]
		);
		if (flights.rowCount === 0) return res.sendStatus(404);
		res.send(flights.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
