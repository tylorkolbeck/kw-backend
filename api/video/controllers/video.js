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

  findOne: async (ctx) => {
    const { slug } = ctx.params;
    const entity = await strapi.services.video.findOne({ slug });

    // Check if this is premium content and that the user has an active subscription
    if (entity.premium) {
      if (ctx.user) {
        const { premiumUntil } = ctx.state.user;
        if (strapi.services.global.premiumCurrent(premiumUntil)) {
          return sanitizeEntity(entity, { model: strapi.models.video });
        }
      } else {
        entity.content =
          "This is premium content, sign up to read the rest of the article.";
        return sanitizeEntity(entity, { model: strapi.models.video });
      }
    }

    return sanitizeEntity(entity, { model: strapi.models.video });
  },
};
