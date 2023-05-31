import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { createCompanySchema, loginCompanySchema } from "../schemas/companies.sechema.js";
import { createCompany, loginCompany } from "../controllers/companies.controller.js";
import { validateLogin } from "../middlewares/companies.middleware.js";

const companyRouter = Router();

companyRouter.post("/signup", validateSchema(createCompanySchema), createCompany);
companyRouter.post("/login", validateSchema(loginCompanySchema), validateLogin, loginCompany);

export default companyRouter;
