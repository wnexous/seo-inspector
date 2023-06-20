import { OUTPUT_getSession } from "@/interfaces/Session/output";
import { INPUT_SessionHandler } from "@/interfaces/SessionHandler";
import { Database } from "@/utils/Backend/Database";

export default async function GetSession({
    user
}: INPUT_SessionHandler) {

    return new Promise<OUTPUT_getSession>(async resolve => {
        const fetchSession = await Database.sessions.findFirst({
            where: {
                userId: user.id
            }
        })
        resolve({
            isExist: !!fetchSession,
            session: fetchSession
        })

    })

}
