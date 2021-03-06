"use strict";
const axios = require("axios").default;
const { DateTime } = require("luxon");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterUpdate: async (entry) => {
      const dateNow = DateTime.local();
      let secondsSincePublished;

      if (entry.published_at) {
        secondsSincePublished = DateTime.fromISO(dateNow).diff(
          DateTime.fromISO(entry.published_at),
          "seconds"
        ).values.seconds;
      }

      if (secondsSincePublished < 10 && entry.announceToDiscord) {
        try {
          setTimeout(() => {
            strapi.services.bot.sendBlogPostToDiscord(
              process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID,
              {
                title: entry.title,
                description: entry.description,
                url: `${process.env.FRONT_END_URL}/article/${entry.slug}`,
                author: `Checkout the new post on our website by ${
                  entry.author ? entry.author.name : "Killer Whale Crypto"
                }`,
                thumbnail: entry.image.formats.thumbnail.url,
              }
            );
          }, 60000);
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
