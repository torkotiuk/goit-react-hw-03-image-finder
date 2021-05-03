import React from 'react';

const ImageGalleryItem = ({ hits, toggleModal }) => (
  <ul className="ImageGallery">
    {hits.map((hit, index) => (
      <li key={hit.id} className="ImageGalleryItem">
        <img
          onClick={() => toggleModal(index, hit.largeImageURL)}
          src={hit.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
        />
      </li>
    ))}
  </ul>
);

export default ImageGalleryItem;
