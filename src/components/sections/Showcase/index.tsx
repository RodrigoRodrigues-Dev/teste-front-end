// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";

// React
import { useEffect, useState, useRef } from "react";

// Data
import { MOCK_PRODUCTS } from "./mockData";

type ShowcaseProps = { primary: true; secondary?: never } | { secondary: true; primary?: never };

const VISIBLE_CARDS = 4;
const TRANSITION_TIME = 500;

const Showcase = (props: ShowcaseProps) => {
  // Criar array com clones no início e final para loop infinito perfeito
  const produtosComRepeticao = [
    ...MOCK_PRODUCTS.slice(-VISIBLE_CARDS), // Clona últimos 4 no início
    ...MOCK_PRODUCTS,
    ...MOCK_PRODUCTS.slice(0, VISIBLE_CARDS), // Clona primeiros 4 no final
  ];

  const [currentSlide, setCurrentSlide] = useState(VISIBLE_CARDS); // Começa no primeiro real
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = MOCK_PRODUCTS.length;
  const maxSlide = VISIBLE_CARDS + totalSlides;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionEnabled(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionEnabled(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Gerenciar o loop infinito sem saltos visíveis
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentSlide >= maxSlide) {
        // Voltou para o final, resetar para o começo
        setTransitionEnabled(false);
        setCurrentSlide(VISIBLE_CARDS);
      } else if (currentSlide < VISIBLE_CARDS) {
        // Voltou para trás do início, resetar para o final
        setTransitionEnabled(false);
        setCurrentSlide(maxSlide - VISIBLE_CARDS);
      }
      setIsTransitioning(false);
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("transitionend", handleTransitionEnd);
      return () => slider.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentSlide, maxSlide]);

  // Reabilitar transição após resetar posição
  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  return (
    <section className={styles.showcase}>
      <Container>
        {/* Header */}
        <header className={styles["showcase__header"]}>
          <div className={styles["showcase__header__divider"]}></div>
          <h2 className={styles["showcase__header__title"]}>Produtos relacionados</h2>
          <div className={styles["showcase__header__divider"]}></div>
        </header>

        {props.primary && (
          <>
            {/* Filters Navigation */}
            <nav className={styles["showcase__filters"]}>
              <ul className={styles["showcase__filters__list"]}>
                <li className={styles["showcase__filters__item"]}>
                  <a className={styles["showcase__filters__link"]} href="">
                    celular
                  </a>
                </li>
                <li className={styles["showcase__filters__item"]}>
                  <a className={styles["showcase__filters__link"]} href="">
                    acessórios
                  </a>
                </li>
                <li className={styles["showcase__filters__item"]}>
                  <a className={styles["showcase__filters__link"]} href="">
                    tablets
                  </a>
                </li>
                <li className={styles["showcase__filters__item"]}>
                  <a className={styles["showcase__filters__link"]} href="">
                    notebooks
                  </a>
                </li>
                <li className={styles["showcase__filters__item"]}>
                  <a className={styles["showcase__filters__link"]} href="">
                    TVs
                  </a>
                </li>
                <li className={styles["showcase__filters__item"]}>
                  <a className={styles["showcase__filters__link"]} href="">
                    Ver todos
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}

        {props.secondary && (
          <>
            {/* All */}
            <div className={styles["showcase__all"]}>
              <a href="">Ver todos</a>
            </div>
          </>
        )}
      </Container>

      {/* Slider Button Prev */}
      <button
        className={styles["showcase__slider-button"]}
        onClick={prevSlide}
        aria-label="Produto anterior"
        disabled={isTransitioning}
      >
        ‹
      </button>

      {/* Products Slider */}
      <div className={styles["showcase__content"]}>
        <div className={styles["showcase__slider-wrapper"]}>
          <div
            ref={sliderRef}
            className={styles["showcase__products"]}
            style={{
              transform: `translateX(-${currentSlide * 25}%)`,
              transition: transitionEnabled ? `transform ${TRANSITION_TIME}ms ease-out` : "none",
            }}
          >
            {produtosComRepeticao.map((product, index) => (
              <article
                className={styles["showcase__product-card"]}
                key={`${product.productName}-${index}`}
              >
                <img
                  className={styles["showcase__product-card__image"]}
                  src={product.photo}
                  alt={product.productName}
                />

                <div className={styles["showcase__product-card__info"]}>
                  <h3 className={styles["showcase__product-card__title"]}>{product.productName}</h3>

                  <p className={styles["showcase__product-card__description"]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>

                  <div className={styles["showcase__product-card__prices"]}>
                    <p className={styles["showcase__product-card__price--original"]}>R$ 30,90</p>

                    <p className={styles["showcase__product-card__price--final"]}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </p>

                    <p className={styles["showcase__product-card__price--installment"]}>
                      ou 2x de R$ 49,95 sem juros
                    </p>

                    <p className={styles["showcase__product-card__price--shipping"]}>
                      Frete grátis
                    </p>
                  </div>
                </div>

                <button className={styles["showcase__product-card__button"]}>Comprar</button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Button Next */}
      <button
        className={styles["showcase__slider-button"]}
        onClick={nextSlide}
        aria-label="Próximo produto"
        disabled={isTransitioning}
      >
        ›
      </button>
    </section>
  );
};

export default Showcase;
