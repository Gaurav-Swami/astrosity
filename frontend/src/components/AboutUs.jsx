import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen dark:bg-black dark:to-primaryText text-white p-10 mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-lightPrimaryText dark:text-primaryText text-center">
          About Us
        </h1>
        <p className="text-lg mb-4 text-lightPrimaryText dark:text-primaryText">
          Welcome to <span className="text-accent">Astrosity</span>! We are a vibrant community for space enthusiasts to share their thoughts, ideas, and discoveries about the cosmos.
        </p>
        <p className="text-lg mb-4 text-lightPrimaryText dark:text-primaryText">
          **Brief Description:** Astrosity is an online platform where space lovers can express their passion for the universe through engaging blogs. Whether you're interested in astronomy, space exploration, or the latest cosmic phenomena, our site provides a space for you to share and connect with others who share your enthusiasm.
        </p>
        <p className="text-lg mb-4 text-lightPrimaryText dark:text-primaryText">
          At Astrosity, we believe that the wonders of the universe are meant to be shared. Our platform allows space lovers from around the globe to express their passion through engaging blogs. Whether you're an amateur astronomer, a science fiction fan, or simply curious about the stars, you'll find a space here to explore and connect with like-minded individuals.
        </p>
        <p className="text-lg mb-4 text-lightPrimaryText dark:text-primaryText">
          Our mission is to provide a space where ideas can be freely expressed and where everyone can contribute to the collective understanding of our universe. Join us in celebrating the mysteries of space and sharing your unique perspective with the world.
        </p>
        <p className="text-lg mb-4 text-lightPrimaryText dark:text-primaryText">
          Thank you for being a part of our community. Together, let's reach for the stars!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
