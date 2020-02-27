import validateString from './validations/stringValidation';

import response from '../utils/apiResponse';

const bookValidationMiddleware = (req, res, next) => {
  const bookNameLength = 2;
  const isBookName = validateString(req.body.nameOfBook, bookNameLength);
  return isBookName
    ? next()
    : response(res, 406, 'failure', `Name of book must be at least ${bookNameLength} character`);
};

export default bookValidationMiddleware;
