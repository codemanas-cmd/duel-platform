

const activeUsers = {}; // username -> socket.id

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`[Socket::index.js::socketHandler] New connection -> socket.id: ${socket.id}`);

    socket.on("join-room", ({ roomId, username }) => {
      if (!username) {
        console.warn("[Socket::join-room] Username is missing in payload");
        return;
      }

      activeUsers[username] = socket.id;
      const ROOM = process.env.SOCKET_ACTIVE_USER_ROOM;
      if (roomId === ROOM) {
        console.log(`[Socket::join-room] User '${username}' is joining default active user room`);

        socket.join(ROOM);

        const existingUsernames = Object.keys(activeUsers).filter((u) => u !== username);
        console.log(`[Socket::join-room] Sent active users to '${username}':`, existingUsernames);
        socket.emit("all-users", existingUsernames);

      } else {
        socket.join(roomId);
        console.log(`[Socket::join-room] User '${username}' joined match room '${roomId}'`);
        // No need to send active users for match room
      }
    });

    socket.on("connected-user-data", (data) => {
        const receivers = data.receivers;
        const senderUsername = Object.keys(activeUsers).find((u) => activeUsers[u] === socket.id);
        for(const receiverUsername of receivers){
            const receiverSocketID = activeUsers[receiverUsername];
            if (receiverSocketID) {
                socket.to(receiverSocketID).emit("receive-connected-user-data", data);
                console.log(`[Socket::connected-user-data] Sent '${senderUsername}'s data to '${receiverUsername}'. Data sent:`, data);
            } else {
                console.warn(`[Socket::connected-user-data] Receiver '${receiverUsername}' not found in activeUsers`);
            }
            
        }
       
      });

    socket.on("disconnect", () => {
      const username = Object.keys(activeUsers).find((name) => activeUsers[name] === socket.id);
      if (username) {
        delete activeUsers[username];
        const ROOM = process.env.SOCKET_ACTIVE_USER_ROOM;
        socket.to(ROOM).emit("user-disconnected", username);
        console.log(`[Socket::disconnect] User '${username}' disconnected and removed from activeUsers`);
      } else {
        console.log(`[Socket::disconnect] Unknown user disconnected -> socket.id: ${socket.id}`);
      }
    });
  });
}
