const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug });

    // Check if this is premium content and that the user has an active subscription
    if (entity.premium) {
      if (ctx.user) {
        const { premiumUntil } = ctx.state.user;
        if (strapi.services.global.premiumCurrent(premiumUntil)) {
          return sanitizeEntity(entity, { model: strapi.models.article });
        }
      } else {
        entity.content =
          "This is premium content, sign up to read the rest of the article.";
        return sanitizeEntity(entity, { model: strapi.models.article });
      }
    }

    return sanitizeEntity(entity, { model: strapi.models.article });
  },

  /**
   * Retrieve all articles with the content stripped to reduce over the wire data
   *
   * @return {Object}
   */

  find: async (ctx) => {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map((entity) => {
      entity.content = "";
      return sanitizeEntity(entity, { model: strapi.models.article });
    });
  },
};
