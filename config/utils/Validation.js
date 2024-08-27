// Define the isValidPhoneNumber function
function isValidPhoneNumber(phone) {
  // Modify the regular expression pattern based on your phone number format
  const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
  return phoneRegex.test(phone);
}
  
//Define validateEmail function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//standard format
  return emailRegex.test(email);
}
module.exports = {isValidPhoneNumber,validateEmail}