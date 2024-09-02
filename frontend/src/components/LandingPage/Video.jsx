import React, { useState } from "react";
import VideoNavbar from "./VideoNavbar";
import { FaVolumeMute, FaVolumeDown } from "react-icons/fa";

const Video = () => {
  const [muted, setMuted] = useState(true);
  const videoUrl =
    "https://res.cloudinary.com/dv20rxoei/video/upload/v1724766853/This_is_Space_on_4K___Space_Edit_-_Cornfield_Chase_g6a6m8.mp4";
  return (
    <div className="w-screen h-[326px] object-cover sm:h-[400px] md:h-screen z-0">
      <VideoNavbar />

      <video
        autoPlay
        loop
        muted={muted}
        playsInline
        className="w-full h-[326px] sm:h-[400px] md:h-screen object-cover top-0 z-0 absolute"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <button
        className="absolute left-2 md:top-[700px] sm:top-[376px] top-[300px] text-white text-lg"
        onClick={() => {
          setMuted((prev) => !prev);
        }}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeDown />}
      </button>
    </div>
  );
};

export default Video;
