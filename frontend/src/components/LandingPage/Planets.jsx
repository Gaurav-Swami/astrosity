import React from "react";

const Planets = () => {
  const videoUrl =
    "https://res.cloudinary.com/dv20rxoei/video/upload/v1724869394/in-y2mate.com_-_Space_Travel_Footage_Stars_Outer_Space_Background_For_Video_Editing_Ambient_Space_Noise_HD_1080_0_zktkx7.mp4";
  const planetsUrl = {
    mercury:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861261/1724860910608_i3e7bq.png",
    venus:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861261/1724860910592_r6q8pq.png",
    earth:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861259/1724860910580_k7tnlp.png",
    mars: "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861261/1724860910568_ijvjqi.png",
    jupiter:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861259/1724860910555_zkpdow.png",
    saturn:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861259/1724860910508_vrbrng.jpg",
    uranus:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861260/1724860910520_gec0rz.jpg",
    neptune:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861260/1724860910544_ouo47z.png",
    pluto:
      "https://res.cloudinary.com/dv20rxoei/image/upload/v1724861259/1724860910532_qrkvwu.png",
  };

  return (
    <div className="  w-full">
      <h2 className="text-4xl font-bold text-lightPrimaryText text-center dark:text-white py-8">
        Read About Planets
      </h2>

      <div className="relative grid grid-cols-3 gap-y-6 bg-transparent text-white px-12 py-20 ">
        <video
          className="absolute top-0 left-0 w-full  object-cover"
          autoPlay
          loop
          muted
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {Object.keys(planetsUrl).map((planet) => (
          <div
            key={planet}
            className="relative flex flex-col items-center justify-center hover:scale-110 transition-all cursor-pointer"
          >
            <img
              src={planetsUrl[planet]}
              alt={planet}
              className={`w-36 h-36 hover:animate-spin ${
                planet == "uranus" || planet == "saturn"
                  ? "object-contain"
                  : "object-cover"
              }`}
            />
            <div className="flex text-xl items-center justify-center text-center text-primaryText ">
              {planet.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
