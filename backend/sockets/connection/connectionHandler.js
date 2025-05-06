import { addUserEntry, removeUserEntry, addUser, removeUser, getUserDataBySocketId } from "../user/WaitingUsers";
export default function connectionHandler (io) {
    io.on("connection", (socket) => {
        addChatListener(io, socket);
        addMatchListener(io, socket);
        console.log(`New socket connected: ${socket.id}`);
    
        socket.on("disconnect", () => {
            removeUserBySocketId(socket.id);
            removeUserEntry({socketId:socket.id});
            const user = getUserDataBySocketId(socket.id);
            io.to("room-available-users").emit("user-disconnected",user.id);
            console.log(`Socket disconnected: ${socket.id}`);
        });

        socket.on("connected-user-data", (data)=>{
            const userData = data.userData;
            const username = userData.name;
            const socketId = socket.id;
            const isAvailable = userData.available;
            console.log()
            if(isAvailable){
                socket.join("room-available-users");
                addUserEntry({username,socketId})
                socket.to("room-available-users").emit("receive-connected-user-data",userData);
                console.log("")
            }

        })
        
    })
}
