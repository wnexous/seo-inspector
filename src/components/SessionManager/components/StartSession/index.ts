import { INPUT_SessionHandler } from "@/interfaces/SessionHandler";
import { PageHandler } from "@/utils/Backend/Browser";
import { Database } from "@/utils/Backend/Database";

export default async function StartSession({
  user
}: INPUT_SessionHandler) {

  const fetchSession = await Database.sessions.findFirst({
    where: {
      userId: user.id
    }
  })

  const newSession = await Database.sessions.create({
    data: { userId: user.id },
  });

  const getBrowerSession = await PageHandler.createSession({
    sessionId: newSession.id,
    ownerId: user.id,
  });

  if (getBrowerSession.error) {
    Database.sessions.delete({
      where: { id: newSession.id },
    });
    PageHandler.killSession({ sessionId: newSession.id, ownerId: user.id });
    return { ...getBrowerSession, sessionKilled: true };
  }

  return { ...fetchSession, browser: { ...getBrowerSession } };
}
