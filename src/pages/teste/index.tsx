import { useGlobalContext } from "@/Context/store"
import styles from "./styles.module.scss"

export default function test() {

    const userProfile = useGlobalContext()
    return (
        <div className={styles.container}>
            name
            {userProfile.username}
        </div>)
}
