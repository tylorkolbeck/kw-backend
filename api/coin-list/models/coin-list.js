"use strict";
const { DateTime } = require("luxon");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
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
      if (secondsSincePublished < 10) {
        try {
          let coinString = "";
          entry.coin.forEach((c) => (coinString += `${c.coin} \n`)),
            strapi.services.bot.sendCoinList("810613897777119253", {
              title:
                "Updated Coin List for KillerWhale Premium Signals \nMay be used with ALL KillerWhale Products",
              description: coinString,
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
