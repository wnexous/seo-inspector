import ServerResponse from "@/components/ServerResponse";
import { OUTPUT_isLogged } from "@/interfaces/Login/output";
import { LoginController, tokenInterface } from "@/utils/Backend/Login";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OUTPUT_isLogged>,
) {

  if (req.method == "POST") {
    const userAuth = await LoginController.isLogged(req)
    if (userAuth.accessToken && userAuth.profile?.username) res.json(userAuth);
    else res.send({ ...userAuth, ...ServerResponse(400) });
  }
}
