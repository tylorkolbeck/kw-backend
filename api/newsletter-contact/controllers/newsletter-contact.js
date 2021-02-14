const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOne(ctx) {
    const { email } = ctx.params;
    console.log(email);
    const entity = await strapi.services["newsletter-contact"].findOne({
      email: email,
    });
    return sanitizeEntity(entity, {
      model: strapi.models["newsletter-contact"],
    });
  },
};
