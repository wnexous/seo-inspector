import { TypeRequest } from "@/pages/api/session";
import { RequestType } from "@/utils/Types/ResquestTypes";
import KillSession from "./components/KillSession";
import GetSession from "./components/GetSession";
import StartSession from "./components/StartSession";
import { Database } from "@/utils/Backend/Database";
import { Users } from "@prisma/client";
import DeployInspector from "./components/DeployInspector";

export interface sessionManagerInterface {
  data: any;
  profile: Users;
}

export default async function SessionManager(
  sessionManager: sessionManagerInterface
) {


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

        })) ||
      (sessionManager.data.requestType == RequestType.deployInspector &&
        DeployInspector({
          profile: sessionManager.profile,
          ...sessionManager.data
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
