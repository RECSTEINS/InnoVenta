// src/cloudinary/CloudImage.jsx
import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cld from './config';
import { applyDefaultTransformations } from './utils';

const CloudImage = ({ publicId, transformations, className, alt }) => {
  const img = cld.image(publicId);
  const transformed = transformations ? transformations(img) : applyDefaultTransformations(img);

  return <AdvancedImage cldImg={transformed} className={className} alt={alt} />;
};

export default CloudImage;