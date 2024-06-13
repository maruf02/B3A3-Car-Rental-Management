import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: TCar) => {
  const result = await CarModel.create(car);
  return result;
};
const getAllCarsFromDB = async () => {
  const cars = await CarModel.find();
  return cars;
};

const getCarByIdFromDB = async (id: string) => {
  const cars = await CarModel.findById(id);
  return cars;
};

const updateCarByIdInDB = async (carId: string, carData: TCar) => {
  const cars = await CarModel.findByIdAndUpdate(carId, carData, {
    new: true,
  });
  return cars;
};

export const carService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getCarByIdFromDB,
  updateCarByIdInDB,
};
