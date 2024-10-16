function checkPhone(v) {
  // Regex pattern for Turkish phone number
  const regex =
    /^(?:(\+90\s?)?((5[0-9]{2})|([23489][0-9]{2}))\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2})$/;

  return regex.test(v);
}

function checkDate(v) {
  // Check if the date is in the format YYYY-MM-DD
  const regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!regex.test(v)) return false;

  const dateParts = v.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  // Create a date object and check if it is valid
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export default {
  firstName: v => v.length >= 3,
  lastName: v => v.length >= 3,
  phoneNumber: v => checkPhone(v),
  birthDate: v => checkDate(v),
  employmentDate: v => checkDate(v),
};
