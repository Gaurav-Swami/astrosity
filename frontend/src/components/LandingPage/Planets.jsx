import React from "react";

const Planets = () => {
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
    <div className="w-full">
      <h2 className="text-5xl text-center dark:text-white py-8">Read About Planets</h2>
      <div className="grid grid-cols-3 gap-6 bg-black text-white p-8">
        {Object.keys(planetsUrl).map((planet) => (
          <div
            key={planet}
            className="relative flex flex-col items-center justify-center hover:scale-110 transition-all"
          >
            <img
              src={planetsUrl[planet]}
              alt={planet}
              className={`w-40 h-40  ${
                planet == "uranus" || planet == "saturn"
                  ? "object-contain"
                  : "object-cover"
              }`}
            />
            <div className="absolute inset-0 flex text-xl items-center justify-center text-center text-primaryText ">
              {planet.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
