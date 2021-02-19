"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   *
   * @param {Date} premiumDate
   *
   * Checks if the users premium until date is greater then
   * todays date. If the users premium subscription is not current
   * then return false
   *
   * @returns {bool}
   */
  premiumCurrent: function (premiumDate) {
    if (!premiumDate) {
      return false;
    }

    let today = new Date();
    let goodUntil = new Date(premiumDate);

    if (today.setHours(0, 0, 0, 0) <= goodUntil.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  },
};
