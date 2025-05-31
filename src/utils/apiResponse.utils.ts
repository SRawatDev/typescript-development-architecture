import { Response } from 'express';
import mongoose from 'mongoose';

// Define ValidationError Type
interface ValidationError {
  details: { message: string }[];
}
export type StatusCode = number;
// Define Generic API Response Type
export type ApiResponse<T> = {
  success: boolean;
  status: StatusCode;
  message: string;
  data?: T;
};
const apiResponse = {
  success: <T>(res: Response, message: string, data?: T, status: StatusCode = 200) => {
    return res.status(status).json({
      success: true,
      status,
      message,
      data,
    } as ApiResponse<T>);
  },

  error: (res: Response, message = 'Internal server error', status: StatusCode = 500) => {
    return res.status(status).json({
      success: false,
      status,
      message,
    } as ApiResponse<null>);
  },

  unauthorized: (res: Response, message = 'Unauthorized Access', status: StatusCode = 401) => {
    return res.status(status).json({
      success: false,
      status,
      message,
    } as ApiResponse<null>);
  },

  badRequest: <T>(res: Response, message: string, data?: T, status: StatusCode = 400) => {
    return res.status(status).json({
      success: false,
      status,
      message,
      data,
    } as ApiResponse<T>);
  },

  mongooseObjectIdError: (id: string, res: Response, name: string, status: StatusCode = 400) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(status).json({
        success: false,
        status,
        message: `${name} is an invalid MongoDB ObjectId.`,
      } as ApiResponse<null>);
    }
    return null;
  },

  forbidden: <T>(res: Response, message: string, data?: T, status: StatusCode = 403) => {
    return res.status(status).json({
      success: false,
      status,
      message,
      data,
    } as ApiResponse<T>);
  },

  validationError: <T>(
  res: Response,
  error: ValidationError | undefined,
  data?: T,
  status: StatusCode = 400
) => {
  if (error?.details?.[0]) {
    return res.status(status).json({
      success: false,
      status,
      message: error.details[0].message.replace(/"/g, ''),
      data,
    } as ApiResponse<T>);
  }
  return null;
},

};


export default apiResponse