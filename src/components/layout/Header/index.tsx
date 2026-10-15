import styles from "./styles.module.scss";

import { Icon } from "@/components/common/SvgIcon";
import Container from "@/components/common/Container";

import Logo from "@/assets/images/logo/Logo.png";

const Header = () => (
  <header className={styles.header}>
    <Container>
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
      <div className={styles["header__main"]}>
        <img className={styles["header__logo"]} src={Logo} alt="Econverse" />
        <form
          className={styles["header__search"]}
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="site-search">
            O que você está buscando?
          </label>
          <input
            id="site-search"
            className={styles["header__search-input"]}
            type="search"
            placeholder="O que você está buscando?"
          />
          <button type="submit" className={styles["header__search-button"]} aria-label="Buscar">
            <Icon name="magnifying-glass" className={styles["header__search-icon"]} />
          </button>
        </form>
        <nav aria-label="Atalhos da conta">
          <ul className={styles["header__nav"]}>
            <li>
              <button type="button" className={styles["header__icon-button"]} aria-label="Pedidos">
                <Icon
                  name="group"
                  className={`${styles["header__nav-icon"]} ${styles["header__nav-icon--small"]}`}
                />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={styles["header__icon-button"]}
                aria-label="Favoritos"
              >
                <Icon name="heart" className={styles["header__nav-icon"]} />
              </button>
            </li>
            <li>
              <button
                type="button"
                className={styles["header__icon-button"]}
                aria-label="Minha conta"
              >
                <Icon name="user-circle" className={styles["header__nav-icon"]} />
              </button>
            </li>
            <li>
              <button type="button" className={styles["header__icon-button"]} aria-label="Carrinho">
                <Icon name="shopping-cart" className={styles["header__nav-icon"]} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles["header__bottombar"]}>
        <nav aria-label="Categorias principais">
          <ul className={styles["header__bottombar-list"]}>
            {[
              "Todas categorias",
              "Supermercado",
              "Livros",
              "Moda",
              "Lançamentos",
              "Ofertas do dia",
            ].map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className={`${styles["header__bottombar-item"]} ${
                    item === "Ofertas do dia" ? styles["header__bottombar-item--selected"] : ""
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <button type="button" className={styles["header__bottombar-item"]}>
                <Icon name="crown-simple" /> Assinatura
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  </header>
);

export default Header;
