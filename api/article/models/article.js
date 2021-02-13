"use strict";
const axios = require("axios").default;
const { DateTime } = require("luxon");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
let COOLDOWN = 10 * 60 * 1000;
let intervalId;
let countdown = COOLDOWN;

function startRebuildCountdown() {
  // console.log("START REBUILD");
  // clearInterval(intervalId);
  // countdown = COOLDOWN;
  // intervalId = setInterval(() => {
  //   countdown -= 5000;
  //   if (countdown <= 0) {
  //     callRebuildHook();
  //     clearInterval(intervalId);
  //   } else {
  //     console.log("COUNTDOWN", countdown);
  //   }
  // }, 5000);
  // callRebuildHook();
}

function callRebuildHook() {
  console.log("CALLING WEBHOOK FUNCTION", process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "development") {
    console.log("CALLING WEBHOOK - SHOULD SEE REBUILD");
    axios
      .post(
        `${proccess.env.DIGITAL_OCEAN_DEPLOY_API}`,
        {
          force_build: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.DIGITAL_OCEAN_API_KEY}`,
          },
        }
      )
      .then((response) => console.log("Rebuilding Front End"))
      .catch((err) => console.log(err.message));
  }
}

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
        console.log(
          "This was recently published and it needs to be pushed out"
        );
        strapi.services.bot.sendBlogPostToDiscord(
          "general",
          `Checkout the new article just posted to the website. \n https://kw-frontend-abs5o.ondigitalocean.app/article/${entry.slug}`
        );
      }
    },
  },
};
