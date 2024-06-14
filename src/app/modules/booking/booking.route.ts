import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post("/bookings", bookingController.createBooking);
router.put("/car/return", bookingController.returnBooking);
// router.put("/cars/return", bookingController.returnBooking);
router.get("/bookings", bookingController.getAllBookingQuery);
router.get("/bookings", bookingController.getAllBooking);
router.get("/bookings/my-bookings", bookingController.getBookingByUserId);

export const bookingRoutes = router;
