// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";
import Modal from "@/components/common/Modal";

// React
import { useEffect, useState, useRef } from "react";

// Data
import { MOCK_PRODUCTS } from "./mockData";

type ShowcaseProps = { primary: true; secondary?: never } | { secondary: true; primary?: never };

const VISIBLE_CARDS = 4;
const TRANSITION_TIME = 500;

// Component
const Showcase = (props: ShowcaseProps) => {
  const productsWithRepetition = [
    ...MOCK_PRODUCTS.slice(-VISIBLE_CARDS),
    ...MOCK_PRODUCTS,
    ...MOCK_PRODUCTS.slice(0, VISIBLE_CARDS),
  ];

  const [currentSlide, setCurrentSlide] = useState(VISIBLE_CARDS);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof MOCK_PRODUCTS)[0] | null>(null);
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

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentSlide >= maxSlide) {
        setTransitionEnabled(false);
        setCurrentSlide(VISIBLE_CARDS);
      } else if (currentSlide < VISIBLE_CARDS) {
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

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  return (
    <>
      <section className={styles.showcase}>
        <Container>
          <header className={styles["showcase__header"]}>
            <div className={styles["showcase__header__divider"]}></div>
            <h2 className={styles["showcase__header__title"]}>Produtos relacionados</h2>
            <div className={styles["showcase__header__divider"]}></div>
          </header>

          {props.primary && (
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
          )}

          {props.secondary && (
            <div className={styles["showcase__all"]}>
              <a href="">Ver todos</a>
            </div>
          )}
        </Container>

        <button
          className={styles["showcase__slider-button"]}
          onClick={prevSlide}
          aria-label="Produto anterior"
          disabled={isTransitioning}
        >
          ‹
        </button>

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
              {productsWithRepetition.map((product, index) => (
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
                    <h3 className={styles["showcase__product-card__title"]}>
                      {product.productName}
                    </h3>

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

                  <button
                    className={styles["showcase__product-card__button"]}
                    onClick={() => setSelectedProduct(product)}
                  >
                    Comprar
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>

        <button
          className={styles["showcase__slider-button"]}
          onClick={nextSlide}
          aria-label="Próximo produto"
          disabled={isTransitioning}
        >
          ›
        </button>
      </section>

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </>
  );
};

export default Showcase;
