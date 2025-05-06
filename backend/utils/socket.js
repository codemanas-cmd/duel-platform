// utils/socket.js

function emitWithTimeoutResponse(io, socket, roomId, eventName, dataToSend, timeoutMs, onSuccess, onReject) {
    let responded = false;

    socket.to(roomId).emit(eventName, dataToSend, (response) => {
        responded = true;
        clearTimeout(timeout);
        if (response.accepted === true) {
            onSuccess(response);
        } else {
            onReject("Your request was rejected.");
        }
    });

    const timeout = setTimeout(() => {
        if (!responded) {
            onReject("No response received in 30 seconds.");
        }
    }, timeoutMs);
}

export { emitWithTimeoutResponse };
