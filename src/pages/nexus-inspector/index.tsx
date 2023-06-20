import Header from "@/Layout/Header/Index";
import { PagePropsInterface } from "../_app";
import MaxWidth from "@/components/MaxWidth";
import styles from "./styles.module.scss"
import TitleTag from "@/components/TitleTag";
import { CSSProperties, useEffect, useState } from "react";
import { ApiRequest } from "@/utils/Api";
import { RequestType } from "@/utils/Types/ResquestTypes";
import { defaultReturnInterface } from "@/utils/Backend/Browser";
import { useRouter } from "next/router";
import { OUTPUT_getSession, OUTPUT_killSession } from "@/interfaces/Session/output";
type deviceTypes = "mobile" | "tablet" | "desktop"

interface devicesInterface {
    name: string
    key: string
}
interface serverStatusPropsInterface {
    style: CSSProperties
    text: string
    toggleButton: {
        text: string,
        key: string
    }
}
type serverStatusType = "enable" | "disable"

interface ServerStatusInterface {
    enable: serverStatusPropsInterface
    disable: serverStatusPropsInterface
}

export default function NexusInspector({ state }: PagePropsInterface) {
    const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const MAX_URL_SIZE = 256
    const [serverStatus, setServerStatus] = useState<serverStatusType>("disable")
    const [sessionStatus, setSessionStatus] = useState<OUTPUT_getSession>()

    const Devices: devicesInterface[] = [
        { name: "Desktop", key: "desktop" },
        { name: "Tablet", key: "tablet" },
        { name: "Mobile", key: "mobile" },
    ]

    const ServerStatus: ServerStatusInterface = {
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

    const router = useRouter()

    const getSessions = () => {
        ApiRequest.post({
            url: "/api/session", data: {
                requestType: RequestType.getSession
            }
        }).then((data: OUTPUT_getSession) => setSessionStatus(data))
    }
    useEffect(() => {
        // GET USER SESSIONS

        getSessions()

    }, [router])

    useEffect(() => {
        setServerStatus(sessionStatus?.isExist ? "enable" : "disable")
    }, [sessionStatus])
    const [selectDevice, setSelectDevice] = useState(Devices[0].key)
    const [urlInput, setUrlInput] = useState("")

    const handleDevice = (device: any) => {
        setSelectDevice(device)
    }

    const handleServer = (serverState: string) => {

        if (serverState == RequestType.startSession) {
            ApiRequest.post({
                url: "/api/session",
                data: {
                    requestType: RequestType.startSession
                }
            }).then(data => {

                console.log(data);
                const BrowserOption: defaultReturnInterface = data.browser
                if (BrowserOption.isOpen)
                    setServerStatus("enable")
            }).catch(err => console.log(err))
        }

        if (serverState == RequestType.killSession) {
            ApiRequest.post({
                url: "/api/session",
                data: {
                    requestType: RequestType.killSession
                }
            }).then((data: OUTPUT_killSession) => {
                console.log(data.getSession);
                setSessionStatus(data.getSession)
            }).catch(err => console.log(err))
        }
    }

    return (<>
        <Header username={state.profile!.username} />
        <section>
            <MaxWidth>
                <>
                    <div className={styles.topBar}>
                        <TitleTag tag="V1 - BETA">Nexus Inspector</TitleTag>
                        <div className={styles.serverStatus} >
                            <span >
                                Server status:
                                <b style={ServerStatus[serverStatus].style}>{ServerStatus[serverStatus].text}</b>
                            </span>
                            <button
                                onClick={() => handleServer(ServerStatus[serverStatus].toggleButton.key)}>
                                {ServerStatus[serverStatus].toggleButton.text}
                            </button>
                        </div>
                    </div>
                    <h2>Selecione o dispositivo</h2>
                    <p>Selecione o tipo de dispositivo que você deseja realizar a inspeção</p>
                    <div className={styles.deviceButtons}>
                        {Devices.map((device, index) => <button key={index}
                            onClick={() => handleDevice(device.key)}
                            className={selectDevice != device.key ? styles.buttonNotSelected : ""}>
                            {device.name}
                        </button>)}
                    </div>
                    <h2>URL</h2>
                    <p>Insira abaixo o link do site que você deseja realizar a inspeção</p>
                    <div className={styles.inputContent}>
                        <input onChange={e => setUrlInput(e.target.value.slice(0, MAX_URL_SIZE))} type="url" id="url_input" value={urlInput} placeholder="url do site" />
                        <button disabled={!!!urlInput.match(httpRegex) || !!!Devices.find(fdevice => fdevice.key == selectDevice)}>INSPECIONAR</button>
                    </div>
                </>
            </MaxWidth>
        </section>
    </>)
}
