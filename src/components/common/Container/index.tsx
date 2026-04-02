import styles from "./styles.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
