
import styles from "./styles.module.scss"

interface titleTagInterface {
    children: any,
    tag: string
}
export default function TitleTag({ children, tag }: titleTagInterface) {
    return <div className={styles.content}>

        <h2>{children}</h2>
        <span>{tag}</span>

    </div>
}