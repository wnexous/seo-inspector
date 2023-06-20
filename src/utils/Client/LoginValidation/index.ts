import { OUTPUT_isLogged } from "@/interfaces/Login/output";
import { ApiRequest } from "../../Api";

interface userInterface {
  id: string;
  username: string;
  password: string;
}
export interface loginHandlerInterface {
  logged: boolean;
  accesstoken?: string;
  profile?: userInterface;
}

export default async function IsLogged(
  callback: (e: OUTPUT_isLogged) => void
) {
  const accessToken = localStorage.getItem("access-token") || "";
  const username = localStorage.getItem("username") || "";

  if (accessToken !== "") {
    callback(
      await new Promise<OUTPUT_isLogged>((resolve) =>
        ApiRequest.Verifylogin({
          token: accessToken,
          username,
        }).then((login) => resolve({...login}))
      )
    );
  } else callback({ isLogged: false });
}
