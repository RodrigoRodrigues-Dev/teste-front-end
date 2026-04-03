// Styles
import styles from "./styles.module.scss";

// React
import { useState } from "react";

// Types
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    photo: string;
    productName: string;
    price: number;
    description?: string;
  } | null;
};

// Helpers
const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const padQuantity = (n: number) => String(n).padStart(2, "0");

const DEFAULT_DESCRIPTION = (
  <>
    Many desktop publishing packages and web page <br />
    editors now many desktop publishing
  </>
);

// Component
const Modal = ({ isOpen, onClose, product }: ModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  return (
    // Overlay closes modal on click
    <div className={styles["modal__overlay"]} onClick={onClose}>
      {/* Stop propagation to prevent overlay click from firing inside the modal */}
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <button className={styles["modal__close"]} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Product image */}

        <img className={styles["modal__image"]} src={product.photo} alt={product.productName} />

        {/* Product info */}

        <div className={styles["modal__info"]}>
          <h2 className={styles["modal__title"]}>{product.productName.toUpperCase()}</h2>
          <p className={styles["modal__price"]}>{formatBRL(product.price)}</p>
          <p className={styles["modal__description"]}>
            {product.description ?? DEFAULT_DESCRIPTION}
          </p>
          <a className={styles["modal__link"]} href="#">
            Veja mais detalhes do produto &gt;
          </a>

          {/* Quantity selector + buy button */}

          <div className={styles["modal__actions"]}>
            <div className={styles["modal__quantity"]}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{padQuantity(quantity)}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className={styles["modal__buy"]}>COMPRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
