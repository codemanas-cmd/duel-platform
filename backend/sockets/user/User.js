
const Users = new Map()
//Users.js
/* 
user = {
    socketId,
    username,
    rating,
}
*/

function addUser(user){
    const {username, socketId, rating} = user;
    if(!Users.has(rating)){
        Users.set(rating,[]);
    }
    Users.get(rating).push(user);
}

function getRandomUserByRating(rating) {
    if(!Users.has(rating)){
        return null;
    }
    const candidates = Users.get(rating);
    const index = Math.floor(Math.random() * candidates.length);
    return candidates[index];
}

function removeUserBySocketId(socketId) {
    for( let[rating, users] of Users.entries()){
        const updatedUsers = users.filter(user => user.socketId !== socketId);

        if(updatedUsers.length > 0){
            Users.set(rating, updatedUsers);
        }
        else Users.delete(rating);
    }
}

function removeUser(user){
    const{rating, username} = user;
    if(!Users.has(rating)){
        return;
    }
    const updatedUsers = Users.get(rating).filter(user => user.username !== username);
    if(updatedUsers.length){
        Users.set(rating,updatedUsers);
    }
    else Users.delete(rating);
}

export {removeUser, removeUserBySocketId, addUser, getRandomUserByRating, Users};

