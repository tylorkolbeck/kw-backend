"use strict";
const axios = require("axios").default;

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterUpdate: async (entry) => {
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
    },
  },
};
