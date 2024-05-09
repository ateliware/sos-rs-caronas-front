const pattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

export const formHourPattern = {
  pattern: {
    value: pattern,
    message: 'invalid hour',
  },
};
