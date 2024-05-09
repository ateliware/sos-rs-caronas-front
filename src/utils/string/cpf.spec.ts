import { formatCPF } from './cpf';

describe('formatCPF', () => {
  it('should format a CPF without any special characters', () => {
    const cpf = '12345678900';
    const formattedCPF = formatCPF(cpf);
    expect(formattedCPF).toBe('123.456.789-00');
  });

  it('should format a CPF with special characters', () => {
    const cpf = '123.456.789-00';
    const formattedCPF = formatCPF(cpf);
    expect(formattedCPF).toBe('123.456.789-00');
  });

  it('should format a CPF with mixed characters', () => {
    const cpf = '123abc456!789@00';
    const formattedCPF = formatCPF(cpf);
    expect(formattedCPF).toBe('123.456.789-00');
  });

  it('should return an empty string for an empty CPF', () => {
    const cpf = '';
    const formattedCPF = formatCPF(cpf);
    expect(formattedCPF).toBe('');
  });
});
