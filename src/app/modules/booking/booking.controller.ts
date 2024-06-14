import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { StatusCodes } from "http-status-codes";

import { bookingValidationSchema } from "./booking.validation";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";
import moment from "moment";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { carId, user, date, startTime } = req.body;

  const bookingData = {
    car: carId,
    user,
    date,
    startTime,
  };
  const result = await bookingService.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking is created successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getAllBookingFromDB();
  console.log("2", result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});
const getAllBookingQuery = catchAsync(async (req: Request, res: Response) => {
  const { carId, date } = req.query;
  console.log(carId, date);
  const result = await bookingService.getAllBookingQueryFromDB(
    carId as string,
    date as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getBookingByUserId = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getBookingByUserIdFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const timeToMinutesORHour = (time: string) => {
  const duration = moment.duration(time);
  const differenceInHours = (duration.asMinutes() / 60).toFixed(2);
  return differenceInHours;
  // return duration.asHours;
};

const returnBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId, endTime } = req.body;

  // const result = await bookingService.returnBookingFromDB(bookingId);
  // const splitTime = endTime.split(":");
  // const intSplit = parseInt(splitTime[0]);
  // console.log("result");
  // console.log("Input Data:", req.body);
  res.send("return booking");

  const a = "13:00";
  const b = "15:00";
  const price = 500;
  const aInHours: any = timeToMinutesORHour(a);
  const bInHours: any = timeToMinutesORHour(b);
  const differenceInHours: any = bInHours - aInHours;
  const priceCal = Math.round(differenceInHours * price);
  console.log(
    `The difference in hours is: ${differenceInHours} and price :${priceCal}`
  );
  // res.send(differenceInHours);
  // let endTimeInt = parseInt(endTime.sub);
  // console.log(endTime + endTime);
});

export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingByUserId,
  getAllBookingQuery,
  returnBooking,
};
