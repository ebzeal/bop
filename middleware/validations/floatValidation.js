const floatPattern = /-?\d+\.\d+/;

const validateFloat = (value) => floatPattern.test(value);

export default validateFloat;
