import styles from "./ImageCard.module.css";

export default function ImageCard ({ image, handleOpenModal }) {
    return (
        <div className={styles.imageWrapper} onClick={() => handleOpenModal(image)}>
            <img
              className={styles.image}
              src={image.urls.small}
              alt={image.alt_description}
            />
        </div>
    );
};