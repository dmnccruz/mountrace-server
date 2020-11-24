const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const screensResolvers = require('./screens');
const commentsResolvers = require('./comments');

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query,
    ...screensResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...screensResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
      ...postsResolvers.Subscription
  }
};
