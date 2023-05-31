import { Router } from "express";
import { createFlight, getFlightsByCity } from "../controllers/flights.controller.js";

const flightsRouter = Router();

flightsRouter.post("/companies/:id/flight", createFlight);
flightsRouter.get("/cities/:id/flights", getFlightsByCity);

export default flightsRouter;
