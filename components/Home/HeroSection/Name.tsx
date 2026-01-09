import styles from "./styles/Name.module.css"

export default function Name() {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        Sunny Narzary
      </div>
      <span className={styles.subtitle}>Software Engineer</span>
    </section>
    
  )
}