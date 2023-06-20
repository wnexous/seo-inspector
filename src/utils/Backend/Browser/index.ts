import puppeteer, { Browser, Page } from "puppeteer";
import { Database } from "../Database";

let PageSession: BrowerHandler;

declare global {
  namespace NodeJS {
    interface Global {
      PageSession: BrowerHandler;
    }
  }
}

interface defaultPageHandlerInterface {
  ownerId: string;
  sessionId: string;
}

interface browserSessionsInterface {
  sessionId: string;
  page: Page;
  ownerId: string;
  url?: string;
}

export interface defaultReturnInterface {
  error?: boolean;
  hasOpen?: boolean;
  isOpen?: boolean;
  message: string;
  sessionId?: string;
}

class BrowerHandler {
  browser: Browser | undefined;
  sessions: browserSessionsInterface[] = [];

  // Launch browser
  constructor() {
    (async () => {
      this.browser = await puppeteer.launch({ args: ["--no-sandbox"], headless: "new", })
      this._deploySessions()
    })();
  }

  async _deploySessions() {

    return await Database.sessions.findMany().then(
      fetchedSession => {
        fetchedSession.forEach(async singleSession => {
          await this.createSession({ sessionId: singleSession.id, ownerId: singleSession.userId })
        })
      }
    )

  }
  createSession({ sessionId, ownerId }: defaultPageHandlerInterface) {

    return new Promise<defaultReturnInterface>(async (resolve, reject) => {

      if (this.browser) {
        const verifyIfUserGotASession = this.sessions.find(
          (findUser) => findUser.ownerId == ownerId
        );

        if (!!!verifyIfUserGotASession) {
          try {

            const newPage = await this.browser!.newPage()

            this.sessions.push({
              sessionId,
              page: newPage,
              ownerId,
            });
            resolve({
              message: "page successful openned",
              hasOpen: true,
              isOpen: true,
              sessionId,
            });
          } catch (error) {
            resolve({
              error: true,
              hasOpen: false,
              isOpen: true,
              message: "error when try open a new page",
            });
          }
        } else {
          resolve({
            message: "page has openned. A user can open only one session",
            hasOpen: false,
            isOpen: true,
            sessionId,
          });
        }
      } else {

        console.log("Brower fechado");
        resolve({
          error: true,
          hasOpen: false,
          isOpen: false,
          message: "Brower not openned. Please contact a administrator.",
        });
      }
    });
  }

  async killSession({ sessionId, ownerId }: defaultPageHandlerInterface) {
    const newPageList = await new Promise<browserSessionsInterface[]>(async resolve => {

      try {
        const handleSession = this.sessions.find(hs => hs.sessionId == sessionId || hs.ownerId == ownerId)
        this.sessions = this.sessions.filter(fs => fs.sessionId != sessionId || fs.ownerId != ownerId)

        // close the browser
        if (handleSession && !handleSession?.page.isClosed()) await handleSession?.page.close()
        resolve(this.sessions)

      } catch (error) {
        resolve(this.sessions)
      }

    })
    this.sessions = newPageList

  }
  getSession({ sessionId }: defaultPageHandlerInterface) {
    return this.sessions.find(findSession => findSession.sessionId == sessionId)
  }
}

//@ts-ignore
if (!globalThis.PageSession) globalThis.PageSession = new BrowerHandler();
//@ts-ignore
PageSession = globalThis.PageSession;
export const PageHandler = PageSession;
