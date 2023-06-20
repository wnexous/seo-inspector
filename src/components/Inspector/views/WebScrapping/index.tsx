import TitleTag from "@/components/TitleTag"
import styles from "./styles.module.scss"
import { ChangeEvent, useEffect, useState } from "react"
import { ApiRequest } from "@/utils/Api"

export default function WebScrapping() {

    const [sendButton, setSendButton] = useState(false)
    // const [hasSubmit, setHasSubmit] = useState(false)
    const [description, setDescription] = useState("")

    const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    // useEffect(() => {
    //     setSendButton(false)
    //     if (urlInput !== "") {
    //         try {
    //             new URL(urlInput)
    //             if (httpRegex.test(urlInput)) {
    //                 setSendButton(true)
    //                 setDescription("")
    //             } else {
    //                 setDescription("Insira uma url válida")
    //             }
    //         } catch (error) {
    //             setDescription("Insira uma url válida")
    //         }
    //     }
    //     else setDescription("")
    // }, [urlInput])


    return <div className={styles.content}>
        <div>
            <h1>Web-scrapping</h1>
            <p>Ferramenta para mineração interna de dados.</p>
        </div>

        <div>
            <TitleTag tag="V1 - BETA">
                Nexus Inspector
            </TitleTag>
            <>
                {/* <label htmlFor="url_input">Insira a url no campo abaixo</label> */}
                <p>Experimente nosso Inspetor SEO BETA que conta com análise de dados simulando um usuário real.</p>
                <p>Ao clicar no botão abaixo, iniciaremos uma nova instancia responsável por fazer a inspeção em seu site.</p>
                <div className={styles.inputcontent} data-description={description}>

                    <a href="/nexus-inspector" type="button">Teste agora.</a>
                </div>
            </>
        </div>

        <div className={styles.cards}>
            <ul>
                <li>
                    <h3>
                        Como funciona?
                    </h3>
                    <p>Insira a URL do site desejado e faremos uma varredura de Meta tags, Tagueamento, e SEO.</p>
                </li>
                <li>
                    <h3>
                        É seguro?
                    </h3>
                    <p>Utilizamos um bot que simula um usuário comum navegando pelo site.</p>
                </li>
                <li>
                    <h3>
                        Regras
                    </h3>
                    <p>Evitar uso intensivo para evitar Stack overflow (estouro de pilha) da ferramenta.</p>
                </li>
            </ul>

        </div>

    </div>
}