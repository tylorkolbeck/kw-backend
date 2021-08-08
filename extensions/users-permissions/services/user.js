"use srict";
const generateUniqueId = require("../../../utils/uid_generator");

module.exports = {
  generateUniqueUsername: () => {
    return generateUniqueId();
  },
};
