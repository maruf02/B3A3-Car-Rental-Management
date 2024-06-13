import { Request, Response } from "express";
import { userValidationSchema } from "./user.validation";
import { userServices } from "./user.service";
import { StatusCodes } from "http-status-codes";

const createUser = async (req: Request, res: Response) => {
  try {
    // const product = req.body;
    // const result = await userServices.createUserIntoDB(product);
    const user = req.body;
    const zodParseDataUser = userValidationSchema.parse(user);
    const result = await userServices.createUserIntoDB(zodParseDataUser);
    res.status(200).json({
      success: true,
      StatusCodes: StatusCodes.CREATED,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      StatusCodes: StatusCodes.CREATED,
      message: "User registered successfully",
    });
  }
};

export const userController = {
  createUser,
};
