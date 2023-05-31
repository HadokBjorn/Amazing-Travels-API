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

export async function postHotelImages(req, res) {
	const { id } = req.params;
	const { image } = req.body;
	try {
		await db.query(
			`INSERT INTO images (
            hotel_id,
			image
		) VALUES ($1,$2)`,
			[Number(id), image]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function postHotelFeature(req, res) {
	const { id } = req.params;
	const { feature } = req.body;
	try {
		await db.query(
			`INSERT INTO features (
            hotel_id,
			feature
		) VALUES ($1,$2)`,
			[Number(id), feature]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function postHotelComfort(req, res) {
	const { id } = req.params;
	const { comfort } = req.body;
	try {
		await db.query(
			`INSERT INTO comforts (
            hotel_id,
			comfort
		) VALUES ($1,$2)`,
			[Number(id), comfort]
		);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getHotelsByCity(req, res) {
	const { id } = req.params;
	try {
		const hotels = await db.query(
			`SELECT hotels.hotel, hotels.price_per_day, hotels.description, json_agg(json_build_object(
			'image',images.image)) as images
			FROM hotels
			JOIN images ON images.hotel_id=hotels.id
			JOIN cities ON cities.id=hotels.city_id AND cities.id = $1
			GROUP BY (hotels.hotel, hotels.price_per_day, hotels.description); 
			`,
			[Number(id)]
		);
		if (hotels.rowCount === 0) return res.sendStatus(404);
		res.send(hotels.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getHotelComfortAndFeatures(req, res) {
	const { id } = req.params;
	try {
		const comforts = await db.query(
			`SELECT comfort FROM comforts WHERE comforts.hotel_id=$1 
			`,
			[Number(id)]
		);
		const features = await db.query(
			`SELECT feature FROM features WHERE features.hotel_id=$1 
			`,
			[Number(id)]
		);
		if (comforts.rowCount === 0 && features.rowCount === 0) return res.sendStatus(404);
		res.send({
			comforts: comforts.rows,
			features: features.rows,
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
}
