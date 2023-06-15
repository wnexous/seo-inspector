import axios from "axios";

interface requestInterface {
  url: string;
  data: object;
}

interface loginInterface {
  logged: boolean;
}

export const ApiRequest = {
  post: ({ url, data }: requestInterface) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((d) => resolve(d.data))
        .catch((err) => reject(err));
    }),

  get: ({ url, data }: requestInterface) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, { data })
        .then((d) => resolve(d.data))
        .catch((err) => reject(err));
    }),

  login: (token: string) => {
    return {
      logged: new Promise<boolean>((resolve) => {
        axios
          .post("/api/login", {
            data: {
              token,
            },
          })
          .then((d) => resolve(d.data.logged))
          .catch(() => resolve(false));
      }),
    };
  },
};
