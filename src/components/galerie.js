import React, { useEffect, useState } from 'react';

function Galerie() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let storedImages = [];
    const keys = Object.keys(localStorage);

    for (const key of keys) {
      if (key.startsWith('images/')) {
        const image = localStorage.getItem(key);

        if (image === undefined || image === 'null'){
            localStorage.removeItem(key)
            console.log('Image not found')
        }
        else{
            storedImages.push(image);
        }
      }
    }

    setImages(storedImages);
  }, []);

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Stored ${index}`} />
      ))}
    </div>
  );
}

export default Galerie;