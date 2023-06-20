import { randomBytes } from "crypto";
import { Database } from "../Database";
import { NextApiRequest } from "next";
import { OUTPUT_isLogged } from "@/interfaces/Login/output";
import { Sessions, Users } from "@prisma/client";

export interface tokenInterface {
  username: string;
  accessToken: string;
}

export interface loginInterface {
  username: string;
  password: string;
}

export interface userInterface {
  id: string;
  username: string;
  password: string;
}

export interface loginHandlerInterface {
  logged: boolean;
  accesstoken?: string;
  profile?: Users;
}

export const LoginController = {
  login: async ({ username, password }: loginInterface) => {
    const createToken = randomBytes(32).toString("hex");

    const fetchUser = await new Promise<Users | undefined>((resolve) =>
      Database.users
        .findFirstOrThrow({ where: { AND: [{ username, password }] } })
        .then((user) => resolve(user))
        .catch(() => resolve(undefined))
    );

    if (fetchUser?.id) {
      await Database.login.create({
        data: { userId: fetchUser?.id, token: createToken },
      });

      return { logged: true, accesstoken: createToken, profile: fetchUser };
    } else {
      return { logged: false };
    }
  },
  isLogged: async (req: NextApiRequest) =>
    await new Promise<OUTPUT_isLogged>((resolve) => {
      const splitedEncriptedString: string =
        req.headers.authorization?.split(" ")[1] || "";

      // Decript splited string
      const [username, accessToken] = atob(splitedEncriptedString).split(":");


      const searchUserById = (userId: string) =>
        new Promise<Users | null>((resolve) =>
          Database.users
            .findFirst({ where: { id: userId } })
            .then((user) => resolve(user))
        );


      const searchSessionById = (userId: string) =>
        new Promise<Sessions | null>((resolve) =>
          Database.sessions
            .findFirst({ where: { userId } })
            .then((session) => resolve(session))
        );

      Database.login
        .findFirstOrThrow({
          where: {
            AND: [{ token: accessToken }, { user: { username } }],
          },
        })

        .then(async (data) => {
          resolve({
            isLogged: true,
            profile: await searchUserById(data.userId),
            session: await searchSessionById(data.userId),
            accessToken: accessToken
          });
        })
        .catch((err) => {
          resolve({
            isLogged: false,
            accessToken: accessToken
          });
        });
    }),
};
