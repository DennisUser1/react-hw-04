import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleMoreClick }) => {
  return (
    <button onClick={handleMoreClick} className={styles.btnShowMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;