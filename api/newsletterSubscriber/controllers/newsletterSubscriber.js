"use strict";
const axios = require("axios");

module.exports = {
  async index(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.throw(406, "Please provide an email");
    }
    if (!strapi.services.newslettersubscriber.verfiyValidEmail(email)) {
      return ctx.throw(406, "Please provide a valid email");
    }

    var data = { email_address: email, status: "subscribed" };

    const token = Buffer.from(
      `anystring:${process.env.MAILCHIMP_API_KEY}`,
      "utf8"
    ).toString("base64");

    var config = {
      method: "post",
      url: `https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_KEY}/members`,
      headers: {
        "Content-Type": "application/javascript",
        Authorization: `Basic ${token}`,
      },
      data: data,
    };

    axios(config).catch((error) => {
      console.log("already signed up");
    });
    const result = await strapi.services.newslettersubscriber.addEmail(email);

    if (result) {
      ctx.send(result.email);
    } else {
      ctx.throw(500);
    }
  },
};
