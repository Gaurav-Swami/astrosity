import React from "react";

const DelPopup = () => {
  return (
    <div className=" h-screen w-screen  flex justify-center items-center overflow-x-clip ">
      <div className="w-[300px] h-[250px] dark:bg-secondaryBg bg-white rounded-2xl p-8 flex gap-y-3 flex-col  shadow-2xl">
        <span className=" font-bold text-lg text-black dark:text-primaryText">Confirm Deletion</span>
        <span className="text-black dark:text-primaryText">
          Are you sure you would like to delete this blog from your account?
          This action can't be undone.
        </span>
        <div className="flex w-full justify-between space-x-4">
          <button className="py-3 px-6 rounded-lg bg-gray-500 text-white">
            Cancel
          </button>
          <button className="py-3 px-6 rounded-lg bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelPopup;
