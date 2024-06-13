import express from "express";
import { carController } from "./car.controller";
import validateRequest from "../middleware/validateRequest";
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from "./car.validation";

const router = express.Router();

router.post(
  "/cars",
  validateRequest(createCarValidationSchema),
  carController.createCar
);
router.get("/cars", carController.getAllCars);
router.get("/cars/:id", carController.getSingleCar);
router.put(
  "/cars/:id",
  validateRequest(updateCarValidationSchema),
  carController.updateCarById
);

export const carRoutes = router;
