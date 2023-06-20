import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from "socket.io";


declare global {
    namespace NodeJS {
        interface Global {
            socket: Server;
        }
    }
}


const io = new Server({
    cors: {
        origin: "http://192.168.1.5:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
});

io.on('connection', (client) => {

    console.log("auth", client.handshake.auth);
    console.log('Novo cliente conectado', client.id);

    client.emit("boa-vinda", {
        mensagem: "OIN"
    })
});




const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {


    console.log("Status:", !!!globalThis.socket);
    //@ts-ignore
    if (!!!globalThis.socket) {

        io.listen(5000)

        console.log("INICINADO");

        //@ts-ignore
        globalThis.socket = true
        res.send("Socket started")
    }
    else {
        res.send("socket has started")
        console.log("ja iniciado");
    }



}

export default SocketHandler