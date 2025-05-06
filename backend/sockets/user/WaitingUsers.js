const UsersByRatingByRating = new Map();


function addUser(user) {
  try {
    const { username, socketId, rating } = user;
    if (!UsersByRatingByRating.has(rating)) {
      UsersByRatingByRating.set(rating, []);
    }
    UsersByRatingByRating.get(rating).push(user);
    console.log(`Users.js::addUser:: Added user '${username}' with rating ${rating} to the pool.`);
  } catch (err) {
    console.error("Users.js::addUser:: Error while adding user:", err);
  }
}

function removeUser(username) {
  try {
    for (const [rating, users] of UsersByRatingByRating.entries()) {
      const updatedUsers = users.filter(user => user.username !== username);
      if (updatedUsers.length < users.length) {
        if (updatedUsers.length > 0) {
          UsersByRatingByRating.set(rating, updatedUsers);
        } else {
          UsersByRatingByRating.delete(rating);
        }
        console.log(`Users.js::removeUser:: Removed user '${username}' from rating group '${rating}'.`);
        return;
      }
    }
    console.warn(`Users.js::removeUser:: No user found with username '${username}' to remove.`);
  } catch (err) {
    console.error("Users.js::removeUser:: Error while removing user:", err);
  }
}

function getRandomUserByRating(rating) {
  try {
    if (!UsersByRatingByRating.has(rating)) {
      console.warn(`Users.js::getRandomUserByRating:: No users found with rating '${rating}'.`);
      return null;
    }
    const candidates = UsersByRatingByRating.get(rating);
    const index = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[index];
    console.log(`Users.js::getRandomUserByRating:: Selected user '${chosen.username}' from rating '${rating}'.`);
    return chosen;
  } catch (err) {
    console.error("Users.js::getRandomUserByRating:: Error selecting random user:", err);
    return null;
  }
}

function removeUserBySocketId(socketId) {
  try {
    let found = false;
    for (const [rating, users] of UsersByRatingByRating.entries()) {
      const updatedUsers = users.filter(user => user.socketId !== socketId);
      if (updatedUsers.length < users.length) {
        found = true;
        if (updatedUsers.length > 0) {
          UsersByRatingByRating.set(rating, updatedUsers);
        } else {
          UsersByRatingByRating.delete(rating);
        }
        console.log(`Users.js::removeUserBySocketId:: Removed user with socketId '${socketId}' from rating '${rating}'.`);
      }
    }
    if (!found) {
      console.warn(`Users.js::removeUserBySocketId:: No user found with socketId '${socketId}'.`);
    }
  } catch (err) {
    console.error("Users.js::removeUserBySocketId:: Error while removing user by socketId:", err);
  }
}

export {
  removeUser,
  removeUserBySocketId,
  addUser,
  getRandomUserByRating,
  UsersByRatingByRating,
  removeUserEntry,
  addUserEntry,
  getUserDataByUsername,
  getUserDataBySocketId,
};
