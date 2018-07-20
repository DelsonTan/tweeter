"use strict";

const Chance = require("chance");
const chance = new Chance();

const md5 = require('md5');

module.exports = {

  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.last();
    const userName  = firstName + " " + lastName;

    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    return {
      name: userName,
      handle: userHandle,
      avatars: generateAvatars(userHandle)
    };
  },

  generateUser: (userName, userHandle, userEmail, userPassword) => {
    return {
      name: userName,
      handle: userHandle,
      email: userEmail,
      password: userPassword,
      avatars: generateAvatars(userHandle)
    }
  }
};

function generateAvatars(handle) {
  const avatarUrlPrefix = `https://vanillicon.com/${md5(handle)}`;
  const avatars = {
    small:   `${avatarUrlPrefix}_50.png`,
    regular: `${avatarUrlPrefix}.png`,
    large:   `${avatarUrlPrefix}_200.png`
  }
  return avatars;
}