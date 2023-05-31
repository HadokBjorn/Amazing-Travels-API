import { db } from "../database/database.connections.js";

export async function createHotel(req, res) {
	const { id } = req.params;
	const { hotel, city_id, price_per_day, description } = req.body;
	try {
		await db.query(
			`INSERT INTO hotels (
            company_id,
            hotel,
            city_id,
            price_per_day,
            description
		) VALUES ($1,$2,$3,$4,$5)`,
			[Number(id), hotel, city_id, price_per_day, description]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
