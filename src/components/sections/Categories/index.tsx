// Styles
import styles from "./styles.module.scss";

// External Components
import Container from "@/components/common/Container";

// Assets
import img1 from "@/assets/images/card/devices.png";
import img2 from "@/assets/images/card/supermercados.png";
import img3 from "@/assets/images/card/whiskey.png";
import img4 from "@/assets/images/card/ferramentas.png";
import img5 from "@/assets/images/card/cuidados-de-saude.png";
import img6 from "@/assets/images/card/corrida.png";
import img7 from "@/assets/images/card/moda.png";

// Categories data
const categories = [
  {
    name: "Tecnologia",
    image: img1,
  },
  {
    name: "Supermercado",
    image: img2,
  },
  {
    name: "Bebidas",
    image: img3,
  },
  {
    name: "Ferramentas",
    image: img4,
  },
  {
    name: "Saúde",
    image: img5,
  },
  {
    name: "Esportes e Fitness",
    image: img6,
  },
  {
    name: "Moda",
    image: img7,
  },
];

// Categories Component
const Categories = () => (
  <section className={styles["categories"]}>
    <Container>
      {/* Categories navigation list */}
      <nav>
        <ul className={styles["categories__list"]}>
          {categories.map((category, index) => (
            <li key={index}>
              <a href="#" className={styles["categories__card"]}>
                {/* Category card image */}
                <img
                  className={`${styles["categories__card__image"]} ${index === 0 ? styles["categories__card__image--first"] : ""}`}
                  src={category.image}
                  alt=""
                />
                {/* Category card text */}
                <span
                  className={`${styles["categories__card__text"]} ${index === 0 ? styles["categories__card__text--first"] : ""}`}
                >
                  {category.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </section>
);

export default Categories;
