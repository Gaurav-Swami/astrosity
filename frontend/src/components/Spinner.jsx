import React from "react";

const Spinner = () => {
  return (//test
    <div className="flex items-center justify-center h-screen w-full overflow-x-clip">
      <div className="w-16 h-16    shadow-accent border-4 border-t-4 dark:border-primaryBg border-lightPrimaryBg border-t-accent dark:border-t-accent  rounded-full animate-spin "></div>
    </div>
  );
};

export default Spinner;
