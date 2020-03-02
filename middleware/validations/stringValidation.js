const validateString = (value, length) => {
  if (typeof value !== 'string') return false;
  const stringLength = new RegExp(`.{${length},}`);
  const trimString = value.trim();

  return stringLength.test(trimString);
};

export default validateString;
