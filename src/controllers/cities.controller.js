import { db } from "../database/database.connections.js";

export async function createCity(req, res) {
	const { id } = req.params;
	const { city } = req.body;
	try {
		await db.query(
			`INSERT INTO cities (
            state_id,
			city
		) VALUES ($1,$2)`,
			[Number(id), city]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getStates(req, res) {
	try {
		const states = await db.query(`SELECT states.id, states.state, states.uf 
        FROM states
		JOIN cities ON cities.state_id=states.id
		JOIN flights ON flights.to_city_id=cities.id
		GROUP BY (STATES.ID)
		`);
		res.send(states.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getCitiesByState(req, res) {
	const { id } = req.params;
	try {
		const cities = await db.query(
			`SELECT cities.id, cities.city FROM cities
            JOIN states ON states.id=$1 AND cities.state_id=$1`,
			[Number(id)]
		);
		if (cities.rowCount === 0) return res.sendStatus(404);

		res.send(cities.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}
