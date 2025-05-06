import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket(url: string, options: any, onConnect: () => void) {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io(url, options);
        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
            onConnect?.();
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [url]);

    const emitEvent = (event: string, data: any) => {
        socketRef.current?.emit(event, data);
    };

    const onEvent = (event: string, callback: (...args: any[]) => void) => {
        socketRef.current?.on(event, callback);
    };

    const offEvent = (event: string, callback: (...args: any[]) => void) => {
        socketRef.current?.off(event, callback);
    };

    return [isConnected, emitEvent, onEvent, offEvent] as const;
}
