const validateString = (value, length) => {
  const stringLength = new RegExp(`.{${length},}`);
  const trimString = value.trim();

  return stringLength.test(trimString);
};

export default validateString;
