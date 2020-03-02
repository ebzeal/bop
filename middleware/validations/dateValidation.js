const datePattern = /\d{4}-\d{2}-\d{2}/;

const validateDate = (value) => datePattern.test(value);

export default validateDate;
