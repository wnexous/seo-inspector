import HeaderExternal from "@/Layout/HeaderExternal/Index"
import styles from "./styles.module.scss"
import MaxWidth from "../MaxWidth"

export default function HasLogged() {
    return <>
        <HeaderExternal />
        <MaxWidth>
            <div className={styles.text}>
                <h1>Ops... você já esta logado!.</h1>
                <p>Clique no botão abaixo para retornar para a pagina principal ou encerrar a sessão</p>
                <br />
                <div className={styles.buttonSection}>
                    <a href="/" type="button">Pagina inicial</a>
                    <a href="/signout" type="button">Encerrar sessão</a>
                </div>
            </div>
        </MaxWidth>

    </>
}