export function formatPhone(phone?: string) {
  if (!phone) return '';

  phone = phone.replace(/\D/g, '');

  if (phone.length === 10) {
    phone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (phone.length === 11) {
    phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return phone;
}
