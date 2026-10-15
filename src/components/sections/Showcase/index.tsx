import styles from "./styles.module.scss";

import Container from "@/components/common/Container";
import Modal from "@/components/common/Modal";
import { Icon } from "@/components/common/SvgIcon";
import type { Product } from "@/types/products";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from "react";

const FILTERS = ["celular", "acessórios", "tablets", "notebooks", "TVs", "Ver todos"] as const;
const CARD_DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const TRANSITION_TIME = 500;

type ProductsStatus = "loading" | "ready" | "fallback";

type ShowcaseProps = {
  products: Product[];
  status: ProductsStatus;
  onRetry?: () => void;
  headingId?: string;
} & ({ primary: true; secondary?: never } | { secondary: true; primary?: never });

function getVisibleCount(width: number) {
  if (width < 720) return 1;
  if (width < 1100) return 2;
  return 4;
}

const Showcase = ({ products, status, onRetry, headingId, ...variant }: ShowcaseProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>(FILTERS[0]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [cardStep, setCardStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(4);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const titleId = headingId ?? (variant.primary ? "showcase-primary" : "showcase-secondary");
  const canSlide = products.length > visibleCount;
  const loopedProducts = canSlide
    ? [...products.slice(-visibleCount), ...products, ...products.slice(0, visibleCount)]
    : products;

  const openProduct = (product: Product) => setSelectedProduct(product);

  const goTo = (direction: 1 | -1) => {
    if (!canSlide || isTransitioning) return;
    setIsTransitioning(true);
    setTransitionEnabled(true);
    setCurrentSlide((current) => current + direction);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || products.length === 0) return;

    const measure = () => {
      const nextVisible = Math.min(getVisibleCount(viewport.clientWidth), products.length);
      const card = track.querySelector<HTMLElement>("[data-product-card]");
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const nextStep = card ? card.getBoundingClientRect().width + gap : 0;

      setVisibleCount((current) => (current === nextVisible ? current : nextVisible));
      setCardStep((current) => (Math.abs(current - nextStep) < 0.5 ? current : nextStep));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [products.length, visibleCount]);

  useEffect(() => {
    setTransitionEnabled(false);
    setCurrentSlide(canSlide ? visibleCount : 0);
    setIsTransitioning(false);
  }, [canSlide, visibleCount, products]);

  useEffect(() => {
    if (transitionEnabled) return;

    const timer = window.setTimeout(() => setTransitionEnabled(true), 50);
    return () => window.clearTimeout(timer);
  }, [transitionEnabled]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;

    const start = visibleCount;
    const end = visibleCount + products.length;

    if (currentSlide >= end) {
      setTransitionEnabled(false);
      setCurrentSlide(currentSlide - products.length);
    } else if (currentSlide < start) {
      setTransitionEnabled(false);
      setCurrentSlide(currentSlide + products.length);
    }

    setIsTransitioning(false);
  };

  const trackStyle = {
    "--visible-cards": String(visibleCount),
    transform: `translateX(-${(canSlide ? currentSlide : 0) * cardStep}px)`,
    transition:
      transitionEnabled && !reduceMotion ? `transform ${TRANSITION_TIME}ms ease-out` : "none",
    visibility: cardStep === 0 && products.length > 0 ? "hidden" : "visible",
  } as CSSProperties;

  return (
    <>
      <section
        className={styles.showcase}
        aria-labelledby={titleId}
        aria-busy={status === "loading"}
      >
        <Container>
          <header className={styles["showcase__header"]}>
            <div className={styles["showcase__header__divider"]} />
            <h2
              id={titleId}
              className={styles["showcase__header__title"]}
            >
              Produtos relacionados
            </h2>
            <div className={styles["showcase__header__divider"]} />
          </header>

          {variant.primary && (
            <div className={styles["showcase__filters"]}>
              <ul className={styles["showcase__filters__list"]}>
                {FILTERS.map((filter) => (
                  <li
                    key={filter}
                    className={`${styles["showcase__filters__item"]} ${
                      filter === activeFilter ? styles["showcase__filters__item--active"] : ""
                    }`}
                  >
                    <button
                      type="button"
                      aria-pressed={filter === activeFilter}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {variant.secondary && (
            <div className={styles["showcase__all"]}>
              <button type="button">Ver todos</button>
            </div>
          )}

          {status === "loading" && products.length === 0 && (
            <p className={styles["showcase__status"]} role="status">
              Carregando produtos...
            </p>
          )}

          {status === "fallback" && variant.primary && (
            <p className={styles["showcase__status"]} role="alert">
              Não foi possível atualizar a vitrine. Exibindo os produtos salvos localmente.{" "}
              <button type="button" onClick={onRetry}>
                Tentar novamente
              </button>
            </p>
          )}

          {status !== "loading" && products.length === 0 && (
            <p className={styles["showcase__status"]}>Nenhum produto encontrado.</p>
          )}
        </Container>

        {products.length > 0 && (
          <div className={styles["showcase__content"]}>
            <div className={styles["showcase__viewport-wrap"]}>
              {canSlide && (
                <button
                  type="button"
                  className={`${styles["showcase__slider-button"]} ${styles["showcase__slider-button--prev"]}`}
                  onClick={() => goTo(-1)}
                  aria-label="Produto anterior"
                  disabled={isTransitioning}
                >
                  <Icon name="arrow-left" size={10} />
                </button>
              )}

              <div className={styles["showcase__viewport"]} ref={viewportRef}>
                <div
                  ref={trackRef}
                  className={styles["showcase__products"]}
                  style={trackStyle}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {loopedProducts.map((product, index) => (
                    <article
                      key={`${product.productName}-${index}`}
                      data-product-card
                      className={styles["showcase__product-card"]}
                      onClick={() => openProduct(product)}
                    >
                      <img
                        className={styles["showcase__product-card__image"]}
                        src={product.photo}
                        alt={product.productName}
                      />

                      <div className={styles["showcase__product-card__info"]}>
                        <p className={styles["showcase__product-card__description"]}>
                          {CARD_DESCRIPTION}
                        </p>

                        <div className={styles["showcase__product-card__prices"]}>
                          <p className={styles["showcase__product-card__price--original"]}>
                            R$ 30,90
                          </p>
                          <p className={styles["showcase__product-card__price--final"]}>R$ 28,90</p>
                          <p className={styles["showcase__product-card__price--installment"]}>
                            ou 2x de R$ 49,95 sem juros
                          </p>
                          <p className={styles["showcase__product-card__price--shipping"]}>
                            Frete grátis
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={styles["showcase__product-card__button"]}
                        aria-label={`Comprar ${product.productName}`}
                        onClick={() => openProduct(product)}
                      >
                        Comprar
                      </button>
                    </article>
                  ))}
                </div>
              </div>

              {canSlide && (
                <button
                  type="button"
                  className={`${styles["showcase__slider-button"]} ${styles["showcase__slider-button--next"]}`}
                  onClick={() => goTo(1)}
                  aria-label="Próximo produto"
                  disabled={isTransitioning}
                >
                  <Icon name="arrow-right" size={10} />
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </>
  );
};

export default Showcase;
