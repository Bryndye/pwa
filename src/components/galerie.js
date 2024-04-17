import React, { useEffect, useState } from 'react';
import { showNotification } from '../notification';

function Galerie(props) {
  const { isOnline } = props;
  const [images, setImages] = useState([]);

  
  useEffect(() => {
    if (isOnline) {
      const keys = Object.keys(localStorage);

      for (const key of keys) {
        if (key.startsWith('to_sync/')) {
          const value = localStorage.getItem(key);
          console.log(key, value);

          showNotification("Photo en ligne !")
          localStorage.removeItem(key);
        }
      }
    }
  }, [isOnline]);

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
    <div className='galerie'>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Stored ${index}`} />
      ))}
    </div>
  );
}

export default Galerie;