import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ preview, largeImage, tag }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={preview} alt={tag} className={css.ImageGalleryItem_image} />
    </li>
  );
};
