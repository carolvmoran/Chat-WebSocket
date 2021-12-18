import express from "express";
import http from "http";
import socketio from "socket.io"

const app = express();
const server = http.Server(app);

app.use(express.static(__dirname + "/public"))

const io = socketio(server);

io.on("connect", (socket) => {
    io.to(socket.id).emit({
        status: true,
        message: "conexão estabelecida com o servidor"
    });
    socket.on("teste", (res) => {
        console.log("MENSAGEM RECEBIDA", res);

        socket.broadcast.emit("teste", res);
    })
})

app.get("/", (req, res) => {
    res.render("index.html");
})
server.listen(3333, () => {
    console.log('SERVIDOR INICIADO PORTA', 3333);
})
