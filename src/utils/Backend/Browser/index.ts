import "server-only"
import puppeteer, { Page } from "puppeteer";

export default class BrowerHandler {
  page: Page | undefined;
  constructor() {
    (async () => {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: "new",
      });
      const page = await browser.newPage();
      console.log("navegador iniciado com sucesso");

      page.goto("https://www.oi.com.br/oi-play");

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
      path: "./public/bolachinha.png",
    });
  }

  async setResol({ width = 1280, height = 720 }) {
    await this.page?.setViewport({ width, height });
  }
}
