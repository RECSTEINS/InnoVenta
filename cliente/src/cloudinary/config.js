// src/cloudinary/config.js
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dvfzsb6ds', // ⚠️ Cámbialo por el tuyo
  },
});

export default cld;