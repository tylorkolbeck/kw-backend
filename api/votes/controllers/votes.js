"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    const { id } = ctx.state.user;
    ctx.request.body.users_permissions_user = id;

    const vote = await strapi
      .query("votes")
      .model.query((qb) => {
        qb.where({
          article: ctx.request.body.article,
          users_permissions_user: ctx.state.user.id,
        });
      })
      .fetch();

    if (!vote) {
      entity = await strapi.services.votes.create(ctx.request.body);
      return entity;
    } else {
      const foundVote = vote.toJSON();
      strapi
        .query("votes")
        .update({ id: foundVote.id }, { vote: !foundVote.vote });
      return {
        article: ctx.request.body.article,
        users_permissions_user: id,
        vote: !foundVote.vote,
      };
    }
  },

  async update(ctx) {
    const vote = await strapi
      .query("votes")
      .model.query((qb) => {
        qb.where({
          article: ctx.request.body.article,
          users_permissions_user: ctx.state.user.id,
        });
      })
      .fetch();

    if (vote) {
      const { id } = vote.toJSON();
      strapi.query("votes").update({ id }, { vote: ctx.request.body.vote });
      return {
        article: ctx.request.body.article,
        users_permissions_user: id,
        vote: ctx.request.body.vote,
      };
    } else {
      return null;
    }
  },
};
