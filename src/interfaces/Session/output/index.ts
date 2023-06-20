import { Sessions } from "@prisma/client";

export interface OUTPUT_getSession {
    isExist: boolean,
    session?: Sessions | null
}

export interface OUTPUT_killSession {
    isDeleted: boolean,
    getSession?: OUTPUT_getSession
}