import { Router } from "express";
import { createCity, getCitiesByState, getStates } from "../controllers/cities.controller.js";
const citiesRouter = Router();

citiesRouter.get("/states", getStates);
citiesRouter.get("/states/:id/cities", getCitiesByState);

citiesRouter.post("/states/:id/citie", createCity);

export default citiesRouter;
