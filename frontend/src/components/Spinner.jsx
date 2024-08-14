import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-16 h-16    shadow-accent border-4 border-t-4 dark:border-primaryBg border-lightPrimaryBg border-t-accent dark:border-t-accent  rounded-full animate-spin "></div>
    </div>
  );
};

export default Spinner;
