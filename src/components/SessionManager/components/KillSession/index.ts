import { OUTPUT_killSession } from "@/interfaces/Session/output";
import { INPUT_SessionHandler } from "@/interfaces/SessionHandler";
import { PageHandler } from "@/utils/Backend/Browser";
import { Database } from "@/utils/Backend/Database";
import GetSession from "../GetSession";
export default async function KillSession({
    user,
}: INPUT_SessionHandler) {
    return await new Promise<OUTPUT_killSession>(async resolve => {

        const fetchSession = await Database.sessions.findFirst({
            where: {
                userId: user.id
            }
        })


        await Database.sessions.delete({
            where: { id: fetchSession?.id }
        })
            .then(async deleted => {
                try {
                    await PageHandler.killSession({
                        ownerId: user.id,
                        //@ts-ignore
                        sessionId: fetchSession?.id
                    })

                } catch (error) {
                    console.log("ERRO AO fechar pagina");
                    console.log(error);

                }
                resolve({
                    isDeleted: true,
                    getSession: await GetSession({ user })
                })
            })
            .catch(async err => {

                console.log(err);
                resolve({
                    isDeleted: false,
                    getSession: await GetSession({ user })
                })
            })

    })


}
