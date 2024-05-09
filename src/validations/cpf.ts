const pattern = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;

export const formCpfPattern = {
  pattern: {
    value: pattern,
    message: 'CPF inválido',
  },
};
