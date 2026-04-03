// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";

// Partner card data
const PARTNER_CARDS = [
  {
    id: 1,
    title: "Parceiros",
    description: "Lorem ipsum dolor sit",
    descriptionContinue: "amet, consectetur",
  },
  {
    id: 2,
    title: "Parceiros",
    description: "Lorem ipsum dolor sit",
    descriptionContinue: "amet, consectetur",
  },
];

const Partners = () => (
  <section className={styles.partners}>
    <Container className={styles["partners__container"]}>
      {PARTNER_CARDS.map((card) => (
        <div key={card.id} className={styles["partners__card"]}>
          <div className={styles["partners__card__content"]}>
            <h3 className={styles["partners__card__title"]}>{card.title}</h3>
            <p className={styles["partners__card__description"]}>
              {card.description} <br /> {card.descriptionContinue}
            </p>
            <button className={styles["partners__card__button"]}>Confira</button>
          </div>
        </div>
      ))}
    </Container>
  </section>
);

export default Partners;
