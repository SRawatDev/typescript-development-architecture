import { Request, Response } from 'express';
import apiResponse from '../utils/apiResponse.utils';
import userValidation from '../validation/user.validation';
import statusCode from '../utils/statusCode.utils';
import userService from '../service/user.service';
import userModel from '../models/user.model';

class UserController {
  public signup = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { error } = await userValidation.validateadd(request.body);
      const validationError = apiResponse.validationError(response, error);
      if (validationError) return validationError; 
      const userData = await userModel.findOne({ email: request.body.email });
      console.log(userData)
      if (userData) {
        return apiResponse.forbidden(
          response,
          `${userData.email} is already exist`,
          statusCode.FORBIDDEN
        );
      }
      const data = await userService.signup(request.body);
      return apiResponse.success(response, 'User registered successfully', null, statusCode.OK,);
    } catch (error) {
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return apiResponse.error(response, errorMessage, statusCode.INTERNAL_SERVER_ERROR);
    }
  };
}

export default new UserController();