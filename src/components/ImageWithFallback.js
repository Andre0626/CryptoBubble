import React, { useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt, ...rest }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleImageError = () => {
        // Set the fallback image URL when the original image fails to load
        setImgSrc(fallbackSrc);
    };

    return <img src={imgSrc} alt={alt} onError={handleImageError} {...rest} />;
};

export default ImageWithFallback;
