// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import "server-only";
import { useGlobalContext } from "@/Context/store";
import ServerResponse from "@/components/ServerResponse";
import SessionManager from "@/components/SessionManager";
import { LoginController } from "@/utils/Backend/Login";
import { RequestType } from "@/utils/Types/ResquestTypes";
import type { NextApiRequest, NextApiResponse } from "next";
// const browerHandler = new BrowerHandler();

export type TypeRequest = {
  requestType: string;
};

const requestTypes = Object.keys(RequestType).map(
  // @ts-ignore
  (key: string) => RequestType[key]
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // verifica se o metodo é post
    if (req.method == "POST") {
      const data: TypeRequest = req.body.data;
      const userAuth = await LoginController.isLogged(req);

      if (
        userAuth.isLogged &&
        data &&
        requestTypes.includes(data.requestType)
      ) {
        res.json(
          await SessionManager({
            data,
            //@ts-ignore
            profile: userAuth.profile
          })
        );
      } else {
        res.json(ServerResponse(405));
      }
    } else {
      res.json(ServerResponse(405));
    }
  } catch (error) {
    console.log(error);
    res.json(ServerResponse(401));
  }
}
