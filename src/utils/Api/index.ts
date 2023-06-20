import axios from "axios";
import { loginHandlerInterface } from "../Backend/Login";
import { OUTPUT_isLogged } from "@/interfaces/Login/output";

interface requestInterface {
  url: string;
  data: object;
}

interface loginInterface {
  username: string;
  password: string;
}

export const ApiRequest = {
  post: async ({ url, data }: requestInterface) =>
    await new Promise<any>((resolve, reject) =>
      axios
        .post(
          url,
          { data },
          {
            auth: {
              username: localStorage.getItem("username") || "",
              password: localStorage.getItem("access-token") || "",
            },
          }
        )
        .then((d) => {
          resolve(d.data);
        })
        .catch((err) => reject(err))
    ),

  get: ({ url, data }: requestInterface) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, { data })
        .then((d) => resolve(d.data))
        .catch((err) => reject(err));
    }),

  login: ({ username, password }: loginInterface) =>
    new Promise<loginHandlerInterface>((resolve) => {
      axios
        .post("/api/login/login", {
          data: {
            username,
            password,
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(() => resolve({ logged: false }));
    }),
  Verifylogin: async ({
    token,
    username,
  }: {
    token: string;
    username: string;
  }) => {
    return await new Promise<OUTPUT_isLogged>((resolve) => {
      axios
        .post("/api/login/verify-login", {}, {
          auth: {
            username,
            password: token
          }
        })
        .then((d) => {
          resolve(d.data);
        })
        .catch(() => {
          resolve({ isLogged: false });
        });
    });
  },
};
