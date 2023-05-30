import { Router } from "express";
import travelsRouter from "./travels.router.js";
import citiesRouter from "./cities.router.js";

const routers = Router();

routers.use(travelsRouter);
routers.use(citiesRouter)

export default routers;
