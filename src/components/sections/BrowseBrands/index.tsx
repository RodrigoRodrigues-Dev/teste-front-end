// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";

// Assets
import Logo from "@/assets/images/logo/Logo.png";

// Brand data
const BRANDS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  label: `Marca ${i + 1}`,
}));

// Navigation section by brands with responsive grid.
const BrowseBrands = () => (
  <section className={styles["browse-brands"]}>
    <Container>
      {/* Section title */}
      <h2 className={styles["browse-brands__title"]}>Navegue por marcas</h2>

      <nav className={styles["browse-brands__nav"]}>
        <ul className={styles["browse-brands__list"]}>
          {BRANDS.map((brand) => (
            <li key={brand.id} className={styles["browse-brands__item"]}>
              <a href="" className={styles["browse-brands__link"]} aria-label={brand.label}>
                <img src={Logo} alt={brand.label} className={styles["browse-brands__logo"]} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </section>
);

export default BrowseBrands;
