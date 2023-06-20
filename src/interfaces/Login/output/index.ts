import { Sessions, Users } from "@prisma/client";

export interface OUTPUT_isLogged {
  isLogged: boolean;
  accessToken?: string;
  profile?: Users | null;
  session?: Sessions | null
}
