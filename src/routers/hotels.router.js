import { Router } from "express";
import { createHotel } from "../controllers/hotels.controller.js";

const hotelsRouter = Router();

hotelsRouter.post("/companies/:id/hotel", createHotel);

export default hotelsRouter;
