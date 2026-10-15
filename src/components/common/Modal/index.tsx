import styles from "./styles.module.scss";

import { useEffect, useRef, useState } from "react";

import type { Product } from "@/types/products";
import { formatBRL } from "@/utils/currency";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
};

const LAYOUT_DESCRIPTION =
  "Many desktop publishing packages and web page editors now many desktop publishing";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const padQuantity = (quantity: number) => String(quantity).padStart(2, "0");

function getDescription(product: Product) {
  const description = product.descriptionShort.trim();
  const sameAsName = description.toLowerCase() === product.productName.trim().toLowerCase();

  if (!description || sameAsName) return LAYOUT_DESCRIPTION;

  return description;
}

const Modal = ({ isOpen, onClose, product }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (!isOpen || !product) return;

    const dialog = dialogRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const getFocusable = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  return (
    <div className={styles["modal__overlay"]} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles["modal"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles["modal__close"]}
          onClick={onClose}
          aria-label="Fechar"
        >
          ✕
        </button>

        <img className={styles["modal__image"]} src={product.photo} alt={product.productName} />

        <div className={styles["modal__info"]}>
          <h2 id="product-modal-title" className={styles["modal__title"]}>
            {product.productName}
          </h2>
          <p className={styles["modal__price"]}>{formatBRL(product.price)}</p>
          <p className={styles["modal__description"]}>{getDescription(product)}</p>
          <button type="button" className={styles["modal__link"]}>
            Veja mais detalhes do produto &gt;
          </button>

          <div className={styles["modal__actions"]}>
            <div className={styles["modal__quantity"]}>
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                −
              </button>
              <span aria-live="polite">{padQuantity(quantity)}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((current) => current + 1)}
              >
                +
              </button>
            </div>
            <button type="button" className={styles["modal__buy"]}>
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
