import styles from "./Input.module.css";
import type { ChangeEvent } from "react";

interface PropTypes {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: PropTypes) => {
  const {
    label,
    name,
    id,
    type = "text",
    placeholder,
    required = false,
    className,
    value,
    onChange,
  } = props;

  return (
    <label htmlFor={id} className={`${styles.label} ${className || ""}`}>
      {label}
      <input
        type={type}
        id={id}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
