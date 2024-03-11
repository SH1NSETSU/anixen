import React, { useState, useEffect } from 'react';

const UrlPreview = ({ url, title, description, image }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false); // Since you're providing data yourself, set loading to false immediately
  }, []); // Runs only once after initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="url-preview">
      {image && <img src={image} alt="Preview" />} {/* Render image if provided */}
      <div className="details">
        {title && <h3>{title}</h3>} {/* Render title if provided */}
        {description && <p>{description}</p>} {/* Render description if provided */}
        <a href={url}>Read more</a>
      </div>
    </div>
  );
};

export default UrlPreview;
