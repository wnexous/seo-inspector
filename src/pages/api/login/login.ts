import ServerResponse from "@/components/ServerResponse";
import { LoginController, loginInterface } from "@/utils/Backend/Login";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { username, password }: loginInterface = req.body.data;
    if (username && password)
      res.json(await LoginController.login({ password, username }));
    else res.status(400).json(ServerResponse(400));
  }
}
