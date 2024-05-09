const pattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/i;

export const formEmailPattern = {
  pattern: {
    value: pattern,
    message: 'E-mail inválido',
  },
};
