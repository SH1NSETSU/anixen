import React from 'react';

const UrlPreview = ({ imageUrl, title, description, url }) => {
  return (
    <div className="url-preview">
      {imageUrl && <img src={imageUrl} alt="Preview" />}
      <div className="details">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={url}>Read more</a>
      </div>
    </div>
  );
};

export default UrlPreview;
