const emailPattern = /^\w+(\.\w*)?@\w*\.(com|co)(\.\w{2,})?$/;

const validateEmail = (value) => emailPattern.test(value);

export default validateEmail;
