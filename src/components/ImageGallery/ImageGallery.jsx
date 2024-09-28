import styles from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery ({ images, handleOpenModal }) {
    return (
        <ul className={styles.galleryList}>
          {images.map((image) => (
            <li key={image.id} className={styles.galleryItem}>
              <ImageCard
                handleOpenModal={handleOpenModal} 
                image={image}
              />
            </li>
          ))}
        </ul>
    );
};