const integerPattern = /\d+/;

const validateInteger = (value) => integerPattern.test(value);

export default validateInteger;
