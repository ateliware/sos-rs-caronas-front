const pattern = /^\(\d{2}\) \d{5}-\d{4}$/;

export const formPhonePattern = {
  pattern: {
    value: pattern,
    message: 'invalid phone',
  },
};
