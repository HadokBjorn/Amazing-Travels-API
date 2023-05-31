import { Router } from "express";
import { getCitiesByState, getStates } from "../controllers/cities.controller.js";
const citiesRouter = Router();

citiesRouter.get("/states", getStates);
citiesRouter.get("/states/:id/cities", getCitiesByState);

export default citiesRouter;
