import styles from "./input-generic.module.css";

interface IInputGeneric {
  placeholder: string;
  text?: string;
  disabled?: boolean;
  color?: string;
  onChange?: () => void;
  type?: string;
}

export default function InputGeneric({
  placeholder,
  text,
  disabled = false,
  color,
  onChange,
  type = "text",
}: IInputGeneric) {
  return (
    <input
      className={styles.input}
      type={type}
      value={text}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      color={color}
    >
      {text}
    </input>
  );
}
