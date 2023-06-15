import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function LoginHandler() {
  console.log("Loudando aqui");
  return true;
}

const prisma = new PrismaClient();

prisma.users
  .findFirstOrThrow({ where: { id: 2 } })
  .then((data) => {
    console.log("dado do servidor");
    console.log(data);
  })
  .catch((err) => {
    console.log(err.digest);
  });

  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("caiu em login");
  res.json({
    logged: await LoginHandler(),
  });
}
