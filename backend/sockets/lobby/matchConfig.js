import { emitWithTimeoutResponse } from "../utils/socket.js";
import { recommendProblem } from "../../controllers/recommendProblem.js";
/*
    Process: This section handles the in-lobby problem selection process,
    both users will have same interface to choose ome rating range
    and tags for the duel

    -> They emit this info through "add-problem" even then server checks if 
    other user is satisfied with the selection through emitting "problem-request"
    to the other user
    -> This is shown to other user in chat with an accept and reject button
    -> and the accept/reject response is sent to backend through a callback
    -> if accepted duel config is set to the proposed rating and tags 
    -> otherwise the user which proposed the settings is notified

*/
 

function addProblemListener(io, socket) {
    socket.on("add-problem", ({ roomId, username, problem }) => {
        if (!roomId || !username || !problem) return;

        emitWithTimeoutResponse(
            io,
            socket,
            roomId,
            "problem-request",
            problem,
            30000,
            () => io.to(roomId).emit("set-problem", { problem }),
            (message) => socket.emit("problem-rejected", { message })
        );
    });

    socket.on("start-match", ({ roomId, username, problem }) => {
        if (!roomId || !username || !problem) return;

        emitWithTimeoutResponse(
            io,
            socket,
            roomId,
            "start-request",
            problem,
            30000,
            async () => {
                const problem = await recommendProblem();
                io.to(roomId).emit("set-problem",{problem});
                
            },
            (message) => socket.emit("match-rejected", { message })
        );
    });
}

export { addProblemListener };