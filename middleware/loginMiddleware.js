import validateEmail from './validations/emailValidation';

import response from '../utils/apiResponse';

const loginMiddleware = (req, res, next) => {
  const isEmail = validateEmail(req.body.email);
  return isEmail ? next() : response(res, 406, 'failure', 'Your email format is not acceptable');
};

export default loginMiddleware;
