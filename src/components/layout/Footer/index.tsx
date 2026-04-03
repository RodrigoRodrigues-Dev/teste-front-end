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
          <img className={styles["footer__logo"]} src={Logo} alt="Logo" />

          <p className={styles["footer__description"]}>
            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
          </p>

          <nav className={styles["footer__social"]}>
            <ul className={styles["footer__social-list"]}>
              <li className={styles["footer__social-item"]}>
                <a className={styles["footer__social-link"]} href="">
                  <Icon name="instagram" className={styles["footer__social-icon"]} />
                </a>
              </li>

              <li className={styles["footer__social-item"]}>
                <a className={styles["footer__social-link"]} href="">
                  <Icon name="facebook" className={styles["footer__social-icon"]} />
                </a>
              </li>

              <li className={styles["footer__social-item"]}>
                <a className={styles["footer__social-link"]} href="">
                  <Icon name="linkedin" className={styles["footer__social-icon"]} />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles["footer__divider"]}></div>

        <nav className={styles["footer__menu"]}>
          <ul className={styles["footer__menu-list"]}>
            <li className={styles["footer__menu-title"]}>Institucional</li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Sobre Nós
              </a>
            </li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Movimento
              </a>
            </li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Trabalhe conosco
              </a>
            </li>
          </ul>

          <ul className={styles["footer__menu-list"]}>
            <li className={styles["footer__menu-title"]}>Ajuda</li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Suporte
              </a>
            </li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Fale Conosco
              </a>
            </li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Perguntas Frequentes
              </a>
            </li>
          </ul>

          <ul className={styles["footer__menu-list"]}>
            <li className={styles["footer__menu-title"]}>Termos de Uso</li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Termos e Condições
              </a>
            </li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Política de Privacidade
              </a>
            </li>
            <li className={styles["footer__menu-item"]}>
              <a className={styles["footer__menu-link"]} href="">
                Troca e Devolução
              </a>
            </li>
          </ul>
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
