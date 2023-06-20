import { Messages } from "@/utils/Types/StatusCodes";
import { NextApiResponse } from "next";

export default function ServerResponse(status: number) {
  // @ts-ignore
  return { message: Messages[status]["large"], status, error: true };
}
