"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async (ctx) => {
    const { slug } = ctx.params;

    const entity = await strapi.services.product.findOne({ slug });
    return entity;
    // return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
