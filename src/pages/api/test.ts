// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import BrowerHandler from "../../utils/Backend/Browser";
const browerHandler = new BrowerHandler();

type TypeRequest = {
  type: string;
};

async function PostRequest(req: TypeRequest) {
  return "";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  browerHandler.print();
  req.method == "POST" && res.send(await PostRequest(req.body));
  res.send("oie");
}
