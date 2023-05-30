import { db } from "../database/database.connections.js";

export async function getStates(req, res) {
	try {
		const states = await db.query(`SELECT states.id, states.state, states.uf 
        FROM states JOIN cities ON cities.state_id=states.id`);
		res.send(states.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getCitiesByState(req, res) {
	const { id } = req.params;
	try {
		//Quero as cidade do estado especifico
		const cities = await db.query(
			`SELECT cities.id, cities.city FROM cities
        JOIN states ON states.id=$1 AND cities.state_id=$1`,
			[Number(id)]
		);
		res.send(cities.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

/* export async function getFlightsByState(req, res) {
	const { state } = req.params;
	try {
		//Quero as cidade do estado especifico
		const flights = await db.query(
			`SELECT flights.image, flights.price, flights.date, companies.company, cities.city FROM flights 
            JOIN states ON states.state=$1
            JOIN companies ON companies.id=flights.company_id
            JOIN cities ON cities.state_id=states.id
            AND flights.to_city_id=cities.id AND `[state]
		);
		res.send(flights.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
} */
