import { ServerStatusInterface } from "@/pages/nexus-inspector";
import { RequestType } from "@/utils/Types/ResquestTypes";

export const ServerStatus: ServerStatusInterface = {
    enable: {
        text: "running",
        style: {
            backgroundColor: "rgb(181, 255, 154)"
        },

        toggleButton: {
            text: "Parar",
            key: RequestType.killSession
        }
    },
    disable: {
        text: "stopped",
        style: {
            backgroundColor: "rgb(255, 154, 154)"
        },
        toggleButton: {
            text: "Iniciar",
            key: RequestType.startSession
        }
    }
}