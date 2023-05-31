import { Router } from "express";
import {
	createHotel,
	getHotelComfortAndFeatures,
	getHotelsByCity,
	postHotelComfort,
	postHotelFeature,
	postHotelImages,
} from "../controllers/hotels.controller.js";

const hotelsRouter = Router();

hotelsRouter.post("/companies/:id/hotel", createHotel);
hotelsRouter.post("/hotels/:id/image", postHotelImages);
hotelsRouter.post("/hotels/:id/feature", postHotelFeature);
hotelsRouter.post("/hotels/:id/comfort", postHotelComfort);

hotelsRouter.get("/cities/:id/hotels", getHotelsByCity);
hotelsRouter.get("/hotels/:id/comforts-features", getHotelComfortAndFeatures);

export default hotelsRouter;
