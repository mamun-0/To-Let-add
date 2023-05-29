const bdPhoneRegEx = /^(\+?880|0)1[3456789]\d{8}$/g;
function phone(phoneNumber) {
  return bdPhoneRegEx.test(phoneNumber);
}

module.exports = { phone };
