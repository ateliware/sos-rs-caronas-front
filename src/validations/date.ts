const pattern = new RegExp(
  '^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[0-2])/\\d{4}$'
);

export const formDatePattern = {
  pattern: {
    value: pattern,
    message: 'invalid date',
  },
};
