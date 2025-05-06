const usernameBySocketId = new Map();
const socketIdByUsername = new Map();

function addUserEntry(user) {
  try {
    const { username, socketId } = user;
    usernameBySocketId.set(socketId, user);
    socketIdByUsername.set(username, user);
    console.log(`Users.js::addUserEntry:: Mapped user '${username}' <-> socketId '${socketId}'`);
  } catch (err) {
    console.error("Users.js::addUserEntry:: Error while adding user entry:", err);
  }
}

function removeUserEntry({ username, socketId }) {
  try {
    if (!username && !socketId) {
      console.warn("Users.js::removeUserEntry:: Cannot remove user entry — both username and socketId are null.");
      return;
    }

    if (username && !socketId) {
      const userObj = socketIdByUsername.get(username);
      socketId = userObj?.socketId;
      console.log(`Users.js::removeUserEntry:: Resolved socketId '${socketId}' from username '${username}'`);
    } else if (!username && socketId) {
      const userObj = usernameBySocketId.get(socketId);
      username = userObj?.username;
      console.log(`Users.js::removeUserEntry:: Resolved username '${username}' from socketId '${socketId}'`);
    }

    socketIdByUsername.delete(username);
    usernameBySocketId.delete(socketId);

    console.log(`Users.js::removeUserEntry:: Successfully removed user entry -> username: '${username}', socketId: '${socketId}'`);
  } catch (err) {
    console.error("Users.js::removeUserEntry:: Error while removing user entry:", err);
  }
}

function getUserDataByUsername(username) {
  try {
    if (!username) {
      console.warn("Users.js::getUserDataByUsername:: Username is null or undefined.");
      return null;
    }
    const user = socketIdByUsername.get(username);
    if (!user) {
      console.warn(`Users.js::getUserDataByUsername:: No user found for username '${username}'.`);
      return null;
    }
    console.log(`Users.js::getUserDataByUsername:: Found user data for username '${username}':`, user);
    return user;
  } catch (err) {
    console.error("Users.js::getUserDataByUsername:: Error occurred:", err);
    return null;
  }
}

function getUserDataBySocketId(socketId) {
  try {
    if (!socketId) {
      console.warn("Users.js::getUserDataBySocketId:: socketId is null or undefined.");
      return null;
    }
    const user = usernameBySocketId.get(socketId);
    if (!user) {
      console.warn(`Users.js::getUserDataBySocketId:: No user found for socketId '${socketId}'.`);
      return null;
    }
    console.log(`Users.js::getUserDataBySocketId:: Found user data for socketId '${socketId}':`, user);
    return user;
  } catch (err) {
    console.error("Users.js::getUserDataBySocketId:: Error occurred:", err);
    return null;
  }
}
