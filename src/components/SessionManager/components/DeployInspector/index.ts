import { INPUT_deployInspector } from "@/interfaces/Session/input";
import { OUTPUT_getSession } from "@/interfaces/Session/output";
import { INPUT_SessionHandler } from "@/interfaces/SessionHandler";
import { PageHandler } from "@/utils/Backend/Browser";
import { Database } from "@/utils/Backend/Database";

export default async function DeployInspector(deploy: INPUT_deployInspector) {


    const fetchSession = await Database.sessions.findFirst({
        where: {
            userId: deploy.profile.id
        }
    })

    console.log(fetchSession);
    console.log(deploy);
    

    if (fetchSession?.userId && fetchSession.id) {

        console.log("POLENTINA");
        PageHandler.deployRequest({
            ownerId: fetchSession!.userId || deploy.profile.id,
            sessionId: fetchSession!.id,
            url: deploy.url,
            device: deploy.device
        })
    }


}