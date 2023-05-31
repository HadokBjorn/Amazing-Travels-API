import { Router } from "express";
import { createHotel } from "../controllers/hotels.controller";

const hotelsRouter = Router();

hotelsRouter.post("/companies/:id/hotel", createHotel)

export default hotelsRouter;