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

  if (!!!fetchSession) {

    const newSession = await Database.sessions.create({
      data: { userId: user.id },
    });

    const getBrowserSession = await PageHandler.createSession({
      sessionId: newSession.id,
      ownerId: user.id,
    });

    if (getBrowserSession.error) {
      Database.sessions.delete({
        where: { id: newSession.id },
      });
      PageHandler.killSession({ sessionId: newSession.id, ownerId: user.id });
      return { ...getBrowserSession, sessionKilled: true };
    }

    return { ...newSession, browser: { ...getBrowserSession } };

  }
  else {
    const getBrowserSession = PageHandler.getSession({ ownerId: fetchSession.userId, sessionId: fetchSession.id })
    return { ...fetchSession, browser: { ...getBrowserSession } };

  }



}
