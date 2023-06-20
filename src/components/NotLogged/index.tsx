import HeaderExternal from "@/Layout/HeaderExternal/Index"
import styles from "./styles.module.scss"
import MaxWidth from "../MaxWidth"

export default function NotLogged() {
    return <>
        <HeaderExternal />
        <MaxWidth>
            <div className={styles.text}>
                <h1>Oh oh... parece que você não esta logado.</h1>
                <p>Detectamos que você nao efetuou o login. Clique no botão abaixo para realizar seu login</p>
                <br />
                <a href="/signin" type="button">Entrar na minha conta</a>
            </div>
        </MaxWidth>

    </>
}