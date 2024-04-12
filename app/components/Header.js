import styles from "../page.module.css";

export default function Header() {

    return (
        <div className={styles.header}>
            <h1 className={styles.site_title}>Blog</h1>
            <p>プログラミング初心者がアウトプットの目的で記事を書いています。</p>
        </div>
    );
}
