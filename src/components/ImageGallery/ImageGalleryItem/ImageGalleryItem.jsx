export const ImageGalleryItem = (preview, largeImage, tag) => {
  return (
    <li className="gallery-item">
      <img src={preview} alt={tag} />
    </li>
  );
};
