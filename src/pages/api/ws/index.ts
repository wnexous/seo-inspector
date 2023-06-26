import { INPUT_wsAuth } from '@/interfaces/WebSocket';
import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from "socket.io";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

declare global {
    namespace NodeJS {
        interface Global {
            socket: Server;
        }
    }
}

interface defaultMessageInterface {
    data: any,
    socketId: string
}

class SocketHandler {

    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    constructor(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.io = io
        console.log("Socket listen on 5000");
    }

    sendMessage({ data, socketId }: defaultMessageInterface) {
        console.table({ data, socketId });
        this.io.to(socketId).emit(data)
    }
}

function addSocketConnectionListener(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    io.on('connection', (client) => {
        if (
            "accessToken" in client.handshake.auth &&
            "socketToken" in client.handshake.auth &&
            "username" in client.handshake.auth
        ) {
            client.emit("connection", { msg: "Conectado ao server com sucesso" })
            const userAuth = <INPUT_wsAuth>client.handshake.auth
            console.log("auth", userAuth);
        }
    });
}

const SocketDeploy = (req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    if (!!!globalThis.socketHandler) {
        console.log("INSTANCIANDO SOCKET");
        const io = new Server({
            cors: {
                origin: "http://192.168.1.5:3000",
                methods: ["GET", "POST"],
                allowedHeaders: ["Access-Control-Allow-Origin"],
                credentials: true
            }
        });

        io.listen(5000)
        addSocketConnectionListener(io)
        //@ts-ignore
        globalThis.socketHandler = new SocketHandler(io)
        res.send({ error: false })
    }
    else {
        console.log("socket has started");
        res.send({ error: true })
    }
    //@ts-ignore
    // return <SocketHandler>globalThis.socketHandler
}

export default SocketDeploy