import styles from "./styles.module.scss"
export default function MaxWidth({ children = <></> }) {
    return <div className={styles.maxWidth}>{children}</div>
}