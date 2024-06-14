import { BookingModel } from "./booking.model";
import { TBooking } from "./booking.interface";
import { CarModel } from "../car/car.model";
import { error } from "console";

type TReturnData = {
  bookingId: string;
  endTime: string;
};

const createBookingIntoDB = async (bookingData: TBooking) => {
  const { car } = bookingData;
  const cars = await CarModel.findById(car);
  const carStatus = cars?.status;
  console.log(carStatus);
  if (carStatus === "unavailable") {
    console.log("already booked");
    throw error("already booked");
  }
  const booking = await BookingModel.create(bookingData);
  await CarModel.updateOne({ _id: car }, { $set: { status: "unavailable" } });
  const populatedBooking = (
    await booking.populate("user", "-password -createdAt -updatedAt -__v")
  ).populate("car", "-__v");
  return populatedBooking;
};

const getAllBookingFromDB = async () => {
  const cars = await BookingModel.find();
  console.log("object", cars);
  return cars;
};
const getAllBookingQueryFromDB = async (carId?: string, date?: string) => {
  let query: any = {};

  if (carId) {
    query.car = carId;
  }

  if (date) {
    query.date = date;
  }
  console.log(query);
  console.log(carId, date);
  const bookings = await BookingModel.find(query)
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");
  return bookings;
};
const getBookingByUserIdFromDB = async () => {
  const userId = "666b07c07e36eebd720beab5";
  const myBookings = await BookingModel.find({ user: userId })
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");
  return myBookings;
};

const returnBookingFromDB = async (bookingId: string, endTime: string) => {
  console.log("returnBookingFromDB");
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingByUserIdFromDB,
  getAllBookingQueryFromDB,
  returnBookingFromDB,
};
