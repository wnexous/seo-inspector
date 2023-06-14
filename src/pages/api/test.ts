// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import puppeteer, { Page } from "puppeteer";

class BrowerHandler {
  page: Page | undefined;
  constructor() {
    (async () => {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: "new",
      });
      const page = await browser.newPage();
      console.log("navegador iniciado com sucesso");

      // page.goto("https://www.oi.com.br/oi-play");

      console.log("pagina acessada");
      this.page = page;
    })();
  }

  async goto(url: string) {
    return await this.page?.goto(url);
  }

  async print() {
    console.log("Printando tela");
    return await this.page?.screenshot({
      path: "./BOLACVHINHA.png",
    });
  }

  async setResol({ width = 1280, height = 720 }) {
    await this.page?.setViewport({ width, height });
  }
}

type TypeRequest = {
  type: string;
};

const browerHandler = new BrowerHandler();

async function PostRequest(req: TypeRequest) {
  req.type;

  return "";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  browerHandler.print();

  req.method == "POST" && res.send(await PostRequest(req.body));

  res.send("oie");
}
