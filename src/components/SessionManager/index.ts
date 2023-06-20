import { TypeRequest } from "@/pages/api/session";
import { RequestType } from "@/utils/Types/ResquestTypes";
import KillSession from "./components/KillSession";
import GetSession from "./components/GetSession";
import StartSession from "./components/StartSession";
import { Database } from "@/utils/Backend/Database";
import { Users } from "@prisma/client";

interface sessionManagerInterface {
  data: TypeRequest;
  profile: Users;
}

export default async function SessionManager(
  sessionManager: sessionManagerInterface
) {

  const fetchSession = await Database.sessions.findFirst({
    where: {
      userId: sessionManager.profile.id
    }
  })
  try {
    return (
      (sessionManager.data.requestType == RequestType.getSession &&
        GetSession({
          user: sessionManager.profile,

        })) ||
      (sessionManager.data.requestType == RequestType.killSession &&
        KillSession({
          user: sessionManager.profile,

        })) ||
      (sessionManager.data.requestType == RequestType.startSession &&
        StartSession({
          user: sessionManager.profile,

        }))
        
    );
  } catch (error) {
    console.log("ERRRRRRORRR");
    return {
      error: true,
      message: "user not-found, please contact a administrator",
    };
  }
}
