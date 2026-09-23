import styles from "./Input.module.css";

interface PropTypes {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
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
      />
    </label>
  );
};

export default Input;
