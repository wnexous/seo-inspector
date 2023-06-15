import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import IsLogged from "@/utils/LoginValidation"
import { render } from "react-dom"
import { useGlobalContext } from "@/Context/store"

export default function LoginLayout() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [enableSubmitBtn, setEnableSubmitBtn] = useState(true)


    const [isLoggedState, setIsLoggedState] = useState<boolean>(false)

    useEffect(() => {
        IsLogged().then(state => {
            setIsLoggedState(state)
        })
    }, [render])

    useEffect(() => {
        setEnableSubmitBtn(
            username !== "" &&
            password !== ""
        )

    }, [username, password])

    const handleSignIn = () => {
    }

    // const { userId } = useGlobalContext()

    return (<section className={styles.content}>
        <div className={styles.field}>
            <h1>Login</h1>
            <span>
                <div>
                    <label htmlFor="username-field">username</label>
                    <input onChange={e => setUsername(e.target.value)} value={username} type="text" id="username-field" name="user" placeholder="username" />
                </div>
                <div>
                    <label htmlFor="password-field">password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="password-field" name="pwd" placeholder="password" />
                </div>
            </span>
            <button type="button" onClick={handleSignIn} disabled={!enableSubmitBtn}>Sign in</button>
        </div>
    </section>)
}