// UrlPreview.js
import React, { useState, useEffect } from 'react';

const UrlPreview = ({ url }) => {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrlPreview = async () => {
      try {
        const response = await fetch(`https://api.linkpreview.net/?key=6821509bc3e6e48d225cab98e2c73541&q=${url}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPreviewData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUrlPreview();

    return () => {
      // Cleanup code if needed
    };
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!previewData) return null;

  return (
    <div className="url-preview">
      <img src={previewData.image} alt="Preview" />
      <div className="details">
        <h3>{previewData.title}</h3>
        <p>{previewData.description}</p>
        <a href={previewData.url}>Read more</a>
      </div>
    </div>
  );
};

export default UrlPreview;
