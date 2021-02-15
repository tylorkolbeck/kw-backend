"use strict";

module.exports = {
  async index(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.throw(406, "Please provide an email");
    }
    if (!strapi.services.newslettersubscriber.verfiyValidEmail(email)) {
      return ctx.throw(406, "Please provide a valid email");
    }

    const result = await strapi.services.newslettersubscriber.addEmail(email);

    if (result) {
      ctx.send(result.email);
    } else {
      ctx.throw(500);
    }
  },
};
