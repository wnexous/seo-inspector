import { Users } from "@prisma/client"

export interface INPUT_deployInspector {
    requestType: string
    url: string
    device: string
    profile: Users

}
export interface INPUT_deployRequest {
    url: string
    ownerId: string
    sessionId: string
    device: string

}