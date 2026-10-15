// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";

// HomeHero Component
const HomeHero = () => (
  <section className={styles["home-hero"]}>
    <Container className={styles["home-hero__content"]}>
      <h1 className={styles["home-hero__title"]}>
        Venha conhecer nossas <br /> promoções
      </h1>
      <p className={styles["home-hero__description"]}>
        <span className={styles["home-hero__highlight"]}>50% Off</span> nos produtos
      </p>
      <button type="button" className={styles["home-hero__button"]}>
        Ver produto
      </button>
    </Container>
  </section>
);

export default HomeHero;
