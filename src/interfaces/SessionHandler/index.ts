import { Sessions, Users } from "@prisma/client";

export interface INPUT_SessionHandler {
    user: Users,
}