import styles from "./styles.module.scss";

import Container from "@/components/common/Container";

import Logo from "@/assets/images/logo/Logo.png";

const BRANDS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  label: `Marca ${i + 1}`,
}));

const BrowseBrands = () => (
  <section className={styles["browse-brands"]}>
    <Container>
      <h2 className={styles["browse-brands__title"]}>Navegue por marcas</h2>

      <nav className={styles["browse-brands__nav"]}>
        <ul className={styles["browse-brands__list"]}>
          {BRANDS.map((brand) => (
            <li key={brand.id} className={styles["browse-brands__item"]}>
              <button
                type="button"
                className={styles["browse-brands__link"]}
                aria-label={brand.label}
              >
                <img src={Logo} alt={brand.label} className={styles["browse-brands__logo"]} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </section>
);

export default BrowseBrands;
