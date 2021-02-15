"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  addEmail: async (email) => {
    const dbEmail = await strapi
      .query("newsletterSubscriber")
      .findOne({ email });
    if (!dbEmail) {
      return await strapi.query("newsletterSubscriber").create({ email });
    }
    if (dbEmail) {
      return dbEmail;
    }
  },
};
