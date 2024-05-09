export const formatCurrency = (value: number) => {
  if (value === null) return null;

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatValue = (value: number | string) => {
  if (typeof value === 'number') return value;
  const sanitizedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
  return Number(sanitizedValue);
};
