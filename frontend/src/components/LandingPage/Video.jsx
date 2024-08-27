import React from "react";
import VideoNavbar from "./VideoNavbar";

const Video = () => {
  const videoUrl =
    "https://res.cloudinary.com/dv20rxoei/video/upload/v1724766853/This_is_Space_on_4K___Space_Edit_-_Cornfield_Chase_g6a6m8.mp4";
  return (
    <div className="w-screen h-screen z-0">
      <VideoNavbar  />

      <video
        autoPlay
        loop
        muted={true}
        playsInline
        className="w-full h-full object-cover top-0 z-0 absolute"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
     
    </div>
  );
};

export default Video;
