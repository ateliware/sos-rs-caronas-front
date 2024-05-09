const pattern = /^#([0-9A-Fa-f]{6})$/;

export const formColorPattern = {
  pattern: {
    value: pattern,
    message: 'invalid color',
  },
};
