import validateEmail from './validations/emailValidation';

import response from '../utils/apiResponse';

const loginValidationMiddleware = (req, res, next) => {
  const isEmail = validateEmail(req.body.email);
  return isEmail ? next() : response(res, 406, 'failure', 'Your email format is not acceptable');
};

export default loginValidationMiddleware;
