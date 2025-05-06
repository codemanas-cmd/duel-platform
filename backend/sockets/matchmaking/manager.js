import { addUser, removeUser, getRandomUserByRating } from "../user/WaitingUsers.js";

const getRoomId = (user1, user2) => {
    const names = [user1.username, user2.username].sort();
    return `room-${names[0]}-${names[1]}`;
};

function findMatch(io, user) {
    try {
        const opponent = getRandomUserByRating(user.rating);

        if (!opponent) {
            addUser(user);
            io.to(user.socketId).emit("waiting");
            console.log(`[QUEUE] ${user.username} added to queue (rating: ${user.rating})`);
            return;
        }

        const roomId = getRoomId(user, opponent);
        const userSocket = io.sockets.sockets.get(user.socketId);
        const opponentSocket = io.sockets.sockets.get(opponent.socketId);

        if (!userSocket ) {
            console.error(`[ERROR] Missing socket for ${user.username}`);
            return;
        }
        if (!opponentSocket) {
            console.error(`[ERROR] Missing socket for ${opponent.username}`);
            return;
        }

        userSocket.join(roomId);
        opponentSocket.join(roomId);

        const payload = (self, rival) => ({
            opponent: {
                username: rival.username,
                rating: rival.rating,
                socketId: rival.socketId
            },
            roomId,
            yourUsername: self.username
        });

        userSocket.emit("match-found", payload(user, opponent));
        opponentSocket.emit("match-found", payload(opponent, user));

        removeUser(opponent);
        console.log(`[MATCH] ${user.username} vs ${opponent.username} in room ${roomId}`);
    } catch (err) {
        console.error("[ERROR] findMatch failed:", err);
        io.to(user.socketId).emit("match-error", { message: "Unable to find a match." });
    }
}

function addMatchListener(io, socket) {
    socket.on("find-match", (user) => {
        console.log(`[EVENT] find-match from ${user.username} (${user.socketId})`);
        findMatch(io, user);
    });

    socket.on("leave-queue", (user) => {
        removeUser(user);
        console.log(`${user.username} has left the queue.`);

    })
}

export { addMatchListener };
