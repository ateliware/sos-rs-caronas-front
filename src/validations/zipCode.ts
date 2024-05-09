const pattern = /^\d{5}-\d{3}$/;

export const formZipCodePattern = {
  pattern: {
    value: pattern,
    message: 'invalid zipcode',
  },
};
