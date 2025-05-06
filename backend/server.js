import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import socketHandler from './sockets/index.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

let users = {};

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('request coming', __dirname);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

socketHandler(io);

// io.on('connection', (socket) => {

//     socket.on('connected', (userId) => {
//         console.log('someone connected', userId);
//     });
//     socket.on('join-room', ({ roomId, userId }) => {
        
//         console.log('join-room triggered', roomId, userId);
//         users[userId] = socket.id;

//         socket.join(roomId);
//         socket.broadcast.to(roomId).emit('user-connected', userId);

//         const existingUsers = Object.keys(users).filter(id => id !== userId);
//         socket.emit('all-users', existingUsers);
//         socket.on('disconnect', () => {
//             delete users[userId];
//             console.log('someone disconnect', userId, '\n\n\n');
//             socket.broadcast.to(roomId).emit('user-disconnected', userId);
//         });

//         socket.on('connected-user-data', (data) => {
//             console.log("data", data, "users", users[data.toPeer], "socketid", socket.id);
//             socket.to(users[data.toPeer]).emit('receive-connected-user-data', data);
//         });
//     });

// });
server.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
