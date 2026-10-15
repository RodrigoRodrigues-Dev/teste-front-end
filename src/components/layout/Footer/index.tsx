// Styles
import styles from "./styles.module.scss";

// External Components
import { Icon } from "@/components/common/SvgIcon";
import Container from "@/components/common/Container";

// Assets
import Logo from "@/assets/images/logo/Logo.png";

const Footer = () => (
  <footer className={styles.footer}>
    {/* Footer top */}
    <div className={styles["footer__top"]}>
      <Container className={styles["footer__container"]}>
        <div className={styles["footer__brand"]}>
          <img className={styles["footer__logo"]} src={Logo} alt="Econverse" />

          <p className={styles["footer__description"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <nav className={styles["footer__social"]} aria-label="Redes sociais">
            <ul className={styles["footer__social-list"]}>
              {[
                ["instagram", "Instagram"],
                ["facebook", "Facebook"],
                ["linkedin", "LinkedIn"],
              ].map(([icon, label]) => (
                <li key={icon} className={styles["footer__social-item"]}>
                  <button
                    type="button"
                    className={styles["footer__social-link"]}
                    aria-label={label}
                  >
                    <Icon name={icon} className={styles["footer__social-icon"]} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles["footer__divider"]}></div>

        <nav className={styles["footer__menu"]} aria-label="Informações institucionais">
          {(
            [
              ["Institucional", ["Sobre Nós", "Movimento", "Trabalhe conosco"]],
              ["Ajuda", ["Suporte", "Fale Conosco", "Perguntas Frequentes"]],
              [
                "Termos",
                ["Termos e Condições", "Política de Privacidade", "Troca e Devolução"],
              ],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h3 className={styles["footer__menu-title"]}>{title}</h3>
              <ul className={styles["footer__menu-list"]}>
                {links.map((link) => (
                  <li key={link} className={styles["footer__menu-item"]}>
                    <button type="button" className={styles["footer__menu-link"]}>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
    </div>
    {/* Footer bottom */}
    <p className={styles["footer__bottom"]}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
  </footer>
);

export default Footer;
