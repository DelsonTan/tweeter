"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Deletes a tweet
    deleteTweet: function (tweetID, callback) {
      const ObjectId = require("mongodb").ObjectID;
      db.collection("tweets").remove({ "_id": ObjectId(tweetID) }, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().sort(sortNewestFirst).toArray(callback);
    },

    getUsers: function (callback) {
      db.collection("tweets").find().toArray(callback);
    }
  };
}