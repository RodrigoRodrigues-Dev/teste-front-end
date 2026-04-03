// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";

const Newsletter = () => (
  <section className={styles.newsletter}>
    <Container className={styles["newsletter__container"]}>
      <div className={styles["newsletter__header"]}>
        <h2 className={styles["newsletter__title"]}>Inscreva-se na nossa newsletter</h2>
        <p className={styles["newsletter__description"]}>
          Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
        </p>
      </div>

      <div className={styles["newsletter__form-wrapper"]}>
        <form className={styles["newsletter__form"]}>
          <div>
            <input
              type="text"
              placeholder="Digite seu nome"
              className={styles["newsletter__input"]}
            />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className={styles["newsletter__input"]}
            />

            <button type="submit" className={styles["newsletter__button"]}>
              INSCREVER
            </button>
          </div>

          <div className={styles["newsletter__terms"]}>
            <input type="checkbox" id="terms" className={styles["newsletter__checkbox"]} />
            <label htmlFor="terms" className={styles["newsletter__terms-label"]}>
              Aceito os termos e condições
            </label>
          </div>
        </form>
      </div>
    </Container>
  </section>
);

export default Newsletter;
