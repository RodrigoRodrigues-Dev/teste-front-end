// Styles
import styles from "./styles.module.scss";

// External Components
import { Icon } from "@/components/common/SvgIcon";
import Container from "@/components/common/Container";

// Assets
import Logo from "@/assets/images/logo/Logo.png";

// Header Component
const Header = () => (
  <header className={styles.header}>
    <Container>
      {/* Top bar - Purchase assurances */}
      <div className={styles["header__topbar"]}>
        <div className={styles["header__topbar-item"]}>
          <Icon name="shield-check" className={styles["header__topbar-icon"]} />
          <span className={styles["header__topbar-text"]}>
            Compra <span className={styles["header__topbar-highlight"]}>100% segura</span>
          </span>
        </div>
        <div className={styles["header__topbar-item"]}>
          <Icon name="truck" className={styles["header__topbar-icon"]} />
          <span className={styles["header__topbar-text"]}>
            <span className={styles["header__topbar-highlight"]}>Frete grátis</span> acima de R$ 200
          </span>
        </div>
        <div className={styles["header__topbar-item"]}>
          <Icon name="credit-card" className={styles["header__topbar-icon"]} />
          <span className={styles["header__topbar-text"]}>
            <span className={styles["header__topbar-highlight"]}>Parcele</span> suas compras
          </span>
        </div>
      </div>
      {/* Main bar - Logo, search and user actions */}
      <div className={styles["header__main"]}>
        <img className={styles["header__logo"]} src={Logo} alt="Logo" />
        <div className={styles["header__search"]}>
          <input
            className={styles["header__search-input"]}
            type="text"
            placeholder="O que você está buscando?"
          />
          <button className={styles["header__search-button"]}>
            <Icon name="magnifying-glass" className={styles["header__search-icon"]} />
          </button>
        </div>
        <nav>
          <ul className={styles["header__nav"]}>
            <li className={styles["header__nav-item"]}>
              <Icon
                name="group"
                className={`${styles["header__nav-icon"]} ${styles["header__nav-icon--small"]}`}
              />
            </li>
            <li className={styles["header__nav-item"]}>
              <Icon name="heart" className={styles["header__nav-icon"]} />
            </li>
            <li className={styles["header__nav-item"]}>
              <Icon name="user-circle" className={styles["header__nav-icon"]} />
            </li>
            <li className={styles["header__nav-item"]}>
              <Icon name="shopping-cart" className={styles["header__nav-icon"]} />
            </li>
          </ul>
        </nav>
      </div>
      {/* Bottom bar - Main categories menu */}
      <div className={styles["header__bottombar"]}>
        <nav>
          <ul className={styles["header__bottombar-list"]}>
            <li className={styles["header__bottombar-item"]}>Todas categorias</li>
            <li className={styles["header__bottombar-item"]}>Supermercado</li>
            <li className={styles["header__bottombar-item"]}>Livros</li>
            <li className={styles["header__bottombar-item"]}>Moda</li>
            <li className={styles["header__bottombar-item"]}>Lançamentos</li>
            <li
              className={`${styles["header__bottombar-item"]} ${styles["header__bottombar-item--selected"]}`}
            >
              Ofertas do dia
            </li>
            <li className={styles["header__bottombar-item"]}>
              <Icon name="crown-simple" /> Assinatura
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  </header>
);

export default Header;
