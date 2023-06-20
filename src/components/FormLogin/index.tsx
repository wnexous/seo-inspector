import { useEffect, useState } from "react";
import styles from "./styles.module.scss";


export interface formLoginContentInterface {
    username: string,
    password: string
}
interface formLoginInterface {
    onSubmit: (e: formLoginContentInterface) => void
    disableButton: boolean
}

export default function FormLogin(props: formLoginInterface) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [enableSubmitBtn, setEnableSubmitBtn] = useState(true)


    useEffect(() => {
        setEnableSubmitBtn(
            username !== "" &&
            password !== ""
        )
    }, [username, password])



    return <section className={styles.content}>
        <form className={styles.field} onSubmit={submit => submit.preventDefault()}>
            <h1>Login</h1>
            <span>
                <div>
                    <label htmlFor="username-field">username</label>
                    <input onChange={(e) => setUsername(e.currentTarget.value)} value={username} type="text" id="username-field" placeholder="username" required />
                </div>
                <div>
                    <label htmlFor="password-field">password</label>
                    <input onChange={e => setPassword(e.currentTarget.value)} value={password} type="password" id="password-field" placeholder="password" required />
                </div>
            </span>
            <button type="submit" onClick={() => props.onSubmit({ password, username })} disabled={!enableSubmitBtn || props.disableButton}>Sign in</button>
        </form>
    </section>
}