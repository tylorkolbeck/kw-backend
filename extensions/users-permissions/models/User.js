module.exports = {
  lifecycles: {
    // Called before an entry is created
    afterCreate(data) {
      if (data.subscribedToNewsletter) {
        strapi.services.newslettersubscriber.addEmail(data.email);
      }
    },
  },
};
