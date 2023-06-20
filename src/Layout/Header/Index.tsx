import { useGlobalContext } from "@/Context/store"
import styles from "./styles.module.scss"


interface HeaderInterface {
    username: string
}
export default function Header(props: HeaderInterface) {



    return <div className={styles.content}>

        <p>SEO-INSPECTOR</p>

        <div>
            <b>{props.username}</b>
            <span>by A.D.N</span>
        </div>



    </div>
}