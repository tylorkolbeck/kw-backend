"use strict";
const axios = require("axios").default;

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
let COOLDOWN = 10 * 60 * 1000;
let intervalId;
let countdown = COOLDOWN;

function startRebuildCountdown() {
  clearInterval(intervalId);
  countdown = COOLDOWN;
  intervalId = setInterval(() => {
    countdown -= 5000;
    if (countdown <= 0) {
      callRebuildHook();
      clearInterval(intervalId);
    }
  }, 5000);
}

function callRebuildHook() {
  if (process.env.NODE_ENV === "production") {
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
    afterCreate: async (entry) => {
      startRebuildCountdown();
    },
    afterUpdate: async (entry) => {
      startRebuildCountdown();
    },
  },
};
