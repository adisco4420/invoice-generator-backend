function validateDuplicate(array, value, key) {
    const found = array.some(function (el) {
      return el[key] === value;
    });
    if (!found && value.trim().length) {
      return true;
    } else {
      return false;
    }
  }

  module.exports = {
      validateDuplicate
  }