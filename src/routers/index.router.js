import { Router } from "express";
import flightsRouter from "./flights.router.js";
import citiesRouter from "./cities.router.js";
import companyRouter from "./companies.router.js";
import hotelsRouter from "./hotels.router.js";

const routers = Router();

routers.use(flightsRouter);
routers.use(citiesRouter);
routers.use(companyRouter);
routers.use(hotelsRouter);

export default routers;
