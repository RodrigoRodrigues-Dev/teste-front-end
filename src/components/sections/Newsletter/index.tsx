import styles from "./styles.module.scss";

import Container from "@/components/common/Container";
import { useState, type FormEvent } from "react";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <Container className={styles["newsletter__container"]}>
        <div className={styles["newsletter__header"]}>
          <h2 id="newsletter-title" className={styles["newsletter__title"]}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles["newsletter__description"]}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <div className={styles["newsletter__form-wrapper"]}>
          {submitted ? (
            <p className={styles["newsletter__success"]} role="status">
              Inscrição realizada. Obrigado por acompanhar a Econverse.
            </p>
          ) : (
            <form className={styles["newsletter__form"]} onSubmit={handleSubmit}>
              <div className={styles["newsletter__fields"]}>
                <label className="sr-only" htmlFor="newsletter-name">
                  Nome
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Digite seu nome"
                  className={styles["newsletter__input"]}
                  required
                />

                <label className="sr-only" htmlFor="newsletter-email">
                  E-mail
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  className={styles["newsletter__input"]}
                  required
                />

                <button type="submit" className={styles["newsletter__button"]}>
                  INSCREVER
                </button>
              </div>

              <div className={styles["newsletter__terms"]}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className={styles["newsletter__checkbox"]}
                  required
                />
                <label htmlFor="terms" className={styles["newsletter__terms-label"]}>
                  Aceito os termos e condições
                </label>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
