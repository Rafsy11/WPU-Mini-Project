import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface PropTypes {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary";
}

const Button = (props: PropTypes) => {
  const { type = "button", children, color = "primary", className } = props;
  return (
    <button
      className={`${styles.button} ${styles[`button-${color}`]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
