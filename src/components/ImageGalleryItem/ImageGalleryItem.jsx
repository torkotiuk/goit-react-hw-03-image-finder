import React from 'react';

const ImageGalleryItem = ({ hits, toggleModal }) => (
  <ul>
    {hits.map((hit, index) => (
      <li key={hit.id} className="ImageGalleryItem">
        <img
          onClick={() => toggleModal(index, hit.largeImageURL)}
          src={hit.webformatURL}
          width="200"
          height="200"
          alt=""
          className="ImageGalleryItem-image"
        />
      </li>
    ))}
  </ul>
);

export default ImageGalleryItem;
