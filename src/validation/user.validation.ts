import Joi, { ObjectSchema } from 'joi';
import { requestInterface } from '../interface/request.interface';

class UserValidation {
  private static add(): ObjectSchema<requestInterface> {
    return Joi.object<requestInterface>({
      firstName: Joi.string().min(3).max(50).required().messages({
        "string.empty": "firstName is required",
        "string.min": "firstName must be at least 3 characters long",
        "string.max": "firstName must be less than 50 characters",
      }),
      lastName: Joi.string().min(3).max(50).required().messages({
        "string.empty": "lastName is required",
        "string.min": "lastName must be at least 3 characters long",
        "string.max": "lastName must be less than 50 characters",
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .pattern(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .required()
        .messages({
          "string.empty": "Email is required",
          "string.email": "Please provide a valid email address",
          "string.pattern.base": "Email must contain only letters, digits, and periods before @",
        }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
      }),
    });
  }
  public static validateadd(data: requestInterface) {
    return this.add().validate(data, { abortEarly: false });
  }
}

export default UserValidation;
