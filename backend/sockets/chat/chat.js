import { Filter } from "bad-words";

const filter  = new Filter()


function addChatListener(io, socket) {
    socket.on("send-message", ({ roomId, message, username }) => {
        if(filter.isProfane(message)){
            socket.emit("chat-warning",{
                message: "Inappropriate language is not allowed.",
            })
        }
        else io.to(roomId).emit("receive-message", { message, username, timestamp: Date.now() });
    });
}

export { addChatListener };