import styles from "./ErrorMessage.module.css";

export default function ErrorMessage ({ message }) {
    return (
      <div className={styles.errorWrapper}>
        <p>{message}</p>
      </div>
    );
};