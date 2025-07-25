// src/cloudinary/CloudVideo.jsx
import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import cld from "./config";

const CloudVideo = ({
  publicId,
  transformations,
  className,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  width,
  height,
}) => {
  const video = cld.video(publicId);
  const transformed = transformations ? transformations(video) : video;

  return (
    <AdvancedVideo
      cldVid={transformed}
      className={className}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      width={width}
      height={height}
    />
  );
};

export default CloudVideo;
