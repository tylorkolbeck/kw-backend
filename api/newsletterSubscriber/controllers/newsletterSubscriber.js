"use strict";

const {
  addEmailToSubscriptionList,
} = require("../services/newsletterSubscriber");

/**
 * A set of functions called "actions" for `newsletter`
 */
const validateEmail = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

module.exports = {
  async index(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.throw(406, "Please provide an email");
    }
    if (!validateEmail(email)) {
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
