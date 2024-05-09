export const parseDate = (date?: string) => {
  if (!date) return '';

  const [year, month, day] = date.split(/-|T/g);
  return `${day}/${month}/${year}`;
};

export const parseDateHour = (dateHour?: string) => {
  if (!dateHour) return '';

  const [date, time] = dateHour.split('T');

  const [year, month, day] = date.split('-');
  const [hour, minutes] = time.split(':');

  return `${day}/${month}/${year} ${hour}:${minutes}`;
};

export const encodeDate = (date?: string) => {
  if (!date) return '';

  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

export const parseDateHourToIsoString = (dateHour?: string) => {
  if (!dateHour) return '';

  const [date, time] = dateHour.split(' ');

  const [day, month, year] = date.split('/');
  const [hourPart, minutePart] = time.split(':');

  const dateTime = new Date(
    `${month}/${day}/${year} ${hourPart}:${minutePart}`
  );

  var isoString = new Date(
    dateTime.getTime() - dateTime.getTimezoneOffset() * 60000
  ).toISOString();

  return isoString;
};
